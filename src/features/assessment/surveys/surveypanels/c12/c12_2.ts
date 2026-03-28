const c12_2 = () => ({ "type": "panel", "name": "C12.2 Right-to-be-Forgotten & Deletion Enforcement", "elements": [
  {
    "type": "radiogroup",
    "id": "2b8957d34ef044c1bece5d0570531bbb",
    "name": "q_c12_12_2_1",
    "title": "[12.2.1] Verify that data-subject deletion requests propagate to raw datasets, checkpoints, embeddings, logs, and backups within service level agreements of less than 30 days.",
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
    "id": "8258ab6ac8dad8f4246950c295f72e1e",
    "name": "q_c12_12_2_2",
    "title": "[12.2.2] Verify that \"machine-unlearning\" routines physically re-train or approximate removal using certified unlearning algorithms.",
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
    "id": "f87bc202dcf7d071a690d0ccf1f032f7",
    "name": "q_c12_12_2_3",
    "title": "[12.2.3] Verify that shadow-model evaluation proves forgotten records influence less than 1% of outputs after unlearning.",
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
    "id": "151fd26a30aa14a613500c58c38d010e",
    "name": "q_c12_12_2_4",
    "title": "[12.2.4] Verify that deletion events are immutably logged and auditable for regulators.",
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
], "title": "C12.2 Right-to-be-Forgotten & Deletion Enforcement", "state": "expanded" });
export default c12_2;