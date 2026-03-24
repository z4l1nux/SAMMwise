import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import type { GetStaticProps } from 'next';

const NotFound = () => {
    const router = useRouter();
    const t    = useTranslations('notFound');
    const tNav = useTranslations('nav');

    useEffect(() => {
        const timer = setTimeout(() => { router.push('/'); }, 3000);
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="not-found">
            <h1>{t('title')}</h1>
            <h2>{t('subtitle')}</h2>
            <p>{t('redirect')} <Link href="/">{tNav('home')}</Link> in 3 seconds...</p>
        </div>
    );
};

export default NotFound;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        messages: (await import(`../messages/${locale || 'en'}.json`)).default,
    },
});
