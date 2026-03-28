const c06_5 = () => ({ "type": "panel", "name": "C6.5 Third-Party Dataset Risk Assessment", "elements": [
  {
    "type": "radiogroup",
    "id": "0ef045f8acacd576c917172d54c86de4",
    "name": "q_c06_6_5_1",
    "title": "[6.5.1] Verify that external datasets undergo poisoning risk assessment (e.g., data fingerprinting, outlier detection).",
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
    "id": "9ade51075868d0031ef1b5ee0fd73ab9",
    "name": "q_c06_6_5_2",
    "title": "[6.5.2] Verify that disallowed content (e.g., copyrighted material, PII) is detected and removed via automated scrubbing prior to training.",
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
    "id": "81fd4aa7dceb6d843abed97aaa23a95f",
    "name": "q_c06_6_5_3",
    "title": "[6.5.3] Verify that origin, lineage, and license terms for datasets are captured in AI BOM entries.",
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
    "id": "4f0be3c023a42b2ef37e2612d2e69300",
    "name": "q_c06_6_5_4",
    "title": "[6.5.4] Verify that bias metrics (e.g., demographic parity, equal opportunity) are calculated before dataset approval.",
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
    "id": "c3f87e1df941b9447df48f1d7e5ba64e",
    "name": "q_c06_6_5_5",
    "title": "[6.5.5] Verify that periodic monitoring detects drift or corruption in hosted datasets.",
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
], "title": "C6.5 Third-Party Dataset Risk Assessment", "state": "expanded" });
export default c06_5;