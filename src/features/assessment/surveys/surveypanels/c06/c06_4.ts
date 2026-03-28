const c06_4 = () => ({ "type": "panel", "name": "C6.4 Trusted Source Enforcement", "elements": [
  {
    "type": "radiogroup",
    "id": "2d24b57265f444c4f4c55d1ee848f26e",
    "name": "q_c06_6_4_1",
    "title": "[6.4.1] Verify that model weights, datasets, and containers are downloaded only from approved sources or internal registries.",
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
    "id": "2f263445018ca860517189d5139f858d",
    "name": "q_c06_6_4_2",
    "title": "[6.4.2] Verify that cryptographic signatures validate publisher identity before artifacts are cached locally.",
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
    "id": "8a799805ca214f14e8b64dcdd536ea63",
    "name": "q_c06_6_4_3",
    "title": "[6.4.3] Verify that egress controls block unauthenticated artifact downloads to enforce trusted-source policy.",
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
    "id": "284d1d25aed021e1afb40310997bc43c",
    "name": "q_c06_6_4_4",
    "title": "[6.4.4] Verify that repository allow-lists are reviewed periodically with evidence of business justification for each entry.",
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
    "id": "162c56a2b56ac197fd8f43aa4d8e8151",
    "name": "q_c06_6_4_5",
    "title": "[6.4.5] Verify that policy violations trigger quarantining of artifacts and rollback of dependent pipeline runs.",
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
], "title": "C6.4 Trusted Source Enforcement", "state": "expanded" });
export default c06_4;