import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/LanguageSwitcher.module.css';

const LanguageSwitcher = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  
  // Get current locale from Next.js router
  const currentLocale = router.locale || 'en';

  const changeLanguage = (locale) => {
    setIsOpen(false);
    
    // Use Next.js built-in locale switching with full page reload to update translations
    const { pathname, query, asPath } = router;
    
    // Construct the new URL with the locale prefix
    const newPath = `/${locale}${asPath === '/' ? '' : asPath}`;
    
    // Force a full page reload to ensure all translations are updated
    window.location.href = newPath;
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' }
  ];

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

  return (
    <div className={styles.languageSwitcher}>
      <button 
        className={styles.currentLanguage}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
      >
        <span className={styles.flag}>{currentLanguage.flag}</span>
        <span className={styles.languageCode}>{currentLanguage.code.toUpperCase()}</span>
        <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
      </button>
      
      {isOpen && (
        <div className={styles.dropdown}>
          {languages.map((language) => (
            <button
              key={language.code}
              className={`${styles.languageOption} ${
                currentLocale === language.code ? styles.active : ''
              }`}
              onClick={() => changeLanguage(language.code)}
            >
              <span className={styles.flag}>{language.flag}</span>
              <span className={styles.languageName}>{language.name}</span>
              {currentLocale === language.code && (
                <span className={styles.checkmark}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;

