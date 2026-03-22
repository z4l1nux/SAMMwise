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
import GaugeChart from '../features/results/GaugeChart';
import Link from 'next/link';
import { Bot } from 'lucide-react';
import LLMAnalysis from '../features/ai-analysis/LLMAnalysis';
import { loadLLMSettings } from '../features/ai-analysis/LLMSettings';

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

import { exportReportToPdf } from '../lib/exportPdf';

import DonutGraph from '../features/assessment/graphs/donutgraph';
import SpiderGraph from '../features/assessment/graphs/spidergraph';
import Bargraph from '../features/assessment/graphs/bargraph';
import InputFile from '../components/inputfile';
import Dataset from '../features/assessment/graphs/datasetprops';
import assessmentCalculator from '../features/assessment/graphs/testCalculator';
import SurveyButton from '../components/buttons/surveybuttons';

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
    <div id={id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-7 mb-7 shadow-xl">
        {title && (
            <h2 className="m-0 mb-5 pb-3.5 border-b border-white/10 text-slate-200 font-[Poppins] font-semibold text-lg">
                {title}
            </h2>
        )}
        {children}
    </div>
)

// Score band: returns { label, color } for a 0–3 SAMM score
function scoreBand(score) {
    if (score < 0.5)  return { labelKey: 'initial',   color: '#fc8181' };
    if (score < 1.5)  return { labelKey: 'managed',   color: '#f6ad55' };
    if (score < 2.5)  return { labelKey: 'defined',   color: '#68d391' };
    return               { labelKey: 'optimized', color: '#4299e1' };
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
    const [isFreshCompletion, setIsFreshCompletion] = useState(false)
    const [isExporting,       setIsExporting]       = useState(false)
    const [exportError,       setExportError]       = useState('')
    const componentRef = useRef(null);

    const handleExport = async () => {
        if (!componentRef.current) return;
        setIsExporting(true);
        setExportError('');
        try {
            const company = scoreData?.company || 'SAMM';
            const project = scoreData?.project || new Date().toLocaleDateString();
            await exportReportToPdf(componentRef.current, `${company}-${project}.pdf`);
        } catch (err) {
            console.error('PDF export failed:', err);
            setExportError(t('exportError'));
        } finally {
            setIsExporting(false);
        }
    };

    function reloadPage(){ location.reload(); }

    useEffect(() => {
        // Load LLM settings
        setLLMSettings(loadLLMSettings());

        // Only auto-trigger AI if the user just completed a fresh assessment
        const fresh = sessionStorage.getItem('freshCompletion') === 'true';
        sessionStorage.removeItem('freshCompletion');
        setIsFreshCompletion(fresh);

        const previousData            = sessionStorage.getItem('prevResults');
        const assessmentSessionState  = JSON.parse(sessionStorage.getItem('assessmentState'));

        const userStateUpdate = JSON.parse(sessionStorage.getItem('userState')) || {};
        userStateUpdate['page']             = 'resultsPage';
        userStateUpdate['has_switched_page'] = true;
        sessionStorage.setItem('userState', JSON.stringify(userStateUpdate));

        const hasAnswers = assessmentSessionState &&
            Object.keys(assessmentSessionState).some(
                k => k.startsWith('question') && assessmentSessionState[k] !== null
            );
        if (!hasAnswers) {
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

            <div ref={componentRef}>

            {/* ── Header card ── */}
            {completionText && (
                <div className="results-header-card bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-400/20 backdrop-blur-md rounded-2xl p-8 mb-7 shadow-[0_8px_32px_rgba(0,229,255,0.15)] relative">
                    <h1 className="text-white m-0 font-[Poppins] text-2xl font-semibold">
                        {completionText}
                    </h1>
                    {scoreData && (
                        <>
                            {scoreData.company && (
                                <p className="text-slate-300 mt-2 text-base">
                                    {scoreData.company}{scoreData.project ? ` — ${scoreData.project}` : ''}
                                </p>
                            )}
                            {scoreData.desc && (
                                <p className="text-slate-400 mt-1 text-sm">
                                    {scoreData.desc}
                                </p>
                            )}
                        </>
                    )}
                    {/* AI Config link — hidden in print */}
                    <Link href="/ai" className="no-print absolute top-5 right-5 px-4 py-2 rounded-xl bg-white/10 border border-white/30 text-white text-sm font-semibold hover:bg-white/20 transition-all duration-200 no-underline">
                        <Bot className="w-4 h-4 inline mr-1.5" /> {tLLM('configureButton')}
                        {llmIsConfigured && llmSettings?.autoAnalysis && (
                            <span className="ml-1.5 bg-green-500 rounded-full px-1.5 py-0.5 text-xs">ON</span>
                        )}
                    </Link>
                </div>
            )}

                {/* ── Score + Gauge ── */}
                {display && scoreData && (
                    <SectionCard id="totalsDiv" title={t('totalsSection')}>
                        <div className="no-print text-center mb-3">
                            <SurveyButton name={t('refresh')} onClick={reloadPage} />
                        </div>
                        <h2 id="finalscore" className="text-center text-xl text-slate-200 m-0 mb-4">
                            {showPrevious
                                ? `${t('overallScore')} ${scoreData.score}/3  ·  ${t('previousScore')} ${prevPayload?.overallScore ?? '—'}/3`
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
                        <div className="flex justify-center gap-3 flex-wrap mt-4 mb-2">
                            {[
                                { range: '0.0 – 0.5', labelKey: 'initial',   color: '#fc8181', desc: t('scoreInitial') },
                                { range: '0.5 – 1.5', labelKey: 'managed',   color: '#f6ad55', desc: t('scoreManaged') },
                                { range: '1.5 – 2.5', labelKey: 'defined',   color: '#68d391', desc: t('scoreDefined') },
                                { range: '2.5 – 3.0', labelKey: 'optimized', color: '#4299e1', desc: t('scoreOptimized') },
                            ].map(b => (
                                <div key={b.labelKey} className="flex items-start gap-2 bg-white/5 rounded-lg p-2.5 px-3.5 border-2 min-w-[160px]"
                                    style={{ borderColor: scoreData.score >= parseFloat(b.range.split('–')[0]) && scoreData.score < parseFloat(b.range.split('–')[1]) ? b.color : 'transparent' }}>
                                    <div className="w-3 h-3 rounded-full mt-0.5 shrink-0" style={{ background: b.color }} />
                                    <div>
                                        <div className="font-bold text-sm text-slate-200">{t(`maturityBands.${b.labelKey}`)} <span className="font-normal text-slate-500">({b.range})</span></div>
                                        <div className="text-xs text-slate-400 mt-0.5">{b.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h3 className="text-center mt-6 mb-3 text-slate-400 font-semibold">
                            {t('responseCount')}
                        </h3>
                        <Bar data={totalsBarGraph.metaData} options={totalsBarGraph.layout_props} className="totalsBar" />
                    </SectionCard>
                )}

                {/* ── Practice breakdown table ── */}
                {display && practiceTable.length > 0 && (
                    <SectionCard id="practiceTableSection" title={t('practiceBreakdown')}>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-sm">
                                <thead>
                                    <tr className="bg-white/5">
                                        <th className="px-3.5 py-2.5 text-left text-slate-400 font-bold border-b-2 border-white/10">{t('businessFunction')}</th>
                                        <th className="px-3.5 py-2.5 text-left text-slate-400 font-bold border-b-2 border-white/10">{t('practice')}</th>
                                        <th className="px-3.5 py-2.5 text-center text-slate-400 font-bold border-b-2 border-white/10">{t('score')}</th>
                                        <th className="px-3.5 py-2.5 text-left text-slate-400 font-bold border-b-2 border-white/10">{t('maturityLevel')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {practiceTable.map((row, i) => {
                                        const band = scoreBand(row.score);
                                        return (
                                            <tr key={i} className={i % 2 === 0 ? 'bg-transparent' : 'bg-white/3'}>
                                                <td className="px-3.5 py-2 text-slate-400 border-b border-white/5">
                                                    {tCharts(`businessFunctions.${row.bf}`) || row.bf}
                                                </td>
                                                <td className="px-3.5 py-2 text-slate-300 font-medium border-b border-white/5">
                                                    {tCharts(`practices.${row.practice}`) || row.practice}
                                                </td>
                                                <td className="px-3.5 py-2 text-center border-b border-white/5">
                                                    <span className="font-bold rounded-full px-2.5 py-0.5" style={{ color: band.color, background: band.color + '30' }}>
                                                        {row.score.toFixed(2)}
                                                    </span>
                                                </td>
                                                <td className="px-3.5 py-2 border-b border-white/5">
                                                    <span className="text-xs font-semibold" style={{ color: band.color }}>
                                                        {t(`maturityBands.${band.labelKey}`)}
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
                        <div className="flex flex-wrap gap-4">
                            <div className="flex-[1_1_45%] min-w-[280px]">
                                <h3 className="text-sm text-slate-400 font-semibold mb-3 uppercase tracking-[0.05em]">
                                    {t('maturityByBusinessRadar')}
                                </h3>
                                <Radar data={bussFuncRadar.metaData} options={bussFuncRadar.layout_props} className="bussFuncRadar" />
                            </div>
                            <div className="flex-[1_1_45%] min-w-[280px]">
                                <h3 className="text-sm text-slate-400 font-semibold mb-3 uppercase tracking-[0.05em]">
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
                        <div className="flex flex-wrap gap-4">
                            <div className="flex-[1_1_45%] min-w-[280px]">
                                <h3 className="text-sm text-slate-400 font-semibold mb-3 uppercase tracking-[0.05em]">
                                    {t('maturityByPracticeRadar')}
                                </h3>
                                <Radar data={practiceRadar.metaData} options={practiceRadar.layout_props} className="practiceRadar" />
                            </div>
                            <div className="flex-[1_1_45%] min-w-[280px]">
                                <h3 className="text-sm text-slate-400 font-semibold mb-3 uppercase tracking-[0.05em]">
                                    {t('maturityByPracticeBar')}
                                </h3>
                                <Bar data={practiceBarGraph.metaData} options={practiceBarGraph.layout_props} className="practiceBar" />
                            </div>
                        </div>
                    </SectionCard>
                )}


            {/* ── AI Analysis ── */}
            {display && scorePayload && (
                <LLMAnalysis
                    scorePayload={scorePayload}
                    previous={prevPayload}
                    locale={locale}
                    storedAnalysis={storedAnalysis}
                    onAnalysisGenerated={handleAnalysisGenerated}
                    autoTrigger={llmSettings?.autoAnalysis && !storedAnalysis && isFreshCompletion}
                />
            )}

            </div>{/* end componentRef */}

            {/* ── Actions (fora do print) ── */}
            {display && (
                <SectionCard>
                    <div className="flex flex-wrap gap-8 justify-center">
                        <div className="text-center">
                            <p className="font-semibold mb-3 text-slate-200">{t('saveJson')}</p>
                            <button className="btn" onClick={() =>
                                saveText(
                                    JSON.stringify(dataENV[0]),
                                    `${scoreData?.company || 'SAMM'}-${scoreData?.project || 'Assessment'}.json`
                                )
                            }>
                                {t('saveFile')}
                            </button>
                        </div>
                        <div className="text-center">
                            <p className="font-semibold mb-3 text-slate-200">{t('loadPrevious')}</p>
                            <InputFile fileName="prevResults" />
                        </div>
                        <div className="text-center">
                            <p className="font-semibold mb-3 text-slate-200">{t('exportPdf')}</p>
                            <button
                                className="btn"
                                onClick={handleExport}
                                disabled={isExporting}
                            >
                                {isExporting ? t('exportGenerating') : t('exportGraphs')}
                            </button>
                            {exportError && (
                                <p className="text-red-400 text-sm mt-2">{exportError}</p>
                            )}
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
