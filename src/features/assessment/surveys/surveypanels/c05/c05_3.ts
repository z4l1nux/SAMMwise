const c05_3 = () => ({ "type": "panel", "name": "C5.3 Query-Time Security Enforcement", "elements": [
  {
    "type": "radiogroup",
    "id": "04887a80adb68417577ec7e23a6c7fb5",
    "name": "q_c05_5_3_1",
    "title": "[5.3.1] Verify that all data store queries (e.g., vector databases, SQL databases, search indices) include mandatory security filters (tenant ID, sensitivity labels, user scope) enforced at the data access layer.",
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
    "id": "c0be989f307f1508018b13eace32a1ca",
    "name": "q_c05_5_3_2",
    "title": "[5.3.2] Verify that failed authorization evaluations immediately abort queries and return explicit authorization error codes.",
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
    "id": "e1300b04cdaa4edbb78249497d5ca827",
    "name": "q_c05_5_3_3",
    "title": "[5.3.3] Verify that row-level security policies and field-level masking are enabled with policy inheritance for all data stores containing sensitive data used by AI systems.",
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
    "id": "bbcf0876505dc27a720d960637afc669",
    "name": "q_c05_5_3_4",
    "title": "[5.3.4] Verify that query retry mechanisms re-evaluate authorization policies to account for dynamic permission changes within active sessions.",
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
], "title": "C5.3 Query-Time Security Enforcement", "state": "expanded" });
export default c05_3;