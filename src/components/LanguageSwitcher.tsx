import { useRouter } from 'next/router';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const LanguageSwitcher = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const tA11y = useTranslations('a11y');

    const currentLocale = router.locale || 'en';

    const changeLanguage = (locale: string) => {
        setIsOpen(false);
        const { asPath } = router;
        const newPath = `/${locale}${asPath === '/' ? '' : asPath}`;
        window.location.href = newPath;
    };

    const languages: Language[] = [
        { code: 'en', name: 'English',    flag: '🇺🇸' },
        { code: 'pt', name: 'Português',  flag: '🇧🇷' },
    ];

    const currentLanguage = languages.find(l => l.code === currentLocale) || languages[0];

    return (
        <div className="relative inline-block">
            <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-slate-200 text-sm font-semibold cursor-pointer hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-200"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={tA11y('selectLanguage')}
            >
                <span className="text-lg leading-none">{currentLanguage.flag}</span>
                <span className="font-bold tracking-wide text-sm">{currentLanguage.code.toUpperCase()}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-cyan-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-[calc(100%+8px)] right-0 min-w-[180px] bg-[#1e212b] border border-white/10 rounded-xl shadow-2xl p-2 z-[1000]"
                    >
                        {languages.map(language => (
                            <button
                                key={language.code}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-left cursor-pointer transition-all duration-200 hover:bg-white/5 hover:text-cyan-400 hover:translate-x-1 ${
                                    currentLocale === language.code
                                        ? 'text-cyan-400 bg-cyan-500/10 font-semibold'
                                        : 'text-slate-300'
                                }`}
                                onClick={() => changeLanguage(language.code)}
                            >
                                <span className="text-lg leading-none">{language.flag}</span>
                                <span className="flex-1 font-medium">{language.name}</span>
                                {currentLocale === language.code && (
                                    <Check className="w-4 h-4 text-cyan-400" />
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSwitcher;
