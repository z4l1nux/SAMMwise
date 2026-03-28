import Image from 'next/image';
import { useTranslations } from 'next-intl';

const Footer = () => {
    const t = useTranslations('footer');
    const tA11y = useTranslations('a11y');

    return (
        <footer className="relative z-10 border-t border-white/10 bg-[#0f111a]/80 backdrop-blur-md py-12 mt-20 text-center">
            <div className="flex flex-col items-center justify-center space-y-6">
                <a href="https://owasp.org/" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                    <Image src="/Footer.png" width={200} height={66} alt={tA11y('owaspLogoAlt')} priority style={{ width: 'auto', height: 'auto' }} className="invert brightness-0 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"/>
                </a>
                <div className="space-y-2">
                    <p className="text-slate-400 text-sm font-medium">
                        {t('copyright')}
                    </p>
                    <p className="text-slate-500 text-xs">
                        {t('madeWith')}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
