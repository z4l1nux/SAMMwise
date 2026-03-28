const c12_3 = () => ({ "type": "panel", "name": "C12.3 Differential-Privacy Safeguards", "elements": [
  {
    "type": "radiogroup",
    "id": "676ef107ce299fdb77e0f2902d1c10a5",
    "name": "q_c12_12_3_1",
    "title": "[12.3.1] Verify that differential privacy budget consumption is tracked per training round (both ε and δ values) and that cumulative budget dashboards alert when ε exceeds policy thresholds.",
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
    "id": "b3412ac494e5c0617bcbc558c027b693",
    "name": "q_c12_12_3_2",
    "title": "[12.3.2] Verify that black-box privacy audits estimate ε̂ within 10% of declared value.",
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
    "id": "9b7243e30044f1470777607b5ddd9336",
    "name": "q_c12_12_3_3",
    "title": "[12.3.3] Verify that formal proofs cover all post-training fine-tunes and embeddings.",
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
    "id": "e0124f380dea439e500a7725e3b3e87f",
    "name": "q_c12_12_3_4",
    "title": "[12.3.4] Verify that federated learning systems implement canary-based privacy auditing to empirically bound privacy leakage, with audit results logged and reviewed per training cycle.",
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
], "title": "C12.3 Differential-Privacy Safeguards", "state": "expanded" });
export default c12_3;