import Head from 'next/head';
import { useTranslations } from 'next-intl';
import { ListChecks } from 'lucide-react';
import type { GetStaticProps } from 'next';
import ActionPlansManager from '../features/maturity/ActionPlansManager';

const ActionPlans = () => {
    const t = useTranslations('maturity');
    const tMeta = useTranslations('meta');

    return (
        <>
            <Head>
                <title>{tMeta('plansTitle')}</title>
                <meta name="description" content={tMeta('description')} />
                <meta name="keywords" content={tMeta('keywords')} />
            </Head>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-2">
                    <ListChecks className="w-7 h-7 text-cyan-400" />
                    <h1 className="text-3xl font-extrabold font-[Poppins] bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                        {t('plansTitle')}
                    </h1>
                </div>
                <p className="text-slate-400 mb-8">{t('plansSubtitle')}</p>

                <ActionPlansManager />
            </div>
        </>
    );
};

export default ActionPlans;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        messages: (await import(`../messages/${locale || 'en'}.json`)).default,
    },
});
