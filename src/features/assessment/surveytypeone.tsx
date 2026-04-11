import React, { useState, useEffect, useRef } from 'react';
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { Flex, Box } from '../../components/layout/index';
import { useTranslations } from 'next-intl';
import Json from './surveys/totalsurvey';
import InputFile from '../../components/inputfile';
import SurveyNav from './surveynav';
import DropButton from '../../components/buttons/dropdownbutton';
import SurveyButton from '../../components/buttons/surveybuttons';
import { useRouter } from 'next/router';
import question_desc from './surveys/question_desc';
import './surveys/survey-pt';

let survey: Model;
let isDropDownButtonClicked = false;

function formatDate(date: Date): string {
    let month  = '' + (date.getMonth() + 1);
    let day    = '' + date.getDate();
    const year = date.getFullYear();
    let hours   = '' + date.getHours();
    let minutes = '' + date.getMinutes();
    let seconds = '' + date.getSeconds();
    if (month.length < 2)   month   = '0' + month;
    if (day.length < 2)     day     = '0' + day;
    if (hours.length < 2)   hours   = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;
    if (seconds.length < 2) seconds = '0' + seconds;
    return [year, month, day, hours, minutes, seconds].join('');
}

interface MySurveyProps {
    showCompletedPage?: (data: Record<string, any>) => void;
}

const Mysurvey: React.FC<MySurveyProps> = (prop) => {
    const t = useTranslations('assessment');
    const router = useRouter();
    const nextPracticeText = t('nextPractice');
    const previousPracticeText = t('previousPractice');
    const nextPageText = t('nextPage');
    const currentLocale = router.locale || 'en';

    if (!survey || survey.locale !== currentLocale) {
        const currentData = survey ? survey.data : {};

        let assessmentState: Record<string, any> | null = null;
        if (typeof window !== 'undefined' && sessionStorage.getItem('assessmentState')) {
            try {
                assessmentState = JSON.parse(sessionStorage.getItem('assessmentState')!);
            } catch (e) {
                console.error('Failed to parse assessmentState:', e);
            }
        }

        survey = new Model(Json(currentLocale));
        survey.locale = currentLocale;

        if (assessmentState && Object.keys(assessmentState).length > 0) {
            for (const key in assessmentState) {
                survey.setValue(key, assessmentState[key]);
            }
        } else if (Object.keys(currentData).length > 0) {
            survey.data = currentData;
        }
    } else if (typeof window !== 'undefined') {
        try {
            const assessmentState = JSON.parse(sessionStorage.getItem('assessmentState')!);
            if (assessmentState && Object.keys(assessmentState).length > 0) {
                for (const key in assessmentState) {
                    const currentValue = survey.getValue(key);
                    if (currentValue === undefined || currentValue === null || currentValue === '') {
                        survey.setValue(key, assessmentState[key]);
                    }
                }
            }
        } catch (e) {
            console.error('Failed to restore from sessionStorage:', e);
        }
    }

    const [surveyState, setSurvey]         = useState<Model>(survey);
    const [display, setDisplay]             = useState(false);
    const [pageState, setPageState]         = useState('Governance');
    const [dropDownState, setDropDownState] = useState(false);
    const [isDetailsPage, setDetailsPage]   = useState(false);
    const registeredSurveyRef = useRef<Model | null>(null);
    const pageStateRef = useRef(pageState);
    pageStateRef.current = pageState;

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const loadedResults: Record<string, any> | null = sessionStorage.getItem('loadedResults')
            ? JSON.parse(sessionStorage.getItem('loadedResults')!)
            : null;
        let assessmentState: Record<string, any> | null = sessionStorage.getItem('assessmentState')
            ? JSON.parse(sessionStorage.getItem('assessmentState')!)
            : null;
        let userState: Record<string, any> | null = sessionStorage.getItem('userState')
            ? JSON.parse(sessionStorage.getItem('userState')!)
            : null;

        if (!userState) {
            userState = { page: 'assessmentPage', has_switched_page: false };
            sessionStorage.setItem('userState', JSON.stringify(userState));
        }

        userState['page'] = 'assessmentPage';
        userState['has_switched_page'] = false;

        if (loadedResults) {
            sessionStorage.setItem('assessmentState', JSON.stringify(loadedResults));
            for (const key in loadedResults) {
                if (key.includes('question') && (loadedResults[key] === 0 || 0.25 || 0.5 || 1)) {
                    if (assessmentState) assessmentState[key] = loadedResults[key];
                    survey.setValue(key, loadedResults[key]);
                } else if (typeof key === 'string') {
                    if (assessmentState) assessmentState[key] = loadedResults[key];
                    survey.setValue(key, loadedResults[key]);
                }
            }
            sessionStorage.removeItem('loadedResults');
        }

        if (assessmentState) {
            for (const key in assessmentState) {
                survey.setValue(key, assessmentState[key]);
            }
        }

        const navbar = sessionStorage.getItem('navbarState');

        if (pageState !== navbar) {
            changePage(navbar!);
        }

        const userStateData = JSON.parse(sessionStorage.getItem('userState')!);
        if (navbar === 'Details') {
            setDetailsPage(true);
        }

        if (isChangedPage(userStateData['page'])) {
            userStateData['page'] = 'assessmentPage';
            userStateData['has_switched_page'] = false;
            sessionStorage.setItem('userState', JSON.stringify(userStateData));
        }

        setSurvey(survey);
    }, [display]);

    function saveResponses() {
        const a = document.createElement('a');
        const data: Record<string, any> = JSON.parse(sessionStorage.getItem('assessmentState')!);
        a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(data)));
        const ts = formatDate(new Date());
        let fileName: string;
        if (data['Company Name'] != null && data['Company Name'] !== '') {
            if (data['Project name'] != null && data['Project name'] !== '') {
                fileName = data['Company Name'] + '-' + data['Project name'] + '-' + ts + '.json';
            } else {
                fileName = data['Company Name'] + '-' + ts + '.json';
            }
        } else {
            fileName = 'SAMMAssessmentResponses-' + ts + '.json';
        }
        a.setAttribute('download', fileName);
        a.click();
    }

    function handleDropDownButton(value: boolean) {
        setDropDownState(value);
        isDropDownButtonClicked = true;
    }

    function setNavBarState(name: string) {
        sessionStorage.setItem('navbarState', name);
        setPageState(name);
        survey.currentPage = survey.getPageByName(name);
        setSurvey(survey);
    }

    function changePage(pageName: string) {
        if (pageName !== 'next') {
            survey.currentPage = survey.getPageByName(pageName);
        } else {
            const currentPageName = pageStateRef.current;
            let nextPageName: string;
            switch (currentPageName) {
                case 'Governance':     nextPageName = 'Design';         break;
                case 'Design':         nextPageName = 'Implementation'; break;
                case 'Implementation': nextPageName = 'Verification';   break;
                case 'Verification':   nextPageName = 'Operations';     break;
                case 'Operations':
                    nextPageName = 'Details';
                    setDetailsPage(true);
                    break;
                case 'Details':
                    sessionStorage.setItem('freshCompletion', 'true');
                    router.push('/results');
                    return;
                default:
                    console.log('Unknown page:', currentPageName);
                    return;
            }
            survey.currentPage = survey.getPageByName(nextPageName);
            setPageState(nextPageName);
            sessionStorage.setItem('navbarState', nextPageName);
            setSurvey(survey);
        }

        if (pageName !== 'next') {
            if (pageName === 'Details') {
                setDetailsPage(true);
            } else {
                setDetailsPage(false);
            }
            setPageState(pageName);
            sessionStorage.setItem('navbarState', pageName);
            setSurvey(survey);
        }
    }

    let pageChanged = false;
    const panels: any[] = [];
    const curr_panel_names: string[] = [];
    const panelStateMap = new Map<string, boolean>();
    const all_pages = survey.pages;
    const page_names: string[] = [];

    for (let i = 0; i < all_pages.length; i++) {
        page_names.push(all_pages[i].name);
    }

    function append_panel_data(in_data: any[]) {
        for (let i = 0; i < in_data.length; i++) {
            curr_panel_names.push(in_data[i].name);
            panels.push(in_data[i]);
        }
    }

    survey.showNavigationButtons = 'none' as any;

    if (registeredSurveyRef.current !== survey) {
        registeredSurveyRef.current = survey;

        survey.onCurrentPageChanged.add(function(s: any, option: any) {
            if (panels.length > 0 && curr_panel_names.length > 0) {
                panels.length = 0;
                curr_panel_names.length = 0;
                panelStateMap.clear();
            }
            pageChanged = true;
            const currPage = option.newCurrentPage;
            append_panel_data(currPage.getPanels());

            if (currPage && currPage.name) {
                setPageState(currPage.name);
                const navBarState = sessionStorage.getItem('navbarState');
                if (navBarState !== currPage.name) {
                    sessionStorage.setItem('navbarState', currPage.name);
                }
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        if (!pageChanged) {
            const page = survey.currentPage;
            append_panel_data(page.getPanels());
        }

        function getPanelHeaders(panelName: string): any {
            const panelHeaderMap = JSON.parse(sessionStorage.getItem('practiceHeaders')!);
            return panelHeaderMap[panelName];
        }

        survey.onAfterRenderPanel.add(function(s: any, options: any) {
            const rendered_panel: string = options.panel.name;
            const index = curr_panel_names.indexOf(rendered_panel);
            const currentPanel = panels[index];
            const curr_page_no = s.currentPageNo + 1;

            function panelInPage(checkPanel: string): boolean {
                return curr_panel_names.indexOf(checkPanel) > -1;
            }

            function panelScroll(targetPanelName: string) {
                const hTags = document.getElementsByTagName('h4');
                let found: HTMLElement | undefined;
                for (let i = 0; i < hTags.length; i++) {
                    if (hTags[i].textContent === targetPanelName) {
                        found = hTags[i];
                        break;
                    }
                }
                if (found && typeof found.scrollIntoView === 'function') {
                    found.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }

            function isFirstPanel(idx: number): boolean { return idx === 0; }
            function isLastPanel(idx: number): boolean   { return idx === curr_panel_names.length - 1; }

            function createPanelButton(button_type: string, btnID: string): HTMLButtonElement {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'btn btn-info btn-xs';
                btn.id = btnID;
                btn.innerHTML = button_type;
                const header = options.htmlElement;
                const sanitized_panel = rendered_panel.replace(/\s+/g, '');
                const span = document.createElement('span');
                span.id = sanitized_panel + 'panel';
                span.className = 'span';
                span.innerHTML = '  ';
                header.appendChild(span);
                header.appendChild(btn);
                return btn;
            }

            function deleteButton(btn: HTMLElement, btnID: string) {
                btn.remove();
                const sanitized_panel = rendered_panel.replace(/\s+/g, '');
                const span_rem = document.getElementById(sanitized_panel + 'panel');
                if (span_rem) span_rem.remove();
            }

            if (panelInPage(rendered_panel) && !isDropDownButtonClicked) {
                const sanitized_panel = rendered_panel.replace(/\s+/g, '');
                const nextID = sanitized_panel + 'NextNavigator';
                const prevID = sanitized_panel + 'PrevNavigator';

                if (currentPanel.isCollapsed === true) {
                    if (!panelStateMap.has(rendered_panel)) {
                        panelStateMap.set(rendered_panel, false);
                    } else {
                        const nbutton = document.getElementById(nextID);
                        if (nbutton != null) deleteButton(nbutton, nextID);
                        if (!isFirstPanel(index)) {
                            const pbutton = document.getElementById(prevID);
                            if (pbutton != null) pbutton.remove();
                        }
                    }
                } else if (currentPanel.isCollapsed === false) {
                    if (!(isFirstPanel(index) && !panelStateMap.has(rendered_panel))) {
                        panelScroll(rendered_panel);
                    }

                    if (document.getElementById(nextID) == null) {
                        const nextbtnText = isLastPanel(index) ? nextPageText : nextPracticeText;
                        const prevPanel = index - 1;

                        if (!isFirstPanel(index)) {
                            if (document.getElementById(prevID) == null) {
                                const prevbtn = createPanelButton(previousPracticeText, prevID);
                                prevbtn.onclick = function() {
                                    panels[index].collapse();
                                    panels[prevPanel].expand();
                                    panelScroll(panels[prevPanel].name);
                                };
                            }
                        }

                        const nextbtn = createPanelButton(nextbtnText, nextID);
                        if (index < curr_panel_names.length - 1) {
                            const nextPanel = panels[index + 1];
                            nextbtn.onclick = function() {
                                nextPanel.expand();
                                currentPanel.collapse();
                                panelScroll(nextPanel.name);
                            };
                        } else {
                            nextbtn.onclick = function() {
                                changePage('next');
                            };
                        }
                        panelStateMap.set(rendered_panel, true);
                    }
                }
            }

            if (isLastPanel(index) && isDropDownButtonClicked) {
                isDropDownButtonClicked = false;
            }
        });
    }

    survey.onUpdateQuestionCssClasses.add(function(s: any, options: any) {
        const classes = options.cssClasses;
        classes.mainRoot += ' sv_qstn';
        classes.root = 'sq-root';
        classes.title += ' sq-title';
        classes.description = 'sq-description';
        classes.item += ' sq-item';
        classes.label += ' sq-label';
        if (options.question.isRequired) {
            classes.title += ' sq-title-required';
            classes.root += ' sq-root-required';
        }
        if (options.question.getType() === 'checkbox') {
            classes.root += ' sq-root-cb';
        }
    });

    survey.onValueChanged.add(function(s: any, options: any) {
        if (typeof window === 'undefined') return;
        const assessmentStateData: Record<string, any> = sessionStorage.getItem('assessmentState')
            ? JSON.parse(sessionStorage.getItem('assessmentState')!)
            : {};
        const question_answered = String(options.name);
        const answer_value = options.value;
        assessmentStateData[question_answered] = answer_value;
        sessionStorage.setItem('assessmentState', JSON.stringify(assessmentStateData));
        console.log(`Saved: ${question_answered} = ${answer_value}`);
    });

    function clearAnswers() {
        const isOK = confirm(t('clearConfirm'));
        if (isOK) {
            const assessmentState: Record<string, any> = JSON.parse(sessionStorage.getItem('assessmentState')!);
            for (const key in assessmentState) {
                assessmentState[key] = null;
            }
            sessionStorage.setItem('assessmentState', JSON.stringify(assessmentState));
            if (sessionStorage.getItem('prevResults') !== null) {
                sessionStorage.removeItem('prevResults');
            }
            setDisplay(d => !d);
        }
    }

    function isChangedPage(userStateData: string): boolean {
        return userStateData !== 'assessmentPage';
    }

    return (
        <>
            <div style={{ marginBottom: '30px' }}>
                <h2 style={{ color: '#00e5ff', fontSize: '24px', fontWeight: '700', marginBottom: '10px' }}>
                    {t('loadPrevious')}
                </h2>
                <p style={{ color: '#cbd5e0', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
                    {t('loadDescription')}
                </p>
                <DropButton name={t('loadResults')} state={dropDownState} onClick={value => handleDropDownButton(value)} />
                {dropDownState ? <InputFile fileName="loadedResults" pageName="assesment" /> : null}
            </div>

            <div className="pageNav">
                <SurveyButton name={t('clear')} onClick={() => clearAnswers()} />
                <button className="SaveResponses" onClick={() => saveResponses()}>{t('saveResponses')}</button>
            </div>

            <SurveyNav button={pageState} onClick={value => changePage(value)} />
            <Survey
                showCompletedPage={false}
                onComplete={(data: any) => prop.showCompletedPage?.(data.valuesHash)}
                model={surveyState}
            />
        </>
    );
};

export default Mysurvey;
