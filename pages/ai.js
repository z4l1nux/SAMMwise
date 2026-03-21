import Head from 'next/head';
import { useTranslations } from 'next-intl';
import LLMSettings from '../comps/llm/LLMSettings';

const AISettingsPage = () => {
    const t = useTranslations('llm');
    const tMeta = useTranslations('meta');

    return (
        <>
            <Head>
                <title>{tMeta('aiTitle')}</title>
                <meta name="description" content={t('pageDescription')} />
            </Head>

            <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '16px',
                padding: '32px',
                marginBottom: '32px',
                color: '#fff',
                boxShadow: '0 8px 32px rgba(102,126,234,0.35)',
            }}>
                <h1 style={{ margin: 0, fontFamily: 'Poppins, sans-serif', fontSize: '26px', color: '#fff' }}>
                    🤖 {t('pageTitle')}
                </h1>
                <p style={{ margin: '10px 0 0', color: 'rgba(255,255,255,0.85)', fontSize: '15px' }}>
                    {t('pageSubtitle')}
                </p>
            </div>

            <div style={{
                background: '#fff',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                padding: '36px',
                border: '1px solid rgba(102,126,234,0.12)',
                marginBottom: '28px',
            }}>
                <LLMSettings />
            </div>

            {/* Info cards */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {[
                    {
                        icon: '🔒',
                        title: t('infoSecurityTitle'),
                        body: t('infoSecurityBody'),
                    },
                    {
                        icon: '📡',
                        title: t('infoProvidersTitle'),
                        body: t('infoProvidersBody'),
                    },
                    {
                        icon: '💾',
                        title: t('infoPersistTitle'),
                        body: t('infoPersistBody'),
                    },
                ].map(card => (
                    <div key={card.title} style={{
                        flex: '1 1 200px',
                        background: '#f7fafc',
                        borderRadius: '12px',
                        padding: '20px',
                        border: '1px solid #e2e8f0',
                    }}>
                        <div style={{ fontSize: '24px', marginBottom: '10px' }}>{card.icon}</div>
                        <div style={{ fontWeight: 700, fontSize: '14px', color: '#2d3748', marginBottom: '6px' }}>{card.title}</div>
                        <div style={{ fontSize: '13px', color: '#718096', lineHeight: 1.6 }}>{card.body}</div>
                    </div>
                ))}
            </div>
        </>
    );
};

export async function getServerSideProps({ locale }) {
    return {
        props: {
            messages: (await import(`../messages/${locale}.json`)).default,
        },
    };
}

export default AISettingsPage;
