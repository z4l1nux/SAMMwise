const c11_1 = () => ({ "type": "panel", "name": "C11.1 Model Alignment & Safety", "elements": [
  {
    "type": "radiogroup",
    "id": "a435847bd9caf6830b9c4f99e0aa0e98",
    "name": "q_c11_11_1_1",
    "title": "[11.1.1] Verify that refusal and safe-completion guardrails are enforced to prevent the model from generating disallowed content categories.",
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
    "id": "817d9f1cb27f67fa60a97ab02ceaadd5",
    "name": "q_c11_11_1_2",
    "title": "[11.1.2] Verify that an alignment test suite (red-team prompts, jailbreak probes, disallowed-content checks) is version-controlled and run on every model update or release.",
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
    "id": "29960d205ea6269e383f2484e98ce4ea",
    "name": "q_c11_11_1_3",
    "title": "[11.1.3] Verify that an automated evaluator measures harmful-content rate and flags regressions beyond a defined threshold.",
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
    "id": "ad743edb0ae1d50ef48b358c0b9a1bfc",
    "name": "q_c11_11_1_4",
    "title": "[11.1.4] Verify that alignment and safety training procedures (e.g., RLHF, constitutional AI, or equivalent) are documented and reproducible.",
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
    "id": "556f66837925efbf7606ea90b205cb1c",
    "name": "q_c11_11_1_5",
    "title": "[11.1.5] Verify that alignment evaluation includes assessments for evaluation awareness, where the model may behave differently when it detects it is being tested versus deployed.",
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
], "title": "C11.1 Model Alignment & Safety", "state": "expanded" });
export default c11_1;