import '../styles/globals.css';
import Layout from '../components/layout';
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const locale = router.locale || 'en';

    useEffect(() => {
        const scrollToTop = () => window.scrollTo(0, 0);
        router.events.on('routeChangeComplete', scrollToTop);
        return () => router.events.off('routeChangeComplete', scrollToTop);
    }, [router.events]);

    let messages = pageProps.messages;

    if (!messages || Object.keys(messages).length === 0) {
        try {
            messages = require(`../messages/${locale}.json`);
        } catch (error) {
            console.error(`Failed to load messages for locale: ${locale}`, error);
            try {
                messages = require(`../messages/en.json`);
            } catch (e) {
                messages = {};
            }
        }
    }

    const providerProps = {
        messages,
        locale,
        timeZone: 'UTC',
        defaultTranslationValues: { br: () => <br /> },
        onError: (error: any) => {
            if (process.env.NODE_ENV === 'development') {
                console.warn('Translation error:', error);
            }
        },
    };

    return (
        <NextIntlClientProvider {...(providerProps as any)}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </NextIntlClientProvider>
    );
}

export default MyApp;
