const c13_6 = () => ({ "type": "panel", "name": "C13.6 DAG Visualization & Workflow Security", "elements": [
  {
    "type": "radiogroup",
    "id": "2e5c73911b58af5b298a66d1a9041453",
    "name": "q_c13_13_6_1",
    "title": "[13.6.1] Verify that DAG visualization data is sanitized to remove sensitive information before storage or transmission.",
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
    "id": "af38bd5993bdcc31d775cd058cc96567",
    "name": "q_c13_13_6_2",
    "title": "[13.6.2] Verify that workflow visualization access controls ensure only authorized users can view agent decision paths and reasoning traces.",
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
    "id": "c629441d1b6edd857e218d771d9767bd",
    "name": "q_c13_13_6_3",
    "title": "[13.6.3] Verify that DAG data integrity is protected through cryptographic signatures and tamper-evident storage mechanisms.",
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
    "id": "b0ca3d2f163c1eb00d367eae955a3f76",
    "name": "q_c13_13_6_4",
    "title": "[13.6.4] Verify that workflow visualization systems implement input validation to prevent injection attacks through crafted node or edge data.",
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
    "id": "d9d5c627e55670b0200c2a2b60eda1b3",
    "name": "q_c13_13_6_5",
    "title": "[13.6.5] Verify that real-time DAG updates are rate-limited and validated to prevent denial-of-service attacks on visualization systems.",
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
], "title": "C13.6 DAG Visualization & Workflow Security", "state": "expanded" });
export default c13_6;