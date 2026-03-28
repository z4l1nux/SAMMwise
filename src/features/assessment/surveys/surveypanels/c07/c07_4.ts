const c07_4 = () => ({ "type": "panel", "name": "C7.4 Output & Action Limiting", "elements": [
  {
    "type": "radiogroup",
    "id": "84d4b5f66fc6c47562ee1c72cbc96db1",
    "name": "q_c07_7_4_1",
    "title": "[7.4.1] Verify that the system enforces hard limits on requests and tokens per user to prevent cost spikes and denial of service.",
    "description": "Level: 1 | Role: D",
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
    "id": "9cb48ef70038a11ec34c3df7bdeed7dd",
    "name": "q_c07_7_4_2",
    "title": "[7.4.2] Verify that the model cannot execute high-impact actions (like writing files, sending emails, or executing code) without explicit user confirmation.",
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
    "id": "d6ece4ae28192d822c169a657db986f4",
    "name": "q_c07_7_4_3",
    "title": "[7.4.3] Verify that the application or orchestration framework explicitly configures and enforces the maximum depth of recursive calls, delegation limits, and the list of allowed external tools.",
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
], "title": "C7.4 Output & Action Limiting", "state": "expanded" });
export default c07_4;