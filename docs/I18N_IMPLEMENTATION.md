# Implementação de I18N no SAMMwise

## 🎯 Solução Final

A implementação de internacionalização no SAMMwise usa uma abordagem híbrida:
- **Next.js i18n nativo** para roteamento e detecção de locale
- **next-intl** para gerenciamento de traduções e hooks React

### Por Que Esta Abordagem?

1. **Sem conflitos de middleware**: Usar i18n nativo elimina loops de redirecionamento
2. **Compatível com Pages Router**: Funciona perfeitamente com a estrutura `pages/`
3. **Melhor performance**: Menos overhead de middleware
4. **Simples de manter**: Configuração mais direta e clara

## 📁 Estrutura de Arquivos

```
sammwise/
├── messages/
│   ├── en.json           # Traduções em inglês
│   └── pt.json           # Traduções em português (BR)
├── next.config.js        # Configuração i18n nativa
├── pages/
│   ├── _app.js          # NextIntlClientProvider wrapper
│   ├── index.js         # getStaticProps para carregar messages
│   ├── about.js         # getStaticProps para carregar messages
│   ├── assessment.js    # getStaticProps para carregar messages
│   ├── results.js       # getServerSideProps (cliente-only)
│   └── 404.js           # getStaticProps para carregar messages
└── comps/
    ├── navbar.js        # Usa useTranslations
    ├── footer.js        # Usa useTranslations
    └── LanguageSwitcher.js  # Seletor de idioma
```

## 🔧 Configuração

### 1. next.config.js

```javascript
const nextConfig = {
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'en',
    localeDetection: true,  // Detecta idioma do browser
  },
  // ...
};
```

### 2. pages/_app.js

```javascript
import { NextIntlClientProvider } from 'next-intl'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const messages = pageProps.messages || {};
  const locale = router.locale || 'en';

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NextIntlClientProvider>
  )
}
```

### 3. Páginas com getStaticProps

```javascript
export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../messages/${locale || 'en'}.json`)).default
    }
  };
}
```

### 4. Páginas com getServerSideProps (client-only)

```javascript
export async function getServerSideProps({ locale }) {
  return {
    props: {
      messages: (await import(`../messages/${locale || 'en'}.json`)).default
    }
  };
}
```

### 5. LanguageSwitcher Component

```javascript
import { useRouter } from 'next/router';

const LanguageSwitcher = () => {
  const router = useRouter();
  const currentLocale = router.locale || 'en';
  
  const changeLanguage = (locale) => {
    const { pathname, query, asPath } = router;
    // Usa API nativa do Next.js para mudar locale
    router.push({ pathname, query }, asPath, { locale });
  };
  
  // ... UI ...
};
```

## 🌐 URLs

- **Inglês (padrão)**: `http://localhost:3500/` ou `http://localhost:3500/en`
- **Português**: `http://localhost:3500/pt`
- **Sobre (EN)**: `http://localhost:3500/about`
- **Sobre (PT)**: `http://localhost:3500/pt/about`

## ✅ Funcionalidades

### 1. Detecção Automática de Idioma

O Next.js detecta automaticamente o idioma preferido do navegador via header `Accept-Language`.

### 2. Troca de Idioma

O componente `LanguageSwitcher` permite trocar entre inglês e português mantendo a mesma página.

### 3. Persistência de Locale

O Next.js automaticamente persiste o locale escolhido via cookies (`NEXT_LOCALE`).

### 4. SEO

Cada página gera automaticamente tags `<html lang="...">` corretas e pode incluir `hreflang` alternates.

## 🔍 Uso em Componentes

### Hook useTranslations

```javascript
import { useTranslations } from 'next-intl';

const MyComponent = () => {
  const t = useTranslations('nav');
  
  return (
    <div>
      <h1>{t('home')}</h1>
      <p>{t('about')}</p>
    </div>
  );
};
```

### Estrutura do JSON

```json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "assessment": "Assessment",
    "results": "Results"
  },
  "home": {
    "title": "SAMMwise",
    "description": "..."
  }
}
```

### Acesso Aninhado

```javascript
const t = useTranslations('home');

<h1>{t('title')}</h1>
<p>{t('features.feature1')}</p>  {/* Acessa home.features.feature1 */}
```

## 📝 Adicionando Novo Idioma

1. **Criar arquivo de tradução**:
   ```bash
   cp messages/en.json messages/es.json
   # Traduzir conteúdo para espanhol
   ```

2. **Atualizar next.config.js**:
   ```javascript
   i18n: {
     locales: ['en', 'pt', 'es'],
     defaultLocale: 'en',
   }
   ```

3. **Atualizar LanguageSwitcher**:
   ```javascript
   const languages = [
     { code: 'en', name: 'English', flag: '🇺🇸' },
     { code: 'pt', name: 'Português', flag: '🇧🇷' },
     { code: 'es', name: 'Español', flag: '🇪🇸' },
   ];
   ```

4. **Rebuild**:
   ```bash
   rm -rf .next
   npm run dev
   ```

## 🐛 Troubleshooting

### Erro: "MISSING_MESSAGE"

**Causa**: Mensagem não encontrada no JSON
**Solução**: Verificar se a chave existe em ambos `en.json` e `pt.json`

### Erro: "ERR_TOO_MANY_REDIRECTS"

**Causa**: Conflito entre middleware e i18n nativo
**Solução**: Usar APENAS i18n nativo (sem middleware.js)

### Mensagens não aparecem

**Causa**: `getStaticProps` ou `getServerSideProps` não exportado
**Solução**: Adicionar em todas as páginas:
```javascript
export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../messages/${locale || 'en'}.json`)).default
    }
  };
}
```

### Locale não muda

**Causa**: Router.push sem parâmetro `locale`
**Solução**: Sempre passar `{ locale }`:
```javascript
router.push({ pathname, query }, asPath, { locale });
```

## 📊 Status Atual

✅ **Inglês (EN)** - 100% completo
✅ **Português (PT-BR)** - 100% completo

### Páginas Traduzidas

- ✅ Home (`/`)
- ✅ About (`/about`)
- ✅ Assessment (`/assessment`)
- ✅ Results (`/results`)
- ✅ 404

### Componentes Traduzidos

- ✅ Navbar
- ✅ Footer
- ✅ Survey (Assessment forms)
- ✅ Results graphs and text
- ✅ Meta tags (SEO)

## 🚀 Performance

- **Build time**: +15s (gerando páginas para 2 locales)
- **Runtime overhead**: ~0ms (i18n nativo é otimizado)
- **Bundle size**: +25KB (mensagens JSON)
- **First Load JS**: Sem impacto significativo

## 📚 Referências

- [Next.js Internationalization](https://nextjs.org/docs/advanced-features/i18n-routing)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [React Intl Best Practices](https://formatjs.io/docs/react-intl/)

---

**Documentado em**: 20 de Outubro de 2025
**Versão**: SAMMwise v2.0.0

