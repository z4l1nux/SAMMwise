# Tradução do Questionário SAMM

## 📋 Implementação

A tradução das perguntas e respostas do questionário SAMM foi implementada em 3 camadas:

### 1. **Survey.js Localization** (Textos Comuns)
Arquivo: `comps/surveys/survey-pt.js`

Traduz todos os textos padrão do Survey.js:
- Botões (Próximo, Anterior, Concluir)
- Mensagens de erro
- Placeholders
- Mensagens do sistema

### 2. **Traduções Específicas SAMM** (Nomes de Práticas e Respostas)
Arquivo: `comps/surveys/translations-pt.js`

Traduz:
- **Nomes dos Panels** (Práticas SAMM):
  - "Threat Assessment" → "Avaliação de Ameaças"
  - "Policy and Compliance" → "Política e Conformidade"
  - Etc.
  
- **Opções de Resposta Comuns**:
  - "No" → "Não"
  - "Yes, some of them" → "Sim, para alguns deles"
  - "Yes, at least half of them" → "Sim, para pelo menos metade deles"
  - Etc.

### 3. **Aplicação Dinâmica**
Arquivo: `comps/surveyTypes/surveytypeone.js`

O componente:
1. Detecta o locale atual do Next.js router
2. Inicializa o survey com o locale correto
3. Aplica as traduções dinamicamente

## 🔧 Como Funciona

```javascript
// 1. Survey detecta o locale
const currentLocale = router.locale || 'en';

// 2. JSON do survey é traduzido
const surveyJSON = Json(currentLocale);

// 3. Survey é criado com locale correto
survey = new Model(surveyJSON);
survey.locale = currentLocale;
```

## 📝 Estrutura de Tradução

```javascript
// translations-pt.js
export const surveyTranslationsPT = {
  panels: {
    "Threat Assessment": "Avaliação de Ameaças",
    // ...
  },
  choices: {
    "No": "Não",
    "Yes": "Sim",
    // ...
  }
};

// Função translateSurvey percorre o JSON e aplica traduções
export function translateSurvey(surveyJSON, locale) {
  // Traduz panels
  // Traduz choices
  return translatedJSON;
}
```

## ✅ O Que Foi Traduzido

### Textos do Sistema
- [x] Botões de navegação
- [x] Mensagens de erro
- [x] Placeholders
- [x] Confirmações

### Conteúdo SAMM
- [x] Nomes das práticas (panels)
- [x] Opções de resposta comuns
- [ ] Títulos das perguntas (TODO)
- [ ] Descrições das perguntas (TODO)

## 🚧 Próximos Passos

### Para Completar a Tradução:

1. **Adicionar traduções das perguntas individuais:**
   ```javascript
   questions: {
     "Do you classify applications...": "Você classifica aplicações...",
     // ... todas as ~90 perguntas
   }
   ```

2. **Adicionar traduções das descrições:**
   ```javascript
   descriptions: {
     "An agreed-upon risk classification exists": "Existe uma classificação de risco acordada",
     // ...
   }
   ```

3. **Expandir função translateSurvey:**
   ```javascript
   // Traduzir título da pergunta
   if (question.title && surveyTranslationsPT.questions[question.title]) {
     question.title = surveyTranslationsPT.questions[question.title];
   }
   
   // Traduzir descrição
   if (question.description && surveyTranslationsPT.descriptions[question.description]) {
     question.description = surveyTranslationsPT.descriptions[question.description];
   }
   ```

## 📊 Status Atual

- **Sistema Survey.js**: ✅ 100% traduzido
- **Nomes de Práticas**: ✅ 100% traduzido (15 práticas)
- **Opções de Resposta**: ✅ ~80% traduzido (principais variações)
- **Perguntas**: ❌ 0% (pendente - ~90 perguntas)
- **Descrições**: ❌ 0% (pendente - ~90 descrições)

## 🔄 Teste

Para testar se as traduções estão funcionando:

1. Acesse `/pt/assessment`
2. Verifique:
   - Tabs (Governança, Design, etc.) ✅
   - Botões (Limpar, Salvar, Próxima Página) ✅
   - Nomes dos panels (deve mostrar "Avaliação de Ameaças" em vez de "Threat Assessment")
   - Opções de resposta (deve mostrar "Não", "Sim" em vez de "No", "Yes")

## 📝 Notas Importantes

1. **Performance**: As traduções são aplicadas uma vez na inicialização do componente
2. **Locale Persistence**: O Next.js gerencia automaticamente via cookies
3. **Extensibilidade**: Fácil adicionar novos idiomas seguindo o mesmo padrão
4. **Fallback**: Se uma tradução não existe, mantém o texto original em inglês

## 🐛 Troubleshooting

### As traduções não aparecem?

1. Limpe o cache: `rm -rf .next`
2. Reinicie o servidor: `npm run dev`
3. Limpe o cache do navegador (Ctrl+Shift+R)
4. Verifique o console do navegador para erros

### Algumas traduções funcionam, outras não?

- Verifique se o texto original está exatamente igual no `translations-pt.js`
- Espaços extras, capitalização diferente impedirão a correspondência
- Use a ferramenta de busca para verificar a string exata no código fonte

---

**Criado em**: 20 de Outubro de 2025  
**Versão**: SAMMwise v2.0.0

