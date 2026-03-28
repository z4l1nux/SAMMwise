import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import { motion } from 'framer-motion';

const Navbar = () => {
    const t = useTranslations('nav');
    const tA11y = useTranslations('a11y');

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="sticky top-6 z-50 mx-auto w-11/12 max-w-7xl rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-md shadow-2xl flex justify-between items-center"
        >
            <div className="flex items-center space-x-3">
                <Image src="/logo.png" width={40} height={40} alt={tA11y('logoAlt')} priority style={{ width: 'auto', height: 'auto' }} className="drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]" />
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent tracking-wide">
                    AISVSwise
                </span>
            </div>

            <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
                <Link href="/" className="text-slate-300 hover:text-cyan-400 transition-colors">{t('home')}</Link>
                <Link href="/about" className="text-slate-300 hover:text-cyan-400 transition-colors">{t('about')}</Link>
                <Link href="/assessment" className="text-slate-300 hover:text-cyan-400 transition-colors">{t('assessment')}</Link>
                <Link href="/results" className="text-slate-300 hover:text-cyan-400 transition-colors">{t('results')}</Link>
                <Link href="/ai" className="text-slate-300 hover:text-cyan-400 transition-colors">{t('ai')}</Link>
            </div>

            <div className="flex items-center">
                <LanguageSwitcher />
            </div>
        </motion.nav>
    );
};

export default Navbar;
