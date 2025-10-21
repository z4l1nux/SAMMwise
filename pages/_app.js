import '../styles/globals.css'
import Layout from '../comps/layout'
import { NextIntlClientProvider } from 'next-intl'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const locale = router.locale || 'en';
  
  // Use messages from pageProps, but ensure we always have a valid messages object
  // If messages is undefined/null, try to load them synchronously during SSR
  let messages = pageProps.messages;
  
  if (!messages || Object.keys(messages).length === 0) {
    // Fallback: load default locale messages
    try {
      messages = require(`../messages/${locale}.json`);
    } catch (error) {
      console.error(`Failed to load messages for locale: ${locale}`, error);
      // Last resort: load English
      try {
        messages = require(`../messages/en.json`);
      } catch (e) {
        messages = {};
      }
    }
  }

  return (
    <NextIntlClientProvider 
      messages={messages} 
      locale={locale}
      timeZone="UTC"
      defaultTranslationValues={{
        br: () => <br />
      }}
      onError={(error) => {
        // During build, log but don't throw
        if (process.env.NODE_ENV === 'development') {
          console.warn('Translation error:', error);
        }
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NextIntlClientProvider>
  )
}

export default MyApp
