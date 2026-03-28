const c05_4 = () => ({ "type": "panel", "name": "C5.4 Output Filtering & Data Loss Prevention", "elements": [
  {
    "type": "radiogroup",
    "id": "89b82f758e7f6f71c87a718625b4e1a1",
    "name": "q_c05_5_4_1",
    "title": "[5.4.1] Verify that post-inference filtering mechanisms prevent responses from including classified information or proprietary data that the requestor is not authorized to receive.",
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
    "id": "300efa16c362574766b665197fbce709",
    "name": "q_c05_5_4_2",
    "title": "[5.4.2] Verify that citations, references, and source attributions in model outputs are validated against caller entitlements and removed if unauthorized access is detected.",
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
    "id": "f03d5f43259525dbf1b36b007793b62c",
    "name": "q_c05_5_4_3",
    "title": "[5.4.3] Verify that output format restrictions (sanitized documents, metadata-stripped images, approved file types) are enforced based on user permission levels and data classifications.",
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
], "title": "C5.4 Output Filtering & Data Loss Prevention", "state": "expanded" });
export default c05_4;