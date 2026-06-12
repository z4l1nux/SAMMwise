import Head from 'next/head';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Target } from 'lucide-react';
import type { GetStaticProps } from 'next';
import TargetEditor from '../features/maturity/TargetEditor';

const Targets = () => {
    const t = useTranslations('maturity');
    const tMeta = useTranslations('meta');

    return (
        <>
            <Head>
                <title>{tMeta('targetsTitle')}</title>
                <meta name="description" content={tMeta('description')} />
                <meta name="keywords" content={tMeta('keywords')} />
            </Head>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-2">
                    <Target className="w-7 h-7 text-cyan-400" />
                    <h1 className="text-3xl font-extrabold font-[Poppins] bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                        {t('targetsTitle')}
                    </h1>
                </div>
                <p className="text-slate-400 mb-6">{t('targetsSubtitle')}</p>
                <p className="text-slate-500 text-sm mb-8">
                    {t('targetsHint')}{' '}
                    <Link href="/results" className="text-cyan-400 hover:text-cyan-300">{t('targetsSeeGap')} →</Link>
                </p>

                <TargetEditor />
            </div>
        </>
    );
};

export default Targets;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        messages: (await import(`../messages/${locale || 'en'}.json`)).default,
    },
});
