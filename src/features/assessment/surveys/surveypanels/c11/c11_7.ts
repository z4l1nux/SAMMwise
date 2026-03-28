const c11_7 = () => ({ "type": "panel", "name": "C11.7 Security Policy Adaptation", "elements": [
  {
    "type": "radiogroup",
    "id": "7f5a1e59f7adc85b221c37d7d7ed7c90",
    "name": "q_c11_11_7_1",
    "title": "[11.7.1] Verify that security policies (e.g., content filters, rate-limit thresholds, guardrail configurations) can be updated without full system redeployment, and that policy versions are tracked.",
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
    "id": "fbb06db1cd00dca0d19174ced2e3f2ad",
    "name": "q_c11_11_7_2",
    "title": "[11.7.2] Verify that policy updates are authorized, integrity-protected (e.g., cryptographically signed), and validated before application.",
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
    "id": "90df917a49bd0c0ec9f3176bbcc052a4",
    "name": "q_c11_11_7_3",
    "title": "[11.7.3] Verify that policy changes are logged with audit trails including timestamp, author, justification, and rollback procedures.",
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
    "id": "94f020c08f8b47067bef115d7f556603",
    "name": "q_c11_11_7_4",
    "title": "[11.7.4] Verify that threat-detection sensitivity can be adjusted based on risk context (e.g., elevated threat level, incident response) with appropriate authorization.",
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
], "title": "C11.7 Security Policy Adaptation", "state": "expanded" });
export default c11_7;