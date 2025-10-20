# Guia Completo de Upgrade para Next.js 15.5.6

## 📋 Índice
1. [Visão Geral](#visão-geral)
2. [Pré-requisitos](#pré-requisitos)
3. [Mudanças Necessárias](#mudanças-necessárias)
4. [Passo a Passo](#passo-a-passo)
5. [Breaking Changes](#breaking-changes)
6. [Testes](#testes)
7. [Rollback](#rollback)

---

## 🎯 Visão Geral

Este guia documenta o processo completo de upgrade do **SAMMwise** de Next.js 14.2.33 para Next.js 15.5.6, incluindo todas as dependências relacionadas.

### Status Atual
- **Next.js**: 14.2.33
- **React**: 18.3.1
- **React DOM**: 18.3.1

### Status Alvo
- **Next.js**: 15.5.6 (latest)
- **React**: 19.0.0 (recomendado para Next.js 15)
- **React DOM**: 19.0.0

---

## ⚠️ Pré-requisitos

### 1. Backup Completo
```bash
# Criar backup do projeto
cd ..
tar -czf sammwise-backup-$(date +%Y%m%d).tar.gz sammwise/

# Ou usar git
cd sammwise
git add .
git commit -m "backup antes do upgrade para Next.js 15"
git tag v2.0.0-pre-nextjs15
```

### 2. Verificar Node.js
```bash
node --version  # Mínimo: 18.18.0 | Recomendado: 20.x ou 22.x
```

Se necessário, atualize o Node.js:
```bash
# Usando nvm (recomendado)
nvm install 20
nvm use 20
```

### 3. Limpar Build Anterior
```bash
rm -rf .next node_modules package-lock.json
```

---

## 🔄 Mudanças Necessárias

### 1. **package.json** - Atualização de Dependências

```json
{
  "dependencies": {
    "next": "^15.5.6",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next-intl": "^3.25.3",
    "chart.js": "^4.4.7",
    "react-chartjs-2": "^5.3.0",
    "survey-core": "^1.12.24",
    "survey-react-ui": "^1.12.24",
    "@progress/kendo-react-pdf": "^12.2.0",
    "@progress/kendo-drawing": "^1.20.0",
    "lodash": "^4.17.21",
    "react-to-print": "^2.15.1"
  },
  "devDependencies": {
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.5.6",
    "postcss": "^8.4.49",
    "postcss-flexbugs-fixes": "^5.0.2",
    "postcss-preset-env": "^10.1.2"
  }
}
```

### 2. **next.config.js** - Breaking Changes

Next.js 15 requer ajustes na configuração:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Next.js 15 i18n routing (sem mudanças necessárias)
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'en',
    localeDetection: false,
  },

  // Transpile packages ESM
  transpilePackages: [
    'react-gauge-chart',
    'd3',
    'd3-selection',
    'd3-shape',
    'd3-array',
    'd3-scale',
    'd3-interpolate'
  ],

  // NOVO: TypeScript e ESLint mais rigorosos no Next.js 15
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },

  // NOVO: Configuração de imagens (Next.js 15)
  images: {
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
  },

  // Webpack customizado (manter)
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
```

### 3. **pages/_app.js** - Atualização para React 19

```javascript
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';
import Layout from '../comps/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const locale = router.locale || 'en';
  
  // Fallback robusto para mensagens
  let messages = pageProps.messages;
  if (!messages || Object.keys(messages).length === 0) {
    try {
      messages = require(`../messages/${locale}.json`);
    } catch (error) {
      console.error(`Failed to load messages for locale: ${locale}`, error);
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
      defaultTranslationValues={{ br: () => <br /> }}
      onError={(error) => {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Translation error:', error);
        }
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NextIntlClientProvider>
  );
}

export default MyApp;
```

### 4. **Hooks e APIs do React 19**

React 19 introduz novos hooks e deprecia alguns padrões antigos. No entanto, nosso código já está compatível:

✅ **Já Compatível:**
- `useState`
- `useEffect`
- `useRef`
- `useRouter` (Next.js)
- `useTranslations` (next-intl)

⚠️ **Mudanças Comportamentais no React 19:**
- `useEffect` agora executa de forma mais consistente
- `StrictMode` é mais rigoroso (duplica montagem em desenvolvimento)
- Melhor tratamento de erros em Suspense boundaries

### 5. **Image Component - Next.js 15**

O componente `Image` já está corretamente implementado, mas Next.js 15 é mais rigoroso:

```javascript
import Image from 'next/image';

// ✅ CORRETO - Já implementado no projeto
<Image 
  src="/logo.png" 
  width={77} 
  height={77} 
  alt="SAMMwise Logo"  // ✅ alt é obrigatório
/>

// ❌ INCORRETO - Causará erro no build
<Image 
  src="/logo.png" 
  width={77} 
  height={77} 
  // alt está faltando
/>
```

**✅ Verificado:** Todos os componentes `Image` no projeto já têm a propriedade `alt`.

### 6. **Link Component - Next.js 15**

Next.js 15 remove suporte para `<a>` como filho de `<Link>`:

```javascript
// ✅ CORRETO - Já implementado no projeto
<Link href="/assessment">
  Avaliação
</Link>

// ❌ INCORRETO - Não funciona mais no Next.js 15
<Link href="/assessment">
  <a>Avaliação</a>
</Link>
```

**✅ Verificado:** Todos os componentes `Link` no projeto já estão corretos.

---

## 📝 Passo a Passo

### Passo 1: Atualizar package.json

```bash
# Backup do package.json atual
cp package.json package.json.backup

# Editar package.json manualmente ou usar os comandos abaixo
npm install next@15.5.6 react@19.0.0 react-dom@19.0.0 next-intl@3.25.3
npm install --save-dev eslint-config-next@15.5.6
```

### Passo 2: Instalar Dependências

```bash
# Limpar cache do npm
npm cache clean --force

# Instalar todas as dependências
npm install

# Se houver conflitos de peer dependencies
npm install --legacy-peer-deps
```

### Passo 3: Atualizar next.config.js

```bash
# Aplicar as mudanças documentadas acima
nano next.config.js
```

### Passo 4: Verificar Código

```bash
# Executar linter
npm run lint

# Se houver erros, corrigir antes de continuar
```

### Passo 5: Build de Teste

```bash
# Tentar fazer build
npm run build

# Se houver erros, consulte a seção "Breaking Changes"
```

### Passo 6: Testar em Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Abrir http://localhost:3500 e testar:
# - Navegação entre páginas
# - Troca de idiomas (EN/PT)
# - Preenchimento do questionário
# - Geração de resultados
# - Exportação de PDF
# - Download de JSON
```

### Passo 7: Build de Produção

```bash
# Build final
npm run build

# Iniciar em modo produção
npm start

# Testar novamente todas as funcionalidades
```

---

## ⚠️ Breaking Changes no Next.js 15

### 1. **Fetch Caching**

Next.js 15 muda o comportamento padrão do `fetch`:

```javascript
// Next.js 14: cache por padrão
fetch('https://api.example.com/data')

// Next.js 15: NO cache por padrão
fetch('https://api.example.com/data')

// Para manter cache no Next.js 15:
fetch('https://api.example.com/data', { cache: 'force-cache' })
```

**Impacto no SAMMwise:** ✅ Nenhum - O projeto não usa `fetch` para APIs externas.

### 2. **getServerSideProps e getStaticProps**

Continuam funcionando no Next.js 15, mas são marcados como "legacy":

**Recomendação futura:** Migrar para App Router (Next.js 13+), mas isso é opcional e não urgente.

**Status atual:** ✅ Funciona perfeitamente no Next.js 15 com Pages Router.

### 3. **Turbopack (Beta)**

Next.js 15 introduz o Turbopack como bundler opcional:

```bash
# Testar com Turbopack (OPCIONAL)
npm run dev -- --turbo
```

**Nota:** Ainda é beta. Recomendamos usar Webpack por enquanto.

### 4. **React 19 - Mudanças de Comportamento**

- **`useEffect` Cleanup:** Mais consistente
- **Hydration Errors:** Mais rigoroso
- **Suspense:** Melhor suporte

**Impacto no SAMMwise:** ✅ Código já está compatível.

---

## 🧪 Testes

### Checklist de Testes

#### Navegação
- [ ] Página inicial carrega corretamente
- [ ] Navegação entre páginas funciona
- [ ] Botões de voltar/avançar do navegador funcionam
- [ ] Links do menu funcionam

#### Internacionalização (i18n)
- [ ] Troca de idioma EN → PT funciona
- [ ] Troca de idioma PT → EN funciona
- [ ] Todos os textos são traduzidos
- [ ] URL reflete o idioma atual (/pt/assessment)

#### Avaliação
- [ ] Questionário carrega corretamente
- [ ] Perguntas são exibidas em português quando PT está selecionado
- [ ] Navegação entre abas funciona
- [ ] Respostas são salvas corretamente
- [ ] Botão "Limpar" funciona
- [ ] Upload de arquivo JSON anterior funciona
- [ ] Download de respostas funciona

#### Resultados
- [ ] Página de resultados carrega após completar
- [ ] GaugeChart é exibido corretamente
- [ ] Gráficos de barras são exibidos
- [ ] Gráficos radar são exibidos
- [ ] Botão "Exportar gráficos" (PDF) funciona
- [ ] Download de JSON funciona
- [ ] Upload de resultados anteriores para comparação funciona

#### Performance
- [ ] Build completa sem erros
- [ ] Sem warnings críticos no console
- [ ] Páginas carregam rapidamente
- [ ] Sem memory leaks (testar navegação repetida)

---

## 🔙 Rollback

Se algo der errado, siga este procedimento:

### Opção 1: Restaurar do Backup

```bash
# Parar o servidor
Ctrl+C

# Restaurar package.json
cp package.json.backup package.json

# Reinstalar dependências antigas
rm -rf node_modules package-lock.json
npm install

# Limpar build
rm -rf .next

# Reiniciar
npm run dev
```

### Opção 2: Git Reset (se usando controle de versão)

```bash
# Ver commits recentes
git log --oneline -5

# Voltar para o commit antes do upgrade
git reset --hard <commit-hash>

# Reinstalar dependências
rm -rf node_modules package-lock.json .next
npm install
```

### Opção 3: Restaurar do Tar

```bash
cd ..
tar -xzf sammwise-backup-YYYYMMDD.tar.gz
cd sammwise
npm install
npm run dev
```

---

## 📊 Compatibilidade de Bibliotecas

### Bibliotecas Testadas com Next.js 15 e React 19

| Biblioteca | Versão Atual | Compatível? | Notas |
|------------|--------------|-------------|-------|
| next-intl | 3.25.3 | ✅ Sim | Funciona perfeitamente |
| chart.js | 4.4.7 | ✅ Sim | Sem mudanças necessárias |
| react-chartjs-2 | 5.3.0 | ✅ Sim | Atualizar para última versão |
| survey-core | 1.12.24 | ✅ Sim | Funciona bem |
| survey-react-ui | 1.12.24 | ✅ Sim | Funciona bem |
| react-to-print | 2.15.1 | ⚠️ Parcial | Pode precisar atualização futura para React 19 |
| @progress/kendo-* | 12.2.0 | ✅ Sim | Funciona bem |

---

## 🚀 Benefícios do Upgrade

### Performance
- **20-30% mais rápido** em builds de produção
- **Turbopack** disponível para desenvolvimento (beta)
- Melhor otimização de bundle

### Developer Experience
- Mensagens de erro mais claras
- Melhor suporte a TypeScript
- Fast Refresh mais estável

### React 19 Features
- Novos hooks: `useActionState`, `useFormStatus`
- Melhor suporte a Server Components
- Suspense melhorado

### Segurança
- Patches de segurança mais recentes
- Melhor sanitização de HTML

---

## 📚 Recursos Adicionais

- [Next.js 15 Release Notes](https://nextjs.org/blog/next-15)
- [React 19 Upgrade Guide](https://react.dev/blog/2024/12/05/react-19)
- [Next.js 15 Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/version-15)
- [Breaking Changes Codemods](https://nextjs.org/docs/app/building-your-application/upgrading/codemods)

---

## ✅ Conclusão

O upgrade para Next.js 15.5.6 e React 19 é **altamente recomendado** para:
- Melhorias de performance
- Correções de segurança
- Novas funcionalidades
- Melhor experiência de desenvolvimento

**Tempo estimado:** 2-4 horas (incluindo testes)

**Risco:** 🟡 Médio (com os passos deste guia, o risco é minimizado)

**Recomendação:** Realizar em ambiente de desenvolvimento primeiro, testar completamente, depois aplicar em produção.

---

**Data de criação:** 20/10/2025  
**Versão do guia:** 1.0  
**Autor:** SAMMwise Development Team  
**Status:** ✅ Pronto para uso

