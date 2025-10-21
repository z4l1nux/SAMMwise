import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

const NotFound = () => {
  const router = useRouter();
  const t = useTranslations('nav');
  
  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 3000)
  }, [router])

  return (
    <div className="not-found">
      <h1>404 - Oops!</h1>
      <h2>That page cannot be found</h2>
      <p>Going back to the <Link href="/">{t('home')}</Link> in 3 seconds...</p>
    </div>
  );
}

export default NotFound;

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../messages/${locale || 'en'}.json`)).default
    }
  };
}
