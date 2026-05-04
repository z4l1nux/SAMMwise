# Mission

SAMMwise é uma ferramenta web open-source que conduz organizações através do **OWASP SAMM (Software Assurance Maturity Model)** — permitindo medir, visualizar e comparar a maturidade do programa de segurança de software de forma autocontida e privada.

## What We Do

- Conduzimos a avaliação SAMM através de questionário interativo cobrindo as 5 funções de negócio (Governance, Design, Implementation, Verification, Operations) e suas 15 práticas.
- Calculamos a pontuação de maturidade por prática, função e geral, com banda interpretativa (Initial / Managed / Defined / Optimized).
- Geramos visualizações dinâmicas (radar, barras, donut) e exportação em PDF.
- Permitimos comparar a avaliação atual com uma anterior para medir progresso.
- Oferecemos análise opcional via LLM (Anthropic, OpenAI, Gemini, Ollama) com chaves criptografadas localmente — sem servidor.

## Target Audience

- **AppSec leads** que precisam medir e demonstrar evolução do programa de segurança.
- **Arquitetos de software** que querem mapear gaps em práticas SDLC.
- **Times de desenvolvimento** conduzindo auto-avaliação como parte de processos de governança.
- **Consultores OWASP** que aplicam SAMM em diferentes clientes e precisam de uma ferramenta neutra e portável.

## What Success Looks Like

- Avaliação SAMM completa em uma sessão sem perda de progresso (sessionStorage + JSON export).
- Resultados interpretáveis sem treinamento prévio (legendas, bandas, comparação visual).
- Zero dependência de serviços externos no caminho crítico — dados nunca saem do dispositivo do usuário.
- Análise LLM opcional, com chaves do usuário, criptografadas via AES-GCM no localStorage.
- Suporte i18n nativo (EN/PT-BR) cobrindo UI e perguntas do questionário.
