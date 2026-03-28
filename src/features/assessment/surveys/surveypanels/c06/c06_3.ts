const c06_3 = () => ({ "type": "panel", "name": "C6.3 Dependency Pinning & Verification", "elements": [
  {
    "type": "radiogroup",
    "id": "31d1d85b707d8c644c0962177a627a79",
    "name": "q_c06_6_3_1",
    "title": "[6.3.1] Verify that all package managers enforce version pinning via lockfiles.",
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
    "id": "bab2922bd3d02e8b69e0cd8fc0e2ca01",
    "name": "q_c06_6_3_2",
    "title": "[6.3.2] Verify that immutable digests are used instead of mutable tags in container references.",
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
    "id": "9a94ed7796df703838cd3b60d377fbd3",
    "name": "q_c06_6_3_3",
    "title": "[6.3.3] Verify that expired or unmaintained dependencies trigger automated notifications to update or replace pinned versions.",
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
    "id": "94411cf872f6e31b08a503772f89ffb1",
    "name": "q_c06_6_3_4",
    "title": "[6.3.4] Verify that build attestations are retained for a period defined by organizational policy for audit traceability.",
    "description": "Level: 3 | Role: V",
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
    "id": "d42b2e1b732f54e5f75f55d939ed3fb1",
    "name": "q_c06_6_3_5",
    "title": "[6.3.5] Verify that reproducible-build checks compare hashes across CI runs to ensure identical outputs.",
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
  }
], "title": "C6.3 Dependency Pinning & Verification", "state": "expanded" });
export default c06_3;