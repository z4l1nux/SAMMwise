const c12_6 = () => ({ "type": "panel", "name": "C12.6 Federated Learning with Privacy Controls", "elements": [
  {
    "type": "radiogroup",
    "id": "db9394acc2d2ad27b928c7d28974fcd5",
    "name": "q_c12_12_6_1",
    "title": "[12.6.1] Verify that client updates employ local differential privacy noise addition before aggregation.",
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
    "id": "a7281e2845d58646110dd3f144412c74",
    "name": "q_c12_12_6_2",
    "title": "[12.6.2] Verify that training metrics are differentially private and never reveal single-client loss.",
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
    "id": "a8fb73e8809307676898eaab9509dcdf",
    "name": "q_c12_12_6_3",
    "title": "[12.6.3] Verify that poisoning-resistant aggregation (e.g., Krum/Trimmed-Mean) is enabled.",
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
    "id": "850e4b2c546a6b2bec3c3a318619c71e",
    "name": "q_c12_12_6_4",
    "title": "[12.6.4] Verify that formal proofs demonstrate overall ε budget with less than 5 utility loss.",
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
], "title": "C12.6 Federated Learning with Privacy Controls", "state": "expanded" });
export default c12_6;