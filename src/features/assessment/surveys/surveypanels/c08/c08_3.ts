const c08_3 = () => ({ "type": "panel", "name": "C8.3 Memory Expiry, Revocation & Deletion", "elements": [
  {
    "type": "radiogroup",
    "id": "3bd6b9dc49cd0bdec3aeb961c08e790a",
    "name": "q_c08_8_3_1",
    "title": "[8.3.1] Verify that retention times are applied to every stored vector and related metadata across memory storage.",
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
    "id": "5fc7bc3533b45d0aa82145d023255274",
    "name": "q_c08_8_3_2",
    "title": "[8.3.2] Verify that only information required for the system's defined function is persisted in memory (such as user preferences and conversation decisions, not credentials or full conversation transcripts), and that context not needed beyond the current session is discarded at session end.",
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
    "id": "f25db365b23efb1d9e76e603edf65cc0",
    "name": "q_c08_8_3_3",
    "title": "[8.3.3] Verify that deletion requests purge vectors, metadata, cache copies, and derivative indices within an organization-defined maximum time.",
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
    "id": "29bd1d2715f3270cf800e3d18c811023",
    "name": "q_c08_8_3_4",
    "title": "[8.3.4] Verify that deleted or expired vectors are removed reliably and are unrecoverable.",
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
    "id": "d156aaf56f3e0de1e76d55ffcfab8659",
    "name": "q_c08_8_3_5",
    "title": "[8.3.5] Verify that expired vectors are excluded from retrieval results within a measured and monitored propagation window.",
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
    "id": "accc3953f5ac9f558a3c6ffb3d1eda22",
    "name": "q_c08_8_3_6",
    "title": "[8.3.6] Verify that memory can be reset for security reasons (quarantine, selective purge, full reset) separately from retention deletion, and that quarantined content is kept for investigation but excluded from retrieval.",
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
  }
], "title": "C8.3 Memory Expiry, Revocation & Deletion", "state": "expanded" });
export default c08_3;