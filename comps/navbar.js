import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'

const Navbar = () => {
    const t = useTranslations('nav');
    
    return (
        <nav>
            <div className="logo">
                <Image src="/logo.png" width={77} height={77} alt="SAMMwise Logo"/>
            </div>
            <Link href="/">{t('home')}</Link>
            <Link href="/about">{t('about')}</Link>
            <Link href="/assessment">{t('assessment')}</Link>
            <Link href="/results">{t('results')}</Link>
            <LanguageSwitcher />
        </nav>
    );
}
 
export default Navbar
