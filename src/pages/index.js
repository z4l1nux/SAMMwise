import Head from 'next/head'
import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Shield, BarChart3, Lock, ChevronRight } from 'lucide-react'

export default function Home() {
  const t = useTranslations('home');
  const tMeta = useTranslations('meta');
  
  useEffect(()=>{
    var testStorage = sessionStorage.getItem('assessmentState');
    if(testStorage == null){
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
  }, [])
  
  function initialiseAssessmentState(statePointer){
    for(let i = 1; i < 91; i++){
        var key_name = 'question' + i;
        statePointer[key_name] = null;
    }
    statePointer['Company Name'] = null;
    statePointer['Project name'] = null;
    statePointer['Description of Project'] = null;
  }
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  }

  return (
    <>
    <Head>
      <title>{tMeta('homeTitle')}</title>
      <meta name="description" content={tMeta('description')} />
      <meta name="keywords" content={tMeta('keywords')} />
    </Head>
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center pt-20 pb-16 text-center"
    >
      <motion.div variants={itemVariants} className="inline-block mb-4 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm font-semibold tracking-wide shadow-[0_0_15px_rgba(0,229,255,0.2)]">
        OWASP Security Assurance Maturity Model
      </motion.div>
      
      <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
        <span className="text-slate-100">{t('title')}</span>
      </motion.h1>
      
      <motion.p variants={itemVariants} className="max-w-3xl text-lg md:text-xl text-slate-400 mb-12 leading-relaxed">
        {t('description')}
      </motion.p>
      
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-6 mb-24">
         <Link href="/assessment" className="group relative px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] flex items-center gap-2">
            {t('startAssessment')}
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
         </Link>
         <Link href="/results" className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all flex items-center gap-2">
            {t('viewResults')}
            <BarChart3 className="w-5 h-5" />
         </Link>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl text-left">
        {/* Features Cards */}
        <div className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 backdrop-blur-sm hover:border-cyan-500/30 transition-all hover:-translate-y-1">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            <Shield className="w-6 h-6 text-cyan-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-200 mb-3">{t('features.feature1')}</h3>
          <p className="text-slate-400 leading-relaxed text-sm">{t('features.feature1Desc')}</p>
        </div>

        <div className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 backdrop-blur-sm hover:border-purple-500/30 transition-all hover:-translate-y-1">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <BarChart3 className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-200 mb-3">{t('features.feature2')}</h3>
          <p className="text-slate-400 leading-relaxed text-sm">{t('features.feature2Desc')}</p>
        </div>

        <div className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 backdrop-blur-sm hover:border-pink-500/30 transition-all hover:-translate-y-1">
          <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
            <Lock className="w-6 h-6 text-pink-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-200 mb-3">{t('features.feature3')}</h3>
          <p className="text-slate-400 leading-relaxed text-sm">{t('features.feature3Desc')}</p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-24 max-w-4xl text-left p-10 rounded-3xl border border-white/10 bg-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full -z-10 pointer-events-none"></div>
        <h2 className="text-3xl font-bold text-slate-100 mb-6">{t('aboutSamm')}</h2>
        <p className="text-slate-300 mb-4">{t('sammDescription')}</p>
        <p className="text-slate-300 mb-6">{t('sammPurpose')}</p>
        <ul className="space-y-3 mb-6">
          <li className="flex items-start gap-3">
            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(0,229,255,0.8)]"></div>
            <span className="text-slate-400">{t('purposes.purpose1')}</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(0,229,255,0.8)]"></div>
            <span className="text-slate-400">{t('purposes.purpose2')}</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(0,229,255,0.8)]"></div>
            <span className="text-slate-400">{t('purposes.purpose3')}</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(0,229,255,0.8)]"></div>
            <span className="text-slate-400">{t('purposes.purpose4')}</span>
          </li>
        </ul>
        <p className="text-slate-400 italic text-sm pt-4 border-t border-white/10">{t('sammFlexibility')}</p>
      </motion.div>
    </motion.div>
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
