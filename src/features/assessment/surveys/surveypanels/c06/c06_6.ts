const c06_6 = () => ({ "type": "panel", "name": "C6.6 Supply Chain Attack Monitoring", "elements": [
  {
    "type": "radiogroup",
    "id": "0e47471cdf73cfb175589ec6b467d4f9",
    "name": "q_c06_6_6_1",
    "title": "[6.6.1] Verify that incident response playbooks include rollback procedures for compromised models or libraries.",
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
    "id": "2af33a04692f27b9c3d1cef008377ea5",
    "name": "q_c06_6_6_2",
    "title": "[6.6.2] Verify that CI/CD audit logs are streamed to centralized security monitoring with detections for anomalous package pulls or tampered build steps.",
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
    "id": "e9ca7b8f2fbda41ab80391fec4a2ae0f",
    "name": "q_c06_6_6_3",
    "title": "[6.6.3] Verify that threat-intelligence enrichment tags AI-specific indicators (e.g., model-poisoning indicators of compromise) in alert triage.",
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
  }
], "title": "C6.6 Supply Chain Attack Monitoring", "state": "expanded" });
export default c06_6;