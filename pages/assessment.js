import React, { useState } from 'react'
import 'survey-core/defaultV2.min.css';
import Head from 'next/head'
import { useTranslations } from 'next-intl'
//local imports 
import Mysurvey from '../comps/surveyDisplay/surveyone'


export default function SAMMsurvey({ messages }){
    const t = useTranslations('assessment');
    const tMeta = useTranslations('meta');
    
    return(<>
            <Head>
                <title>{tMeta('assessmentTitle')}</title>
                <meta name="description" content={tMeta('description')} />
                <meta name="keywords" content={tMeta('keywords')} />
            </Head>
            <div>
                <Mysurvey/>   
            </div>
        </>)
};

export async function getServerSideProps({ locale }) {
  const messages = (await import(`../messages/${locale || 'en'}.json`)).default;
  
  return {
    props: {
      messages: messages || {}
    }
  };
}