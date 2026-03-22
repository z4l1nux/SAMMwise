import React, { useState } from 'react'
import 'survey-core/defaultV2.min.css';
import Head from 'next/head'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'

//local imports 
const Mysurvey = dynamic(() => import('../features/assessment/surveyone'), { ssr: false })


export default function SAMMsurvey({ messages }){
    const t = useTranslations('assessment');
    const tMeta = useTranslations('meta');
    
    return(<>
            <Head>
                <title>{tMeta('assessmentTitle')}</title>
                <meta name="description" content={tMeta('description')} />
                <meta name="keywords" content={tMeta('keywords')} />
            </Head>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl" style={{ isolation: 'isolate' }}>
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