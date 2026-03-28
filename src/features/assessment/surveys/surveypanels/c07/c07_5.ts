const c07_5 = () => ({ "type": "panel", "name": "C7.5 Explainability & Transparency", "elements": [
  {
    "type": "radiogroup",
    "id": "9bc4b89be308c72e63b5b0262b09127a",
    "name": "q_c07_7_5_1",
    "title": "[7.5.1] Verify that explanations provided to the user are sanitized to remove system prompts or backend data.",
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
    "id": "1795e0493fef61d05fa19d8227301965",
    "name": "q_c07_7_5_2",
    "title": "[7.5.2] Verify that the UI displays a confidence score or \"reasoning summary\" to the user for critical decisions.",
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
    "id": "75da0a93ab7e6578997187ea9e0f25e2",
    "name": "q_c07_7_5_3",
    "title": "[7.5.3] Verify that technical evidence of the model's decision, such as model interpretability artifacts (e.g., attention maps, feature attributions), are logged.",
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
], "title": "C7.5 Explainability & Transparency", "state": "expanded" });
export default c07_5;