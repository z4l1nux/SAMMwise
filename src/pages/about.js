import Head from 'next/head';
import { useTranslations } from 'next-intl';

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
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-4xl font-extrabold font-[Poppins] bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent text-center pb-5 pt-7">
          {t('aboutSamm')}
        </h1>
        <p className="text-slate-300 px-8 py-4 bg-white/5 rounded-xl my-2.5 hover:bg-white/10 hover:translate-x-1 leading-relaxed transition-all duration-200">
          {t('sammDescription')}
        </p>
        <p className="text-slate-300 px-8 py-4 bg-white/5 rounded-xl my-2.5 hover:bg-white/10 hover:translate-x-1 leading-relaxed transition-all duration-200">
          {t('sammPurpose')}
        </p>
        <ul className="list-none p-0">
          <li className="text-slate-300 py-4 px-5 my-4 bg-cyan-500/5 border-l-4 border-cyan-400 rounded-lg hover:translate-x-2.5 hover:shadow-[0_4px_15px_rgba(0,229,255,0.15)] transition-all duration-200">
            {t('purposes.purpose1')}
          </li>
          <li className="text-slate-300 py-4 px-5 my-4 bg-cyan-500/5 border-l-4 border-cyan-400 rounded-lg hover:translate-x-2.5 hover:shadow-[0_4px_15px_rgba(0,229,255,0.15)] transition-all duration-200">
            {t('purposes.purpose2')}
          </li>
          <li className="text-slate-300 py-4 px-5 my-4 bg-cyan-500/5 border-l-4 border-cyan-400 rounded-lg hover:translate-x-2.5 hover:shadow-[0_4px_15px_rgba(0,229,255,0.15)] transition-all duration-200">
            {t('purposes.purpose3')}
          </li>
          <li className="text-slate-300 py-4 px-5 my-4 bg-cyan-500/5 border-l-4 border-cyan-400 rounded-lg hover:translate-x-2.5 hover:shadow-[0_4px_15px_rgba(0,229,255,0.15)] transition-all duration-200">
            {t('purposes.purpose4')}
          </li>
        </ul>
        <p className="text-slate-300 px-8 py-4 bg-white/5 rounded-xl my-2.5 hover:bg-white/10 hover:translate-x-1 leading-relaxed transition-all duration-200">
          {t('sammFlexibility')}
        </p>
      </div>
    </>
  );
};

export default About;

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../messages/${locale || 'en'}.json`)).default,
    },
  };
}
