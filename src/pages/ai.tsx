import Head from 'next/head';
import { useTranslations } from 'next-intl';
import { Bot, ShieldCheck, Globe, HardDrive } from 'lucide-react';
import LLMSettings from '../features/ai-analysis/LLMSettings';
import type { GetServerSideProps } from 'next';
import type { LucideIcon } from 'lucide-react';

interface InfoCard {
  Icon: LucideIcon;
  title: string;
  body: string;
}

const AISettingsPage = () => {
    const t    = useTranslations('llm');
    const tMeta = useTranslations('meta');

    return (
        <>
            <Head>
                <title>{tMeta('aiTitle')}</title>
                <meta name="description" content={t('pageDescription')} />
            </Head>

            <div className="bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-400/20 backdrop-blur-md rounded-2xl p-8 mb-8 shadow-[0_8px_32px_rgba(0,229,255,0.15)]">
                <h1 className="m-0 font-[Poppins] text-2xl text-white font-semibold flex items-center gap-3">
                    <Bot className="w-7 h-7 text-cyan-400" /> {t('pageTitle')}
                </h1>
                <p className="mt-2.5 text-slate-300 text-sm">{t('pageSubtitle')}</p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-9 mb-7 shadow-xl">
                <LLMSettings />
            </div>

            <div className="flex flex-wrap gap-4">
                {([
                    { Icon: ShieldCheck, title: t('infoSecurityTitle'), body: t('infoSecurityBody') },
                    { Icon: Globe,       title: t('infoProvidersTitle'), body: t('infoProvidersBody') },
                    { Icon: HardDrive,   title: t('infoPersistTitle'),  body: t('infoPersistBody') },
                ] as InfoCard[]).map(card => (
                    <div key={card.title} className="flex-[1_1_200px] bg-white/5 border border-white/10 rounded-xl p-5 hover:border-cyan-400/30 transition-all duration-200">
                        <card.Icon className="w-6 h-6 text-cyan-400 mb-2.5" />
                        <div className="font-bold text-sm text-slate-200 mb-1.5">{card.title}</div>
                        <div className="text-xs text-slate-400 leading-relaxed">{card.body}</div>
                    </div>
                ))}
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        messages: (await import(`../messages/${locale}.json`)).default,
    },
});

export default AISettingsPage;
