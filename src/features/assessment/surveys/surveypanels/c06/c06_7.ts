const c06_7 = () => ({ "type": "panel", "name": "C6.7 AI BOM for Model Artifacts", "elements": [
  {
    "type": "radiogroup",
    "id": "bb1ff37eb47cc83a98fcb949da819bca",
    "name": "q_c06_6_7_1",
    "title": "[6.7.1] Verify that every model artifact publishes an AI BOM that lists datasets, weights, hyperparameters, and licenses.",
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
    "id": "192405bb5ccfb941d3e3756770fb193b",
    "name": "q_c06_6_7_2",
    "title": "[6.7.2] Verify that AI BOM generation and cryptographic signing are automated in CI and required for merge.",
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
    "id": "f25fe0237bdf67647790cf8fa0f51954",
    "name": "q_c06_6_7_3",
    "title": "[6.7.3] Verify that AI BOM completeness checks fail the build if any component metadata (hash and license) is missing.",
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
    "id": "fd47c8f39a31bad6b66ab73900966fb2",
    "name": "q_c06_6_7_4",
    "title": "[6.7.4] Verify that downstream consumers can query AI BOMs via API to validate imported models at deploy time.",
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
    "id": "72d4c839a391e1c57ae6f666c881085f",
    "name": "q_c06_6_7_5",
    "title": "[6.7.5] Verify that AI BOMs are version-controlled and diffed to detect unauthorized modifications.",
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
], "title": "C6.7 AI BOM for Model Artifacts", "state": "expanded" });
export default c06_7;