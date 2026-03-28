const c05_5 = () => ({ "type": "panel", "name": "C5.5 Multi-Tenant Isolation", "elements": [
  {
    "type": "radiogroup",
    "id": "29e6896d10c77b8ebe05c7685d192411",
    "name": "q_c05_5_5_1",
    "title": "[5.5.1] Verify that network policies implement default-deny rules for cross-tenant communication.",
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
    "id": "22fde766e002a5f4c837aacce0ea95d2",
    "name": "q_c05_5_5_2",
    "title": "[5.5.2] Verify that every API request includes an authenticated tenant identifier that is cryptographically validated against session context and user entitlements.",
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
    "id": "0da34f8188054d65b5213cebd3e53a25",
    "name": "q_c05_5_5_3",
    "title": "[5.5.3] Verify that memory spaces, embedding stores, cache entries (e.g., result caches, embedding caches), and temporary files are namespace-segregated per tenant with secure purging on tenant deletion or session termination.",
    "description": "Level: 2 | Role: D/V",
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
    "id": "c5c837e6a137c43db60564497ebdaf6d",
    "name": "q_c05_5_5_4",
    "title": "[5.5.4] Verify that encryption keys are unique per tenant with customer-managed key (CMK) support and cryptographic isolation between tenant data stores.",
    "description": "Level: 3 | Role: D",
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
    "id": "35225342f9b7497140deaf28e648ad0f",
    "name": "q_c05_5_5_5",
    "title": "[5.5.5] Verify that inference-time KV-cache entries are partitioned by authenticated session or tenant identity and that automatic prefix caching does not share cached prefixes across distinct security principals, to prevent timing-based prompt reconstruction attacks.",
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
  }
], "title": "C5.5 Multi-Tenant Isolation", "state": "expanded" });
export default c05_5;