const c09_7 = () => ({ "type": "panel", "name": "C9.7 Intent Verification and Constraint Gates", "elements": [
  {
    "type": "radiogroup",
    "id": "1b323eb89c59af183baa9ca79c559254",
    "name": "q_c09_9_7_1",
    "title": "[9.7.1] Verify that pre-execution gates evaluate proposed actions and parameters against hard policy constraints (deny rules, data handling constraints, allow-lists, side-effect budgets) and block execution on any violation.",
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
    "id": "a73d57b351d576d55674f8c9c6488788",
    "name": "q_c09_9_7_2",
    "title": "[9.7.2] Verify that post-execution checks confirm the intended outcome was achieved.",
    "description": "Level: 2 | Role: V",
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
    "id": "5c8ac32f4b7d8506703b1514d560a92f",
    "name": "q_c09_9_7_3",
    "title": "[9.7.3] Verify that post-execution checks detect unintended side effects.",
    "description": "Level: 2 | Role: V",
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
    "id": "fe0d8ddb85cf12744c284715d247b8ad",
    "name": "q_c09_9_7_4",
    "title": "[9.7.4] Verify that any mismatch between intended outcome and actual results triggers containment and, where supported, compensating actions.",
    "description": "Level: 2 | Role: V",
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
    "id": "928b8382d18740bf3b1465295454b3de",
    "name": "q_c09_9_7_5",
    "title": "[9.7.5] Verify that prompt templates and agent policy configurations retrieved from a remote source are integrity-verified at load time against their approved versions (e.g., via hashes or signatures).",
    "description": "Level: 3 | Role: D/V",
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
], "title": "C9.7 Intent Verification and Constraint Gates", "state": "expanded" });
export default c09_7;