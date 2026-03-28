const c02_1 = () => ({ "type": "panel", "name": "C2.1 Prompt Injection Defense", "elements": [
  {
    "type": "radiogroup",
    "id": "c6e25f975b9c79008582407c8d47cd6c",
    "name": "q_c02_2_1_1",
    "title": "[2.1.1] Verify that all external or derived inputs that may steer model behavior are treated as untrusted and screened by a prompt injection detection ruleset or classifier before being included in prompts or used to trigger actions.",
    "description": "Level: 1 | Role: D/V",
    "choices": [
      {
        "value": 0,
        "weight": 1,
        "text": "No"
      },
      {
        "value": 0.25,
        "weight": 1,
        "text": "Yes, for some"
      },
      {
        "value": 0.5,
        "weight": 1,
        "text": "Yes, for most"
      },
      {
        "value": 1,
        "weight": 1,
        "text": "Yes, for all"
      }
    ]
  },
  {
    "type": "radiogroup",
    "id": "810eaa73ae34dcf0feb5ada14bbdf399",
    "name": "q_c02_2_1_2",
    "title": "[2.1.2] Verify that the system enforces an instruction hierarchy in which system and developer messages override user instructions and other untrusted inputs, even after processing user instructions.",
    "description": "Level: 1 | Role: D/V",
    "choices": [
      {
        "value": 0,
        "weight": 1,
        "text": "No"
      },
      {
        "value": 0.25,
        "weight": 1,
        "text": "Yes, for some"
      },
      {
        "value": 0.5,
        "weight": 1,
        "text": "Yes, for most"
      },
      {
        "value": 1,
        "weight": 1,
        "text": "Yes, for all"
      }
    ]
  },
  {
    "type": "radiogroup",
    "id": "e90a79119d06a528e2e068eb67dc48e1",
    "name": "q_c02_2_1_3",
    "title": "[2.1.3] Verify that prompts originating from third-party content (web pages, PDFs, emails) are sanitized in isolation (for example, stripping instruction-like directives and neutralizing HTML, Markdown, and script content) before being concatenated into the main prompt.",
    "description": "Level: 2 | Role: D",
    "choices": [
      {
        "value": 0,
        "weight": 1,
        "text": "No"
      },
      {
        "value": 0.25,
        "weight": 1,
        "text": "Yes, for some"
      },
      {
        "value": 0.5,
        "weight": 1,
        "text": "Yes, for most"
      },
      {
        "value": 1,
        "weight": 1,
        "text": "Yes, for all"
      }
    ]
  },
  {
    "type": "radiogroup",
    "id": "41b9dd2398b947b6810c1b99f6edb4a2",
    "name": "q_c02_2_1_4",
    "title": "[2.1.4] Verify that input length controls account for context window limits and that the system prevents user-supplied content from exceeding a proportion of the total context window that would displace system instructions or safety directives from the model's effective attention.",
    "description": "Level: 1 | Role: D/V",
    "choices": [
      {
        "value": 0,
        "weight": 1,
        "text": "No"
      },
      {
        "value": 0.25,
        "weight": 1,
        "text": "Yes, for some"
      },
      {
        "value": 0.5,
        "weight": 1,
        "text": "Yes, for most"
      },
      {
        "value": 1,
        "weight": 1,
        "text": "Yes, for all"
      }
    ]
  }
], "title": "C2.1 Prompt Injection Defense", "state": "expanded" });
export default c02_1;