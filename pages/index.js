import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react'
import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('home');
  const tMeta = useTranslations('meta');
  
  useEffect(()=>{
    var testStorage = sessionStorage.getItem('assessmentState');
    if(testStorage == null){
      // Initialise variables to keep track of user state across pages
      console.log('defaults set');
      var assessmentStateData = new Map();
      initialiseAssessmentState(assessmentStateData)
      sessionStorage.setItem('assessmentState', JSON.stringify(assessmentStateData));
      var userState = {};
      var page = 'page';
      var page_boolean = 'has_switched_page';
      var currentPageName = 'homePage';
      userState[page] = currentPageName;
      userState[page_boolean] = true;
      var navbarState = 'Governance';
      sessionStorage.setItem('userState', JSON.stringify(userState));
      sessionStorage.setItem('navbarState', navbarState);
    } else{
      var uState = JSON.parse(sessionStorage.getItem('userState'));
      uState['has_switched_page'] = true;
      uState['page'] = 'homePage';
      sessionStorage.setItem('userState', JSON.stringify(uState));
    } 
  })
  
  
  function initialiseAssessmentState(statePointer){
    //Fill assessment state as 0 (all qs are initially empty)
    for(let i = 1; i < 91; i++){
        var key_name = 'question' + i;
        statePointer[key_name] = null;
    }
    statePointer['Company Name'] = null;
    statePointer['Project name'] = null;
    statePointer['Description of Project'] = null;
  }
  
  return (
    <>
    <Head>
      <title>{tMeta('homeTitle')}</title>
      <meta name="description" content={tMeta('description')} />
      <meta name="keywords" content={tMeta('keywords')} />
    </Head>
    <div>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.paragraph}>{t('description')}</p>
      <ul className={styles.featureList}>
        <li className={styles.paragraph}>{t('features.feature1')}</li>
        <li className={styles.paragraph}>{t('features.feature2')}</li>
        <li className={styles.paragraph}>{t('features.feature3')}</li>
      </ul>
      <p className={styles.paragraph}>{t('privacy')}</p>

      <h1 className={styles.title}>{t('aboutSamm')}</h1>
      <p className={styles.paragraph}>{t('sammDescription')}</p>
      <p className={styles.paragraph}>{t('sammPurpose')}</p>
      <ul className={styles.featureList}>
        <li className={styles.paragraph}>{t('purposes.purpose1')}</li>
        <li className={styles.paragraph}>{t('purposes.purpose2')}</li>
        <li className={styles.paragraph}>{t('purposes.purpose3')}</li>
        <li className={styles.paragraph}>{t('purposes.purpose4')}</li>
      </ul>
      <p className={styles.paragraph}>{t('sammFlexibility')}</p>
    </div>
    </>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../messages/${locale || 'en'}.json`)).default
    }
  };
}
