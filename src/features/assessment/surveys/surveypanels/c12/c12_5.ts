const c12_5 = () => ({ "type": "panel", "name": "C12.5 Consent Management & Lawful-Basis Tracking", "elements": [
  {
    "type": "radiogroup",
    "id": "8d4f8a4ac7b25e0e05c796973e45d4af",
    "name": "q_c12_12_5_1",
    "title": "[12.5.1] Verify that a Consent-Management Platform (CMP) records opt-in status, purpose, and retention period per data-subject.",
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
    "id": "e48d36f6fbb451a0df6f567a6dfc95d6",
    "name": "q_c12_12_5_2",
    "title": "[12.5.2] Verify that APIs expose consent tokens; models must validate token scope before inference.",
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
    "id": "93cb57fbc330bb71fb0978dce3324199",
    "name": "q_c12_12_5_3",
    "title": "[12.5.3] Verify that denied or withdrawn consent halts processing pipelines within 24 hours.",
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
  }
], "title": "C12.5 Consent Management & Lawful-Basis Tracking", "state": "expanded" });
export default c12_5;