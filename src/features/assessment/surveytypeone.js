//All the survey logic in this page 

//TODO: make the panels buttons part of an outside function

import React, {useState, useEffect, useRef} from 'react';
import 'survey-core/defaultV2.min.css';
import { Model, surveyLocalization } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { Flex, Box } from '../../components/layout'
import { useTranslations } from 'next-intl';
//local imports
import Json from  './surveys/totalsurvey';
import InputFile from '../../components/inputfile';
import SurveyNav from './surveynav';
import DropButton from '../../components/buttons/dropdownbutton';
import SurveyButton from '../../components/buttons/surveybuttons';
import router, {useRouter} from 'next/router'
import question_desc from './surveys/question_desc';
import './surveys/survey-pt';  // Import Portuguese translations

// import saveText from '../saveResponses';

// Survey will be initialized in component with locale
let survey;
var isDropDownButtonClicked = false;

function formatDate(date) {
    let month = ''+(date.getMonth() + 1),
    day = '' + date.getDate(),
    year = date.getFullYear(),
    hours = '' +date.getHours(),
    minutes = '' +date.getMinutes(),
    seconds = '' +date.getSeconds();
    if  (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    if (hours.length < 2) {
      hours = '0' + hours;
    }
    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }
    if (seconds.length < 2) {
      seconds = '0' + seconds;
    }
  
    return [year, month, day,hours,minutes,seconds].join('');
  }


const Mysurvey = (prop) => {
    const t = useTranslations('assessment');
    const router = useRouter();
    const nextPracticeText = t('nextPractice');
    const previousPracticeText = t('previousPractice');
    const nextPageText = t('nextPage');
    const currentLocale = router.locale || 'en';
    
    // Initialize survey with current locale - preserve existing data
    if (!survey || survey.locale !== currentLocale) {
        // Save current data before recreating survey
        const currentData = survey ? survey.data : {};
        
        // Also try to get data from sessionStorage (only on client-side)
        let assessmentState = null;
        if (typeof window !== 'undefined' && sessionStorage.getItem('assessmentState')) {
            try {
                assessmentState = JSON.parse(sessionStorage.getItem('assessmentState'));
            } catch (e) {
                console.error('Failed to parse assessmentState:', e);
            }
        }
        
        survey = new Model(Json(currentLocale));
        survey.locale = currentLocale;
        
        // Restore data after locale change - prioritize sessionStorage
        if (assessmentState && Object.keys(assessmentState).length > 0) {
            for (const key in assessmentState) {   
                survey.setValue(key, assessmentState[key]);
            }
        } else if (Object.keys(currentData).length > 0) {
            survey.data = currentData;
        }
    } else if (typeof window !== 'undefined') {
        // Even if survey exists, restore from sessionStorage on every render (client-side only)
        try {
            const assessmentState = JSON.parse(sessionStorage.getItem('assessmentState'));
            if (assessmentState && Object.keys(assessmentState).length > 0) {
                for (const key in assessmentState) {
                    // Only set if current value is empty/null
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
    
    const [surveyState,setSurvey] = useState(survey);
    const [display, setDisplay] = useState(false);
    const [populateState,setPopulateState] = useState(false);
    const [pageState, setPageState] = useState("Governance");
    const [dropDownState, setDropDownState] = useState(false);
    const [isDetailsPage, setDetailsPage] = useState(false);
    const [reloadSurvey, setReloadSurvey] = useState(false);
    const registeredSurveyRef = useRef(null);
    const pageStateRef = useRef(pageState);
    pageStateRef.current = pageState;
    
    //Use Effect for populating the Survey with predefined answerd from a file or from previously answered survey
    useEffect(() => {
        // Skip SSR - only run on client
        if (typeof window === 'undefined') return;
        
        var loadedResults = sessionStorage.getItem('loadedResults') ? JSON.parse(sessionStorage.getItem('loadedResults')) : null;
        var assessmentState = sessionStorage.getItem('assessmentState') ? JSON.parse(sessionStorage.getItem('assessmentState')) : null;
        var userState = sessionStorage.getItem('userState') ? JSON.parse(sessionStorage.getItem('userState')) : null;
        
        if (!userState) {
            userState = { page: 'assessmentPage', has_switched_page: false };
            sessionStorage.setItem('userState', JSON.stringify(userState));
        }
        
        userState['page'] = 'assessmentPage';
        userState['has_switched_page'] = false;

        if(loadedResults){
            sessionStorage.setItem('assessmentState', JSON.stringify(loadedResults));

            for (const key in loadedResults) {   
                    if(key.includes("question") && (loadedResults[key] == 0 || 0.25 || 0.5 || 1 )){
                        assessmentState[key] = loadedResults[key]
                        survey.setValue(key,loadedResults[key])
                    }else if(typeof(key == 'string')){
                        assessmentState[key] = loadedResults[key]
                        survey.setValue(key,loadedResults[key])
                    }
            }
            sessionStorage.removeItem('loadedResults')
        }
        
        // Always restore from sessionStorage to ensure data persistence
        if(assessmentState){ 
            for (const key in assessmentState) {   
                survey.setValue(key,assessmentState[key])
            }    
        }
        
        var navbar = sessionStorage.getItem('navbarState');
        
        
        if(pageState != navbar){
            changePage(navbar);
        }
        
        var userStateData = JSON.parse(sessionStorage.getItem('userState'));
        if(navbar == "Details"){
            setDetailsPage(true);
        }

        if (isChangedPage(userStateData['page'])){
            userStateData['page'] = 'assessmentPage';
            userStateData['has_switched_page'] = false;
            sessionStorage.setItem('userState', JSON.stringify(userStateData));
        } 
        
        setSurvey(survey);
    }, [display])



    function saveResponses(){
        var a = document.createElement('a');
        var data = JSON.parse(sessionStorage.getItem('assessmentState'));
        a.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(JSON.stringify(data)));
        var ts = formatDate(new Date());
        console.log(data);
        if (data['Company Name'] != null && data['Company Name'] != "") {
            if (data['Project name'] != null && data['Project name'] != "") {
                var fileName = data['Company Name'] + '-' + data['Project name'] + '-'+ts+'.json';
            } else {
            var fileName = data['Company Name'] + '-'+ts+'.json';
            }
        } else {
            var fileName = "SAMMAssessmentResponses-"+ts+".json";
        }
        a.setAttribute('download', fileName);
        a.click()
    } 

   
    //Handling LoadResults dropDown button functions 
    function handleDropDownButton(value){
        setDropDownState(value);
        isDropDownButtonClicked = true;
    }
    
    

    function setNavBarState(name){
        var userNavbarState = sessionStorage.getItem('navbarState');
        userNavbarState = name;
        sessionStorage.setItem('navbarState', userNavbarState);
        setPageState(name);
        survey.currentPage = survey.getPageByName(name);
        setSurvey(survey);
    }

    // Function that changes page and sets the state of buttons on the navbar
    function changePage(pageName){
        
        if(pageName != "next"){
            survey.currentPage = survey.getPageByName(pageName)
        }
        else{
            // Use ref to get current page state (avoids stale closure in onAfterRenderPanel)
            const currentPageName = pageStateRef.current;
            console.log("Current page from state:", currentPageName);
            
            // Direct page mapping
            let nextPageName;
            switch(currentPageName) {
                case "Governance":
                    nextPageName = "Design";
                    break;
                case "Design":
                    nextPageName = "Implementation";
                    break;
                case "Implementation":
                    nextPageName = "Verification";
                    break;
                case "Verification":
                    nextPageName = "Operations";
                    break;
                case "Operations":
                    nextPageName = "Details";
                    setDetailsPage(true);
                    break;
                case "Details":
                    sessionStorage.setItem('freshCompletion', 'true');
                    router.push('/results');
                    return;
                default:
                    console.log("Unknown page:", currentPageName);
                    return;
            }
            
            console.log("Navigating to:", nextPageName);
            survey.currentPage = survey.getPageByName(nextPageName);
            setPageState(nextPageName);
            var navBarState = sessionStorage.getItem('navbarState');
            navBarState = nextPageName;
            sessionStorage.setItem('navbarState', navBarState);
            setSurvey(survey); 
        }
        
        // Update page state and navbar
        if(pageName != "next"){
            if(pageName == "Details"){
                setDetailsPage(true)
            } else{
                setDetailsPage(false)
            }
            setPageState(pageName);
            var navBarState = sessionStorage.getItem('navbarState');
            navBarState = pageName;
            sessionStorage.setItem('navbarState', navBarState);
            setSurvey(survey);
        }

    }

    var pageChanged = false;
    var panels= [];
    var curr_panel_names = [];
    var panelStateMap = new Map()
    var all_pages = survey.pages;
    var page_names = [];
    

    for(let i = 0; i < all_pages.length; i++){
        page_names.push(all_pages[i].name)

    }
    var currPageIndex = 1 // Initialise at one because of "page1"

    //Reloads arrays with page panel data
    function append_panel_data(in_data){
        for(let i = 0; i < in_data.length;i++){
            curr_panel_names.push(in_data[i].name);
            panels.push(in_data[i]);
        }
    }


    //FirstPage doesn't count as changed page so set to false
    survey.showNavigationButtons = "none";
    

    if (registeredSurveyRef.current !== survey) {
      registeredSurveyRef.current = survey

      survey.onCurrentPageChanged.add(function(survey, option){
        if (panels.length > 0 && curr_panel_names.length > 0){
            panels.length= 0;
            curr_panel_names.length = 0;
            panelStateMap.clear();
        }
        pageChanged = true;
        var currPage = option.newCurrentPage;

        append_panel_data(currPage.getPanels());

        // Sync the state with Top Nav
        if (currPage && currPage.name) {
            setPageState(currPage.name);
            var navBarState = sessionStorage.getItem('navbarState');
            if (navBarState !== currPage.name) {
                sessionStorage.setItem('navbarState', currPage.name);
            }
        }

        // Scroll to top when switching between domain pages (Governance → Design → etc.)
        window.scrollTo({ top: 0, behavior: 'smooth' });

      });

      var page;
      if(!(pageChanged)){
          page = survey.currentPage;
          append_panel_data(page.getPanels())
      }

      function getPanelHeaders(panelName){
          var panelHeaderMap = JSON.parse(sessionStorage.getItem('practiceHeaders'));
          return panelHeaderMap[panelName];
      }

      survey.onAfterRenderPanel.add(function(survey, options){
        var rendered_panel = options.panel.name;
        
        var index = curr_panel_names.indexOf(rendered_panel);
        var firstRender = false;
        var currentPanel = panels[index];
        var curr_page_no = survey.currentPageNo + 1;
        var nextPageName;
        if (curr_page_no + 1 < all_pages.length){
            nextPageName = all_pages[curr_page_no + 1].name;  
        }

        function panelInPage(checkPanel){
            if(curr_panel_names.indexOf(checkPanel) > -1){
                return true;
            }
        }

        function panelScroll(targetPanelName){
            var hTags = document.getElementsByTagName("h4");
            var found;

            for(var i=0; i < hTags.length; i++){
                if (hTags[i].textContent == targetPanelName){
                    found = hTags[i];
                    break;
                }
            }

            // scroll-margin-top in globals.css provides the navbar offset
            if (found && typeof found.scrollIntoView === 'function') {
                found.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        function isFirstPanel(index){
            if (index == 0){
                return true;
            } else{
                return false;
            }
        }

        function isLastPanel(index){
            if (index === curr_panel_names.length - 1){
                return true;
            } else {
                return false;
            }
        }

        function createPanelButton(button_type, btnID){
            var btn = document.createElement('button');
            btn.type = "button";
            btn.className = "btn btn-info btn-xs";
            btn.id = btnID;
            btn.innerHTML = button_type;
            // Insert buttons into html document   
            var header = options.htmlElement.querySelector("h4");
            // if (!header)
            header = options.htmlElement;
            var sanitized_panel = rendered_panel.replace(/\s+/g, '');
            var span = document.createElement("span");
            span.id = sanitized_panel+"panel";
            span.className = 'span';
            span.innerHTML = "  ";
            header.appendChild(span);
            header.appendChild(btn);
            return btn
        }
        
        function deleteButton(btn, btnID){
            btn.remove();
            var sanitized_panel = rendered_panel.replace(/\s+/g, '');
            var span_id = sanitized_panel + "panel";
            var span_rem = document.getElementById(span_id)
            if (span_rem) span_rem.remove();
        }
        
        // Assert panel is in the current page and isDropDownButtonClicked is not true (i.e., false) 
        if(panelInPage(rendered_panel) && (!isDropDownButtonClicked)){
            var sanitized_panel = rendered_panel.replace(/\s+/g, '');
            var nextID = sanitized_panel + "NextNavigator";
            var prevID = sanitized_panel + "PrevNavigator";
           
            
            if (currentPanel.isCollapsed == true){
                // initialise panel as a key if not in stateMap
                if (!(panelStateMap.has(rendered_panel))){
                    panelStateMap.set(rendered_panel, false)
                } else{
                    var nbutton = document.getElementById(nextID)
                    if (nbutton != null){
                        deleteButton(nbutton, nextID);
                    }
                    //Only panels 2 and 3 have prevPanel buttons
                    if (!(isFirstPanel(index))){
                        var pbutton = document.getElementById(prevID);
                        if (pbutton != null){
                            pbutton.remove();
                        }
                    }
                }
            } else if(currentPanel.isCollapsed == false){
                // Do not apply scroll animation to first panel when page loads
                if (!(isFirstPanel(index) && !(panelStateMap.has(rendered_panel)))){
                    panelScroll(rendered_panel);
                } 
            
                // Check if button exists before appending. Only next button checked because it applies to all panels.
                if(document.getElementById(nextID) == null){
                    var nextbtnText;
                    
                    if(isLastPanel(index)){
                        nextbtnText = nextPageText;
                    } else{
                        nextbtnText = nextPracticeText;
                    }

                    var prevPanel = index - 1;
                    if (!(isFirstPanel(index))){
                        if(document.getElementById(prevID) == null){
                            var prevbtn = createPanelButton(previousPracticeText, prevID);
                            prevbtn.onclick = function () {
                                panels[index].collapse();
                                panels[prevPanel].expand();
                                panelScroll(panels[prevPanel].name)
                            }
                        }
                    }
                    var nextbtn = createPanelButton(nextbtnText, nextID);
                    if(index < curr_panel_names.length - 1){
                        var nextPanel = panels[index + 1];
                        nextbtn.onclick = function () {
                            nextPanel.expand();
                            currentPanel.collapse();
                            panelScroll(nextPanel.name);
                        }
                    } else {
                        // Last panel: advance to next domain page (or results on Details)
                        nextbtn.onclick = function () {
                            changePage("next");
                        }
                    }
                    // Set panel "open" state to true 
                    panelStateMap.set(rendered_panel, true)
                }
            }
        }
        if(isLastPanel(index) && isDropDownButtonClicked){
            isDropDownButtonClicked = false
        }

    });
    } // end if (registeredSurveyRef.current !== survey)

    survey.onUpdateQuestionCssClasses.add(function(survey, options) {
        var classes = options.cssClasses
        classes.mainRoot += " sv_qstn";
        classes.root = "sq-root";
        classes.title += " sq-title";
        classes.description ="sq-description";
        classes.item += " sq-item";
        classes.label += " sq-label";
        
    if (options.question.isRequired) {
        classes.title += " sq-title-required";
        classes.root += " sq-root-required";
    }
    if (options.question.getType() === "checkbox") {
        classes.root += " sq-root-cb";
    }
    });

    survey.onValueChanged.add(function(survey, options){
        // Only run on client-side
        if (typeof window === 'undefined') return;
        
        let assessmentStateData = sessionStorage.getItem('assessmentState') ? JSON.parse(sessionStorage.getItem('assessmentState')) : {};
        
        var question_answered = String(options.name);
        var answer_value = options.value;         
        assessmentStateData[question_answered] = answer_value;
        
        // Save to sessionStorage
        sessionStorage.setItem('assessmentState', JSON.stringify(assessmentStateData));
        
        // Also sync with survey.data for redundancy
        console.log(`Saved: ${question_answered} = ${answer_value}`);
    })


    function clearAnswers(){
        let isOK = confirm(t('clearConfirm'))
        
        if (isOK){
            
            const assessmentState = JSON.parse(sessionStorage.getItem('assessmentState'));
            for (const key in assessmentState) {   
                assessmentState[key] = null  
            }    
            
            
            sessionStorage.setItem('assessmentState', JSON.stringify(assessmentState));
        
            if (sessionStorage.getItem('prevResults') !== null) {
                sessionStorage.removeItem('prevResults');
            }
        
           // router.reload()
            setDisplay(!display)
        }
      
    }

    
    function isChangedPage(userStateData){
        if (userStateData != 'assessmentPage'){
            return true;
        } else {
            return false
        }
    }

    
// return a page full of the Survey.JS json that was built in the "surveys" Folder 
    return (
        <>
            <div style={{ marginBottom: '30px' }}>
                <h2 style={{ color: '#00e5ff', fontSize: '24px', fontWeight: '700', marginBottom: '10px' }}>
                    {t('loadPrevious')}
                </h2>
                <p style={{ color: '#cbd5e0', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
                    {t('loadDescription')}
                </p>
                <DropButton name={t('loadResults')} state ={dropDownState} onClick= {value =>handleDropDownButton(value)}/>
                {dropDownState? <InputFile fileName="loadedResults" pageName="assesment"/>:null}
            </div>

            <div className = "pageNav">
                <SurveyButton name={t('clear')} boolean ={false} onClick={() => clearAnswers(true)}/>
                <button className="SaveResponses" onClick={()=> saveResponses()}> {t('saveResponses')} </button>
            </div>
            
                    
            <SurveyNav button = {pageState} onClick = {value => changePage(value)}/>
            <Survey showCompletedPage={false}
                onComplete = {data => prop.showCompletedPage(data.valuesHash)}
                model = {surveyState} 
                />
            
        </>
       
    );
}
 
export default Mysurvey;
