import Head from 'next/head'
import { useTranslations } from 'next-intl'
import styles from '../styles/Home.module.css'

const About = () => {
  const t = useTranslations('home');
  const tMeta = useTranslations('meta');
  
  return (
    <>
      <Head>
        <title>{tMeta('aboutTitle')}</title>
        <meta name="description" content={tMeta('description')} />
        <meta name="keywords" content={tMeta('keywords')} />
      </Head>
      <div>
        <h1 className={styles.title}>{t('aboutSamm')}</h1>
        <p className={styles.paragraph}>{t('sammDescription')}</p>
        <p className={styles.paragraph}>{t('sammPurpose')}</p>
        <ul className={styles.featureList}>
          <li className={styles.paragraph}>{t('purposes.purpose1')}</li>
          <li className={styles.paragraph}>{t('purposes.purpose2')}</li>
          <li className={styles.paragraph}>{t('purposes.purpose3')}</li>
          <li className={styles.paragraph}>{t('purposes.purpose4')}</li>
        </ul>
        <p className={styles.paragraph}>{t('sammFlexibility')}</p>
      </div>
    </>
  );
}

export default About;

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../messages/${locale || 'en'}.json`)).default
    }
  };
}
