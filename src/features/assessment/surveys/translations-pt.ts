// Traduções AISVS para Português (Brasil)

/** Choice text translations (used in all survey questions) */
const choiceTranslations: Record<string, string> = {
  "No": "Não",
  "Yes, for some": "Sim, para alguns",
  "Yes, for most": "Sim, para a maioria",
  "Yes, for all": "Sim, para todos",
};

/** Page name translations (Control 1–14 + Details) */
const pageTranslations: Record<string, string> = {
  "Control 1": "Controle 1",
  "Control 2": "Controle 2",
  "Control 3": "Controle 3",
  "Control 4": "Controle 4",
  "Control 5": "Controle 5",
  "Control 6": "Controle 6",
  "Control 7": "Controle 7",
  "Control 8": "Controle 8",
  "Control 9": "Controle 9",
  "Control 10": "Controle 10",
  "Control 11": "Controle 11",
  "Control 12": "Controle 12",
  "Control 13": "Controle 13",
  "Control 14": "Controle 14",
  "Details": "Detalhes",
};

/** Panel (sub-control) name translations */
const panelTranslations: Record<string, string> = {
  // C1 — Training Data
  "C1.1 Training Data Origin & Traceability": "C1.1 Origem e Rastreabilidade dos Dados de Treino",
  "C1.2 Training Data Security & Integrity": "C1.2 Segurança e Integridade dos Dados de Treino",
  "C1.3 Data Labeling and Annotation Security": "C1.3 Segurança de Rotulagem e Anotação de Dados",
  "C1.4 Training Data Quality and Security Assurance": "C1.4 Qualidade e Garantia de Segurança dos Dados de Treino",
  "C1.5 Data Lineage and Traceability": "C1.5 Linhagem e Rastreabilidade de Dados",

  // C2 — Input Validation
  "C2.1 Prompt Injection Defense": "C2.1 Defesa contra Injeção de Prompt",
  "C2.2 Adversarial-Example Resistance": "C2.2 Resistência a Exemplos Adversariais",
  "C2.3 Prompt Character Set": "C2.3 Conjunto de Caracteres de Prompt",
  "C2.4 Schema, Type & Length Validation": "C2.4 Validação de Esquema, Tipo e Comprimento",
  "C2.5 Content & Policy Screening": "C2.5 Triagem de Conteúdo e Políticas",
  "C2.6 Input Rate Limiting & Abuse Prevention": "C2.6 Limitação de Taxa de Entrada e Prevenção de Abuso",
  "C2.7 Multi-Modal Input Validation": "C2.7 Validação de Entrada Multimodal",
  "C2.8 Real-Time Adaptive Threat Detection": "C2.8 Detecção Adaptativa de Ameaças em Tempo Real",

  // C3 — Model Lifecycle
  "C3.1 Model Authorization & Integrity": "C3.1 Autorização e Integridade do Modelo",
  "C3.2 Model Validation & Testing": "C3.2 Validação e Testes do Modelo",
  "C3.3 Controlled Deployment & Rollback": "C3.3 Implantação Controlada e Rollback",
  "C3.4 Secure Development Practices": "C3.4 Práticas de Desenvolvimento Seguro",
  "C3.5 Hosted and Provider-Managed Model Controls": "C3.5 Controles de Modelos Hospedados e Gerenciados por Provedores",
  "C3.7 Fine-Tuning Pipeline Authorization & Reward Model Integrity": "C3.7 Autorização de Pipeline de Fine-Tuning e Integridade do Modelo de Recompensa",

  // C4 — Infrastructure
  "C4.1 Runtime Environment Isolation": "C4.1 Isolamento do Ambiente de Execução",
  "C4.2 Secure Build & Deployment Pipelines": "C4.2 Pipelines Seguros de Build e Implantação",
  "C4.3 Network Security & Access Control": "C4.3 Segurança de Rede e Controle de Acesso",
  "C4.4 Secrets & Cryptographic Key Management": "C4.4 Gerenciamento de Segredos e Chaves Criptográficas",
  "C4.5 AI Workload Sandboxing & Validation": "C4.5 Sandboxing e Validação de Cargas de Trabalho de IA",
  "C4.6 AI Infrastructure Resource Management, Backup and Recovery": "C4.6 Gerenciamento de Recursos de Infraestrutura de IA, Backup e Recuperação",
  "C4.7 AI Hardware Security": "C4.7 Segurança de Hardware de IA",
  "C4.8 Edge & Distributed AI Security": "C4.8 Segurança de IA Distribuída e na Borda",

  // C5 — Access Control
  "C5.1 Identity Management & Authentication": "C5.1 Gerenciamento de Identidade e Autenticação",
  "C5.2 Authorization & Policy": "C5.2 Autorização e Política",
  "C5.3 Query-Time Security Enforcement": "C5.3 Aplicação de Segurança em Tempo de Consulta",
  "C5.4 Output Filtering & Data Loss Prevention": "C5.4 Filtragem de Saída e Prevenção de Perda de Dados",
  "C5.5 Multi-Tenant Isolation": "C5.5 Isolamento Multi-Tenant",
  "C5.6 Autonomous Agent Authorization": "C5.6 Autorização de Agentes Autônomos",

  // C6 — Supply Chain
  "C6.1 Pretrained Model Vetting & Origin Integrity": "C6.1 Verificação de Modelos Pré-treinados e Integridade de Origem",
  "C6.2 Framework & Library Scanning": "C6.2 Varredura de Frameworks e Bibliotecas",
  "C6.3 Dependency Pinning & Verification": "C6.3 Fixação e Verificação de Dependências",
  "C6.4 Trusted Source Enforcement": "C6.4 Aplicação de Fontes Confiáveis",
  "C6.5 Third-Party Dataset Risk Assessment": "C6.5 Avaliação de Risco de Datasets de Terceiros",
  "C6.6 Supply Chain Attack Monitoring": "C6.6 Monitoramento de Ataques à Cadeia de Fornecimento",
  "C6.7 AI BOM for Model Artifacts": "C6.7 BOM de IA para Artefatos de Modelo",

  // C7 — Model Behavior
  "C7.1 Output Format Enforcement": "C7.1 Aplicação de Formato de Saída",
  "C7.2 Hallucination Detection & Mitigation": "C7.2 Detecção e Mitigação de Alucinações",
  "C7.3 Output Safety & Privacy Filtering": "C7.3 Filtragem de Segurança e Privacidade da Saída",
  "C7.4 Output & Action Limiting": "C7.4 Limitação de Saída e Ações",
  "C7.5 Explainability & Transparency": "C7.5 Explicabilidade e Transparência",
  "C7.6 Monitoring Integration": "C7.6 Integração de Monitoramento",
  "C7.7 Generative Media Safeguards": "C7.7 Salvaguardas de Mídia Generativa",
  "C7.8 Source Attribution & Citation Integrity": "C7.8 Atribuição de Fonte e Integridade de Citação",

  // C8 — Memory & Vectors
  "C8.1 Access Controls on Memory & RAG Indices": "C8.1 Controles de Acesso em Memória e Índices RAG",
  "C8.2 Embedding Sanitization & Validation": "C8.2 Sanitização e Validação de Embeddings",
  "C8.3 Memory Expiry, Revocation & Deletion": "C8.3 Expiração, Revogação e Exclusão de Memória",
  "C8.4 Prevent Embedding Inversion & Leakage": "C8.4 Prevenção de Inversão e Vazamento de Embeddings",
  "C8.5 Scope Enforcement for User-Specific Memory": "C8.5 Aplicação de Escopo para Memória Específica do Usuário",

  // C9 — Agentic Actions
  "C9.1 Execution Budgets, Loop Control, and Circuit Breakers": "C9.1 Orçamentos de Execução, Controle de Loop e Circuit Breakers",
  "C9.2 High-Impact Action Approval and Irreversibility Controls": "C9.2 Aprovação de Ações de Alto Impacto e Controles de Irreversibilidade",
  "C9.3 Tool and Plugin Isolation and Safe Integration": "C9.3 Isolamento de Ferramentas e Plugins e Integração Segura",
  "C9.4 Agent and Orchestrator Identity, Signing, and Tamper-Evident Audit": "C9.4 Identidade de Agentes e Orquestradores, Assinatura e Auditoria à Prova de Adulteração",
  "C9.5 Secure Messaging and Protocol Hardening": "C9.5 Mensageria Segura e Fortalecimento de Protocolos",
  "C9.6 Authorization, Delegation, and Continuous Enforcement": "C9.6 Autorização, Delegação e Aplicação Contínua",
  "C9.7 Intent Verification and Constraint Gates": "C9.7 Verificação de Intenção e Portões de Restrição",
  "C9.8 Multi-Agent Domain Isolation and Swarm Risk Controls": "C9.8 Isolamento de Domínio Multi-Agente e Controles de Risco de Enxame",

  // C10 — MCP Security
  "C10.1 Component Integrity & Supply Chain Hygiene": "C10.1 Integridade de Componentes e Higiene da Cadeia de Fornecimento",
  "C10.2 Authentication & Authorization": "C10.2 Autenticação e Autorização",
  "C10.3 Secure Transport & Network Boundary Protection": "C10.3 Transporte Seguro e Proteção de Perímetro de Rede",
  "C10.4 Schema, Message, and Input Validation": "C10.4 Validação de Esquema, Mensagem e Entrada",
  "C10.5 Outbound Access & Agent Execution Safety": "C10.5 Acesso de Saída e Segurança de Execução de Agentes",
  "C10.6 Transport Restrictions & High-Risk Boundary Controls": "C10.6 Restrições de Transporte e Controles de Fronteira de Alto Risco",

  // C11 — Adversarial Robustness
  "C11.1 Model Alignment & Safety": "C11.1 Alinhamento e Segurança do Modelo",
  "C11.2 Adversarial-Example Hardening": "C11.2 Fortalecimento contra Exemplos Adversariais",
  "C11.3 Membership-Inference Mitigation": "C11.3 Mitigação de Inferência de Pertencimento",
  "C11.4 Model-Inversion Resistance": "C11.4 Resistência à Inversão de Modelo",
  "C11.5 Model-Extraction Defense": "C11.5 Defesa contra Extração de Modelo",
  "C11.6 Inference-Time Poisoned-Data Detection": "C11.6 Detecção de Dados Envenenados em Tempo de Inferência",
  "C11.7 Security Policy Adaptation": "C11.7 Adaptação de Política de Segurança",
  "C11.8 Agent Security Self-Assessment": "C11.8 Autoavaliação de Segurança de Agentes",
  "C11.9 Self-Modification & Autonomous Update Security": "C11.9 Segurança de Automodificação e Atualização Autônoma",
  "C11.10 Adversarial Bias Exploitation Defense": "C11.10 Defesa contra Exploração de Viés Adversarial",

  // C12 — Privacy
  "C12.1 Anonymization & Data Minimization": "C12.1 Anonimização e Minimização de Dados",
  "C12.2 Right-to-be-Forgotten & Deletion Enforcement": "C12.2 Direito ao Esquecimento e Aplicação de Exclusão",
  "C12.3 Differential-Privacy Safeguards": "C12.3 Salvaguardas de Privacidade Diferencial",
  "C12.4 Purpose-Limitation & Scope-Creep Protection": "C12.4 Limitação de Finalidade e Proteção contra Ampliação de Escopo",
  "C12.5 Consent Management & Lawful-Basis Tracking": "C12.5 Gerenciamento de Consentimento e Rastreamento de Base Legal",
  "C12.6 Federated Learning with Privacy Controls": "C12.6 Aprendizado Federado com Controles de Privacidade",

  // C13 — Monitoring
  "C13.1 Request & Response Logging": "C13.1 Registro de Requisições e Respostas",
  "C13.2 Abuse Detection and Alerting": "C13.2 Detecção de Abuso e Alertas",
  "C13.3 Model, Data, and Performance Drift Detection": "C13.3 Detecção de Drift de Modelo, Dados e Desempenho",
  "C13.4 Performance & Behavior Telemetry": "C13.4 Telemetria de Desempenho e Comportamento",
  "C13.5 AI Incident Response Planning & Execution": "C13.5 Planejamento e Execução de Resposta a Incidentes de IA",
  "C13.6 DAG Visualization & Workflow Security": "C13.6 Visualização DAG e Segurança de Workflow",
  "C13.7 Proactive Security Behavior Monitoring": "C13.7 Monitoramento Proativo de Comportamento de Segurança",

  // C14 — Human Oversight
  "C14.1 Kill-Switch & Override Mechanisms": "C14.1 Mecanismos de Kill-Switch e Substituição",
  "C14.2 Human-in-the-Loop Decision Checkpoints": "C14.2 Pontos de Verificação de Decisão com Humano no Loop",
  "C14.3 Chain of Responsibility & Auditability": "C14.3 Cadeia de Responsabilidade e Auditabilidade",
  "C14.4 Explainable-AI Techniques": "C14.4 Técnicas de IA Explicável",
  "C14.5 Model Cards & Usage Disclosures": "C14.5 Cartões de Modelo e Divulgações de Uso",
  "C14.6 Uncertainty Quantification": "C14.6 Quantificação de Incerteza",
  "C14.7 User-Facing Transparency Reports": "C14.7 Relatórios de Transparência para o Usuário",
};

/** Field-label translations for the Details page */
const fieldTranslations: Record<string, string> = {
  "Company Name": "Nome da Empresa",
  "Project name": "Nome do Projeto",
  "Description of Project": "Descrição do Projeto",
};

/**
 * Deep-clone the survey JSON and translate text fields for the given locale.
 * Currently only 'pt' is supported; returns the original for any other locale.
 */
export function translateSurvey(surveyJson: any, locale: string): any {
  if (locale !== 'pt') return surveyJson;

  const clone = JSON.parse(JSON.stringify(surveyJson));

  for (const page of clone.pages || []) {
    // Translate page name
    if (page.name && pageTranslations[page.name]) {
      page.title = pageTranslations[page.name];
    }

    for (const element of page.elements || []) {
      // Translate panel name/title
      if (element.type === 'panel') {
        if (element.name && panelTranslations[element.name]) {
          element.title = panelTranslations[element.name];
        }

        // Translate questions inside panels
        for (const q of element.elements || []) {
          translateChoices(q);
          translateField(q);
        }
      } else {
        // Top-level question (e.g. Details page fields)
        translateChoices(element);
        translateField(element);
      }
    }
  }

  return clone;
}

function translateChoices(question: any) {
  if (!question.choices) return;
  for (const choice of question.choices) {
    if (typeof choice === 'object' && choice.text && choiceTranslations[choice.text]) {
      choice.text = choiceTranslations[choice.text];
    } else if (typeof choice === 'string' && choiceTranslations[choice]) {
      // In-place replace for simple string choices
      const idx = question.choices.indexOf(choice);
      question.choices[idx] = choiceTranslations[choice];
    }
  }
}

function translateField(question: any) {
  if (question.title && fieldTranslations[question.title]) {
    question.title = fieldTranslations[question.title];
  }
  if (question.name && fieldTranslations[question.name]) {
    question.title = question.title || fieldTranslations[question.name];
  }
}
