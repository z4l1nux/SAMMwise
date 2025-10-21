//trying to make the navigation for the survey into its own component
import React, {useState, useEffect} from 'react';
import { useTranslations } from 'next-intl';

//local imports 
import NavButton from './buttons/navbutton'
import styles from '../styles/navbar.module.css'

const SurveyNav = (props) => {
    const t = useTranslations('assessment.domains');

    const[display, setDisplay] = useState(false)
    useEffect(() => {
        var navbarState = sessionStorage.getItem('navbarState');
        var userState = JSON.parse(sessionStorage.getItem('userState'));
        var currentNavbarState = getNavbarState();
        if (navbarState != currentNavbarState){
            if(!(userState['has_switched_page'])){
                navbarState = currentNavbarState;
                sessionStorage.setItem('navbarState', navbarState);
            }
        }
        

    },[display])
    console.log("this is the button state: " + props.button)

    
    // Internal keys remain in English for logic, but display uses translations
    const buttonState = [{name:"Governance", displayName: t('governance'), state:true},
                         {name:"Design", displayName: t('design'), state:false},
                         {name:"Implementation", displayName: t('implementation'), state:false},
                         {name:"Verification", displayName: t('verification'), state:false},
                         {name:"Operations", displayName: t('operations'), state:false},
                         {name:"Details", displayName: t('details'), state:false}]

    function updateButtonState(index){
        props.onClick(buttonState[index].name);
        setDisplay(!display);
    }
    

    function getNavbarState(){
        for (const key in buttonState){
            if(buttonState[key].state){
                return buttonState[key].name;
            }
        }
    }

    
    for (const key in buttonState) {
           const element = buttonState[key] 
           buttonState[key].state = false
           if(buttonState[key].name == props.button){
            buttonState[key].state = true
           } 
          // console.log("element: "+ element.state +"key: "+ key)   
        }
    
    // Find the display name for current button
    const getCurrentDisplayName = () => {
        const currentButton = buttonState.find(btn => btn.name === props.button);
        return currentButton ? currentButton.displayName : props.button;
    };
    
    return (<> 
        <nav className = {styles.pageNav}>
            <NavButton  name ={buttonState[0].displayName} state={buttonState[0].state}    onClick={()=>updateButtonState(0)}/>
            <NavButton  name ={buttonState[1].displayName} state={buttonState[1].state}    onClick={()=>updateButtonState(1)}/>
            <NavButton  name ={buttonState[2].displayName} state={buttonState[2].state}    onClick={()=>updateButtonState(2)}/>
            <NavButton  name ={buttonState[3].displayName} state={buttonState[3].state}    onClick={()=>updateButtonState(3)} />
            <NavButton  name ={buttonState[4].displayName} state={buttonState[4].state}    onClick={()=>updateButtonState(4)} /> 
            <NavButton  name ={buttonState[5].displayName} state={buttonState[5].state}    onClick={()=>updateButtonState(5)} />
        </nav>
        <div className={styles.pageNav}>
            <h2>{getCurrentDisplayName()}</h2>
        </div>
        </>);
}
 
export default SurveyNav;