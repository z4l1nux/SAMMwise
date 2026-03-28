const c07_6 = () => ({ "type": "panel", "name": "C7.6 Monitoring Integration", "elements": [
  {
    "type": "radiogroup",
    "id": "a18fbadf9159da9b2831cefd606b7c4e",
    "name": "q_c07_7_6_1",
    "title": "[7.6.1] Verify that the system logs real-time metrics for safety violations (e.g., \"Hallucination Detected\", \"PII Blocked\").",
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
    "id": "092357cc4712a31e798b28b8b7d0b503",
    "name": "q_c07_7_6_2",
    "title": "[7.6.2] Verify that the system triggers an alert if safety violation rates exceed a defined threshold within a specific time window.",
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
    "id": "353a128826ee45015c22dde5e914f698",
    "name": "q_c07_7_6_3",
    "title": "[7.6.3] Verify that logs include the specific model version and other details necessary to investigate potential abuse.",
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
  }
], "title": "C7.6 Monitoring Integration", "state": "expanded" });
export default c07_6;