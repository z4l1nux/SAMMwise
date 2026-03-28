const c01_2 = () => ({ "type": "panel", "name": "C1.2 Training Data Security & Integrity", "elements": [
  {
    "type": "radiogroup",
    "id": "0cc5b1abbf54b035fd7f7d33b8d623f3",
    "name": "q_c01_1_2_1",
    "title": "[1.2.1] Verify that access controls protect training data storage and pipelines.",
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
    "id": "2efc8bcd76377df1ef00b17ca0d27abc",
    "name": "q_c01_1_2_2",
    "title": "[1.2.2] Verify that all access to training data is logged, including user, time, and action.",
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
    "id": "e2a8ccdccf2557e1ef84af531b370d76",
    "name": "q_c01_1_2_3",
    "title": "[1.2.3] Verify that training datasets are encrypted in transit and at rest, using current recommended cryptographic algorithms and key management practices.",
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
    "id": "9c28cabee01fb6aa6ad02bb5da107542",
    "name": "q_c01_1_2_4",
    "title": "[1.2.4] Verify that cryptographic hashes or digital signatures are used to ensure data integrity during training data storage and transfer.",
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
    "id": "5ec6817271930d62084aa9afaadd8171",
    "name": "q_c01_1_2_5",
    "title": "[1.2.5] Verify that automated integrity monitoring is applied to guard against unauthorized modifications or corruption of training data.",
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
    "id": "b1235af6885aa9b05dc2ba44b9e02d0e",
    "name": "q_c01_1_2_6",
    "title": "[1.2.6] Verify that obsolete training data is securely purged or anonymized.",
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
    "id": "0369d694d0898fb1a10efd634af05cf4",
    "name": "q_c01_1_2_7",
    "title": "[1.2.7] Verify that all training dataset versions are uniquely identified, stored immutably, and auditable to support rollback and forensic analysis.",
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
], "title": "C1.2 Training Data Security & Integrity", "state": "expanded" });
export default c01_2;