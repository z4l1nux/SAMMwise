// react imports
import React, {useState,useEffect, useRef} from 'react';
import Head from 'next/head'
import dynamic from 'next/dynamic';
import {Radar, Bar} from 'react-chartjs-2';
import {useTranslations} from 'next-intl';
import {useRouter} from 'next/router';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import GaugeChart from '../comps/charts/GaugeChart';
import Link from 'next/link';
import LLMAnalysis from '../comps/llm/LLMAnalysis';
import { loadLLMSettings } from '../comps/llm/LLMSettings';

ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ReactToPrint = dynamic(
  () => import('react-to-print').then((mod) => mod.default),
  { ssr: false }
);

import DonutGraph from '../comps/surveyDisplay/graphs/donutgraph';
import SpiderGraph from '../comps/surveyDisplay/graphs/spidergraph';
import Bargraph from '../comps/surveyDisplay/graphs/bargraph';
import InputFile from '../comps/inputfile';
import Dataset from '../comps/surveyDisplay/graphs/datasetprops';
import assessmentCalculator from '../comps/surveyDisplay/graphs/testCalculator';
import SurveyButton from '../comps/buttons/surveybuttons';

const donutGraph = new DonutGraph()
const practiceRadar = new SpiderGraph()
const bussFuncRadar = new SpiderGraph()
const totalsBarGraph = new Bargraph()
const bussFuncBarGraph = new Bargraph()
const practiceBarGraph = new Bargraph()
totalsBarGraph.set_aspect_ratio(3)
bussFuncBarGraph.set_aspect_ratio(1)
practiceBarGraph.set_aspect_ratio(1)

var dataENV = []

function saveText(text, filename){
    var a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(text));
    a.setAttribute('download', filename);
    a.click()
}

// Section card wrapper for visual separation
const SectionCard = ({ title, children, id }) => (
    <div id={id} style={{
        background: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        padding: '28px',
        marginBottom: '28px',
        border: '1px solid rgba(102,126,234,0.12)'
    }}>
        {title && (
            <h2 style={{
                margin: '0 0 20px 0',
                padding: '0 0 14px 0',
                borderBottom: '2px solid rgba(102,126,234,0.15)',
                color: '#2d3748',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                fontSize: '18px'
            }}>{title}</h2>
        )}
        {children}
    </div>
)

// Score band: returns { label, color } for a 0–3 SAMM score
function scoreBand(score) {
    if (score < 0.5)  return { label: 'Initial',  color: '#fc8181' };
    if (score < 1.5)  return { label: 'Managed',  color: '#f6ad55' };
    if (score < 2.5)  return { label: 'Defined',  color: '#68d391' };
    return               { label: 'Optimized', color: '#4299e1' };
}

const Results = () => {
    const t = useTranslations('results');
    const tCharts = useTranslations('charts');
    const tLLM = useTranslations('llm');
    const router = useRouter();
    const locale = router.locale || 'en';

    // Apply translations to graph singletons
    const currentLabel  = tCharts('currentAssessment');
    const previousLabel = tCharts('previousAssessment');
    const donutLabels   = [
        tCharts('maturityLabels.bad'),
        tCharts('maturityLabels.lessThanIdeal'),
        tCharts('maturityLabels.okay'),
        tCharts('maturityLabels.good'),
    ];
    const responseLabels = [
        tCharts('responseLabels.no'),
        tCharts('responseLabels.yesForSome'),
        tCharts('responseLabels.yesForMost'),
        tCharts('responseLabels.yesForAll'),
    ];

    totalsBarGraph.metaData.labels  = responseLabels;
    totalsBarGraph.setDatasetLabel(currentLabel);
    bussFuncBarGraph.setDatasetLabel(currentLabel);
    practiceBarGraph.setDatasetLabel(currentLabel);
    donutGraph.setLabels(donutLabels);
    bussFuncRadar.setDatasetLabels(currentLabel, previousLabel);
    practiceRadar.setDatasetLabels(currentLabel, previousLabel);
    bussFuncRadar.set_title_text(tCharts('scoreForEach'));
    practiceRadar.set_title_text(tCharts('practiceScore'));

    const [display,        setDisplay]        = useState(false)
    const [showPrevious,   setShowPrevious]   = useState(false)
    const [scoreData,      setScoreData]      = useState(null)
    const [completionText, setCompletionText] = useState('')
    const [llmSettings,    setLLMSettings]    = useState(null)
    // scorePayload and previousPayload for LLM
    const [scorePayload,   setScorePayload]   = useState(null)
    const [prevPayload,    setPrevPayload]     = useState(null)
    // practiceTable: [{ bf, practice, score }]
    const [practiceTable,  setPracticeTable]  = useState([])
    // stored LLM analysis (from json or generated)
    const [storedAnalysis, setStoredAnalysis] = useState(null)
    const componentRef = useRef();

    function reloadPage(){ location.reload(); }

    useEffect(() => {
        // Load LLM settings
        setLLMSettings(loadLLMSettings());

        const previousData            = sessionStorage.getItem('prevResults');
        const assessmentSessionState  = JSON.parse(sessionStorage.getItem('assessmentState'));

        const userStateUpdate = JSON.parse(sessionStorage.getItem('userState')) || {};
        userStateUpdate['page']             = 'resultsPage';
        userStateUpdate['has_switched_page'] = true;
        sessionStorage.setItem('userState', JSON.stringify(userStateUpdate));

        if (!assessmentSessionState) {
            setCompletionText(t('mustComplete'));
            return;
        }

        dataENV[0] = assessmentSessionState;

        // Restore stored LLM analysis from the assessment JSON if present
        if (assessmentSessionState.llmAnalysis) {
            setStoredAnalysis(assessmentSessionState.llmAnalysis);
        }

        if (previousData) {
            setShowPrevious(true);
            dataENV[1] = JSON.parse(previousData);
            if (bussFuncBarGraph.metaData.datasets.length < 2) {
                const prevLabel = tCharts('previousDataset');
                totalsBarGraph.metaData.datasets.push(new Dataset(prevLabel).metaData);
                bussFuncBarGraph.metaData.datasets.push(new Dataset(prevLabel).metaData);
                practiceBarGraph.metaData.datasets.push(new Dataset(prevLabel).metaData);
            }
        }

        let builtTable = [];

        for (let dataNum = 0; dataNum < dataENV.length; dataNum++) {
            const testCalc = new assessmentCalculator(dataENV[dataNum]);
            testCalc.computeResults();

            const bfLabels = testCalc.businessFunctionNames.map(
                name => tCharts(`businessFunctions.${name}`) || name
            );
            const practiceLabels = testCalc.practiceNames.map(
                name => tCharts(`practices.${name}`) || name
            );

            bussFuncRadar.metaData.labels = bfLabels;
            bussFuncBarGraph.metaData.labels = bfLabels;
            bussFuncRadar.metaData.datasets[dataNum].data = testCalc.businessFunctionScores;
            bussFuncBarGraph.metaData.datasets[dataNum].data = testCalc.businessFunctionScores;

            practiceRadar.metaData.labels = practiceLabels;
            practiceBarGraph.metaData.labels = practiceLabels;
            practiceRadar.metaData.datasets[dataNum].data = testCalc.practiceScores;
            practiceBarGraph.metaData.datasets[dataNum].data = testCalc.practiceScores;

            const totalsCount = [
                testCalc.responseCount["No"],
                testCalc.responseCount["Yes, for some"],
                testCalc.responseCount["Yes, for most"],
                testCalc.responseCount["Yes, for all"],
            ];
            totalsBarGraph.metaData.datasets[dataNum].data = totalsCount;

            for (let i = 0; i < totalsCount.length; i++) {
                donutGraph.update_properties_dataset(i);
            }

            if (dataNum === 0) {
                const score   = parseFloat(testCalc.overallScore.toFixed(2));
                const percent = parseFloat((score / 3).toFixed(4));
                setScoreData({
                    score,
                    prevScore:   null,
                    percent,
                    company:     dataENV[0]['Company Name']            || '',
                    project:     dataENV[0]['Project name']            || '',
                    desc:        dataENV[0]['Description of Project']  || '',
                });

                // Build LLM score payload
                setScorePayload({
                    overallScore:   score,
                    bfNames:        testCalc.businessFunctionNames,
                    bfScores:       testCalc.businessFunctionScores,
                    practiceNames:  testCalc.practiceNames,
                    practiceScores: testCalc.practiceScores,
                    responseCount:  testCalc.responseCount,
                    company:        dataENV[0]['Company Name']           || '',
                    project:        dataENV[0]['Project name']           || '',
                });

                // Build practice breakdown table
                builtTable = [];
                let pIdx = 0;
                for (const bf of testCalc.businessFunctionNames) {
                    for (let pi = 0; pi < 3; pi++) {
                        builtTable.push({
                            bf,
                            practice:  testCalc.practiceNames[pIdx],
                            score:     testCalc.practiceScores[pIdx],
                        });
                        pIdx++;
                    }
                }
                setPracticeTable(builtTable);
            }

            if (dataNum === 1) {
                const prevScore = parseFloat(testCalc.overallScore.toFixed(2));
                setPrevPayload({
                    overallScore:  prevScore,
                    bfNames:       testCalc.businessFunctionNames,
                    bfScores:      testCalc.businessFunctionScores,
                    practiceNames: testCalc.practiceNames,
                    practiceScores: testCalc.practiceScores,
                    responseCount: testCalc.responseCount,
                });
            }
        }

        setCompletionText(t('completionText'));
        setDisplay(true);
    }, [])

    // Auto-analysis: trigger when scorePayload is ready and auto is on
    useEffect(() => {
        if (!scorePayload) return;
        const settings = loadLLMSettings();
        if (settings?.autoAnalysis && !storedAnalysis) {
            // LLMAnalysis component will handle it on mount via its own trigger
            // We pass autoTrigger prop below
        }
    }, [scorePayload]);

    // When LLM analysis is generated, persist it in the assessment JSON
    const handleAnalysisGenerated = (analysisObj) => {
        setStoredAnalysis(analysisObj);
        if (dataENV[0]) {
            dataENV[0].llmAnalysis = analysisObj;
            sessionStorage.setItem('assessmentState', JSON.stringify(dataENV[0]));
        }
    };

    // Derived score strings
    const scoreLabel = scoreData
        ? `${t('overallScore')} ${scoreData.score}/3`
        : '';

    const llmIsConfigured = llmSettings && (llmSettings.encryptedKey || llmSettings.provider === 'ollama');

    return (
        <>
            <Head>
                <title>{t('title')}</title>
                <meta name="keywords" content="owasp, samm, assessment" />
            </Head>

            {/* ── Header card ── */}
            {completionText && (
                <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '16px',
                    padding: '32px',
                    marginBottom: '28px',
                    color: '#fff',
                    boxShadow: '0 8px 32px rgba(102,126,234,0.35)',
                    position: 'relative',
                }}>
                    <h1 style={{ color: '#fff', margin: 0, fontFamily: 'Poppins, sans-serif', fontSize: '26px' }}>
                        {completionText}
                    </h1>
                    {scoreData && (
                        <>
                            {scoreData.company && (
                                <p style={{ color: 'rgba(255,255,255,0.85)', margin: '8px 0 0', fontSize: '16px' }}>
                                    {scoreData.company}{scoreData.project ? ` — ${scoreData.project}` : ''}
                                </p>
                            )}
                            {scoreData.desc && (
                                <p style={{ color: 'rgba(255,255,255,0.7)', margin: '4px 0 0', fontSize: '14px' }}>
                                    {scoreData.desc}
                                </p>
                            )}
                        </>
                    )}
                    {/* AI Config link */}
                    <Link href="/ai" style={{
                        position: 'absolute', top: '20px', right: '20px',
                        padding: '8px 16px', borderRadius: '8px',
                        background: 'rgba(255,255,255,0.2)',
                        border: '1px solid rgba(255,255,255,0.4)',
                        color: '#fff', fontSize: '13px', fontWeight: 600,
                        textDecoration: 'none', display: 'inline-block',
                    }}>
                        🤖 {tLLM('configureButton')}
                        {llmIsConfigured && llmSettings?.autoAnalysis && (
                            <span style={{ marginLeft: '6px', background: '#48bb78', borderRadius: '999px', padding: '1px 6px', fontSize: '11px' }}>ON</span>
                        )}
                    </Link>
                </div>
            )}

            <div ref={componentRef}>

                {/* ── Score + Gauge ── */}
                {display && scoreData && (
                    <SectionCard id="totalsDiv" title={t('totalsSection')}>
                        <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                            <SurveyButton name={t('refresh')} onClick={reloadPage} />
                        </div>
                        <h2 id="finalscore" style={{ textAlign: 'center', fontSize: '22px', color: '#2d3748', margin: '0 0 16px' }}>
                            {showPrevious
                                ? `${t('overallScore')} ${scoreData.score}/3  ·  ${t('previousScore')} —/3`
                                : scoreLabel}
                        </h2>
                        <GaugeChart
                            key={scoreData.percent}
                            id="gauge-chart2"
                            nrOfLevels={4}
                            percent={scoreData.percent}
                            textColor="#000000"
                            colors={['#ff6384','#ff9f40','#ffcd56','#4bc0c0']}
                            className="gauge"
                        />

                        {/* Score interpretation legend */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '16px', marginBottom: '8px' }}>
                            {[
                                { range: '0.0 – 0.5', label: 'Initial',   color: '#fc8181', desc: t('scoreInitial') },
                                { range: '0.5 – 1.5', label: 'Managed',   color: '#f6ad55', desc: t('scoreManaged') },
                                { range: '1.5 – 2.5', label: 'Defined',   color: '#68d391', desc: t('scoreDefined') },
                                { range: '2.5 – 3.0', label: 'Optimized', color: '#4299e1', desc: t('scoreOptimized') },
                            ].map(b => (
                                <div key={b.label} style={{
                                    display: 'flex', alignItems: 'flex-start', gap: '8px',
                                    background: '#f7fafc', borderRadius: '8px', padding: '10px 14px',
                                    border: `2px solid ${scoreData.score >= parseFloat(b.range.split('–')[0]) && scoreData.score < parseFloat(b.range.split('–')[1]) ? b.color : 'transparent'}`,
                                    minWidth: '160px',
                                }}>
                                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: b.color, marginTop: '3px', flexShrink: 0 }} />
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '13px', color: '#2d3748' }}>{b.label} <span style={{ fontWeight: 400, color: '#a0aec0' }}>({b.range})</span></div>
                                        <div style={{ fontSize: '12px', color: '#718096', marginTop: '2px' }}>{b.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h3 style={{ textAlign: 'center', marginTop: '24px', marginBottom: '12px', color: '#4a5568', fontWeight: 600 }}>
                            {t('responseCount')}
                        </h3>
                        <Bar data={totalsBarGraph.metaData} options={totalsBarGraph.layout_props} className="totalsBar" />
                    </SectionCard>
                )}

                {/* ── Practice breakdown table ── */}
                {display && practiceTable.length > 0 && (
                    <SectionCard id="practiceTableSection" title={t('practiceBreakdown')}>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                                <thead>
                                    <tr style={{ background: '#f7fafc' }}>
                                        <th style={{ padding: '10px 14px', textAlign: 'left', color: '#4a5568', fontWeight: 700, borderBottom: '2px solid #e2e8f0' }}>{t('businessFunction')}</th>
                                        <th style={{ padding: '10px 14px', textAlign: 'left', color: '#4a5568', fontWeight: 700, borderBottom: '2px solid #e2e8f0' }}>{t('practice')}</th>
                                        <th style={{ padding: '10px 14px', textAlign: 'center', color: '#4a5568', fontWeight: 700, borderBottom: '2px solid #e2e8f0' }}>{t('score')}</th>
                                        <th style={{ padding: '10px 14px', textAlign: 'left', color: '#4a5568', fontWeight: 700, borderBottom: '2px solid #e2e8f0' }}>{t('maturityLevel')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {practiceTable.map((row, i) => {
                                        const band = scoreBand(row.score);
                                        return (
                                            <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f7fafc' }}>
                                                <td style={{ padding: '9px 14px', color: '#4a5568', borderBottom: '1px solid #e2e8f0' }}>
                                                    {tCharts(`businessFunctions.${row.bf}`) || row.bf}
                                                </td>
                                                <td style={{ padding: '9px 14px', color: '#2d3748', fontWeight: 500, borderBottom: '1px solid #e2e8f0' }}>
                                                    {tCharts(`practices.${row.practice}`) || row.practice}
                                                </td>
                                                <td style={{ padding: '9px 14px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>
                                                    <span style={{
                                                        fontWeight: 700, color: band.color,
                                                        background: band.color + '20',
                                                        padding: '2px 10px', borderRadius: '999px',
                                                    }}>
                                                        {row.score.toFixed(2)}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>
                                                    <span style={{ fontSize: '12px', fontWeight: 600, color: band.color }}>
                                                        {band.label}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </SectionCard>
                )}

                {/* ── Business Functions ── */}
                {display && (
                    <SectionCard id="bussFuncSection" title={t('maturityByBusiness')}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                            <div style={{ flex: '1 1 45%', minWidth: '280px' }}>
                                <h3 style={{ fontSize: '14px', color: '#718096', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    {t('maturityByBusinessRadar')}
                                </h3>
                                <Radar data={bussFuncRadar.metaData} options={bussFuncRadar.layout_props} className="bussFuncRadar" />
                            </div>
                            <div style={{ flex: '1 1 45%', minWidth: '280px' }}>
                                <h3 style={{ fontSize: '14px', color: '#718096', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    {t('maturityByBusinessBar')}
                                </h3>
                                <Bar data={bussFuncBarGraph.metaData} options={bussFuncBarGraph.layout_props} className="bussFuncBar" />
                            </div>
                        </div>
                    </SectionCard>
                )}

                {/* ── Practices ── */}
                {display && (
                    <SectionCard id="practiceSection" title={t('maturityByPractice')}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                            <div style={{ flex: '1 1 45%', minWidth: '280px' }}>
                                <h3 style={{ fontSize: '14px', color: '#718096', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    {t('maturityByPracticeRadar')}
                                </h3>
                                <Radar data={practiceRadar.metaData} options={practiceRadar.layout_props} className="practiceRadar" />
                            </div>
                            <div style={{ flex: '1 1 45%', minWidth: '280px' }}>
                                <h3 style={{ fontSize: '14px', color: '#718096', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    {t('maturityByPracticeBar')}
                                </h3>
                                <Bar data={practiceBarGraph.metaData} options={practiceBarGraph.layout_props} className="practiceBar" />
                            </div>
                        </div>
                    </SectionCard>
                )}

            </div>

            {/* ── AI Analysis ── */}
            {display && scorePayload && (
                <LLMAnalysis
                    scorePayload={scorePayload}
                    previous={prevPayload}
                    locale={locale}
                    storedAnalysis={storedAnalysis}
                    onAnalysisGenerated={handleAnalysisGenerated}
                    autoTrigger={llmSettings?.autoAnalysis && !storedAnalysis}
                />
            )}

            {/* ── Actions ── */}
            {display && (
                <SectionCard>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontWeight: 600, marginBottom: '12px' }}>{t('saveJson')}</p>
                            <button className="btn" onClick={() =>
                                saveText(
                                    JSON.stringify(dataENV[0]),
                                    `${scoreData?.company || 'SAMM'}-${scoreData?.project || 'Assessment'}.json`
                                )
                            }>
                                {t('saveFile')}
                            </button>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontWeight: 600, marginBottom: '12px' }}>{t('loadPrevious')}</p>
                            <InputFile fileName="prevResults" />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontWeight: 600, marginBottom: '12px' }}>{t('exportPdf')}</p>
                            <ReactToPrint
                                trigger={() => <button className="btn">{t('exportGraphs')}</button>}
                                content={() => componentRef.current}
                            />
                        </div>
                    </div>
                </SectionCard>
            )}
        </>
    );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default
    },
  };
}

export default Results;
