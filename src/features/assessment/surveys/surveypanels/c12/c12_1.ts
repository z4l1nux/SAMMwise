const c12_1 = () => ({ "type": "panel", "name": "C12.1 Anonymization & Data Minimization", "elements": [
  {
    "type": "radiogroup",
    "id": "519cea7221ea96afdaccacbf1a3413df",
    "name": "q_c12_12_1_1",
    "title": "[12.1.1] Verify that direct and quasi-identifiers are removed, hashed.",
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
    "id": "6fbe3d92fa6600427d488972fd407ed0",
    "name": "q_c12_12_1_2",
    "title": "[12.1.2] Verify that automated audits measure k-anonymity/l-diversity and alert when thresholds drop below policy.",
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
    "id": "e62f2afc974107fdd1af10864bc9a96c",
    "name": "q_c12_12_1_3",
    "title": "[12.1.3] Verify that model feature-importance reports prove no identifier leakage beyond ε = 0.01 mutual information.",
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
    "id": "c31d727ea948ae5aca7bcbab0f10a278",
    "name": "q_c12_12_1_4",
    "title": "[12.1.4] Verify that formal proofs or synthetic-data certification show re-identification risk ≤ 0.05 even under linkage attacks.",
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
], "title": "C12.1 Anonymization & Data Minimization", "state": "expanded" });
export default c12_1;