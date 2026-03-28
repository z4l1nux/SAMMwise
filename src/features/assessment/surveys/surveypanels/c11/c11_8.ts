const c11_8 = () => ({ "type": "panel", "name": "C11.8 Agent Security Self-Assessment", "elements": [
  {
    "type": "radiogroup",
    "id": "d516fa7f1f27304798a199bc3c681d4a",
    "name": "q_c11_11_8_1",
    "title": "[11.8.1] Verify that agentic systems include a mechanism to review planned high-risk actions against security policy before execution (e.g., a secondary model, rule-based checker, or structured self-review step).",
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
    "id": "27a9c977d6dc24f1dd5febaf123d5f94",
    "name": "q_c11_11_8_2",
    "title": "[11.8.2] Verify that security review mechanisms are protected against manipulation by adversarial inputs (e.g., the review step cannot be overridden or bypassed through prompt injection).",
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
    "id": "de1dde1a518712e4e88ce3b652874f98",
    "name": "q_c11_11_8_3",
    "title": "[11.8.3] Verify that security review warnings trigger enhanced monitoring or human intervention workflows for the affected session or task.",
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
], "title": "C11.8 Agent Security Self-Assessment", "state": "expanded" });
export default c11_8;