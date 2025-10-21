import Image from 'next/image'
import { useTranslations } from 'next-intl'

const Footer = () => {
    const t = useTranslations('footer');
    
    return ( 
        <footer>
            <a href="https://owasp.org/" target="_blank" rel="noopener noreferrer">
                <Image src="/Footer.png" width={300} height={100} alt="OWASP Logo" />
            </a>
            <p style={{ marginTop: '20px', color: '#4a5568', fontSize: '14px' }}>
                {t('copyright')}
            </p>
            <p style={{ marginTop: '10px', color: '#2d3748', fontSize: '14px' }}>
                {t('madeWith')}
            </p>
        </footer>
    );
}
 
export default Footer;
