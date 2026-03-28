const c09_2 = () => ({ "type": "panel", "name": "C9.2 High-Impact Action Approval and Irreversibility Controls", "elements": [
  {
    "type": "radiogroup",
    "id": "87609536dd72ff36aa537c0d0ec93431",
    "name": "q_c09_9_2_1",
    "title": "[9.2.1] Verify that privileged or irreversible actions (e.g., code merges/deploys, financial transfers, user access changes, destructive deletes, external notifications) require explicit human-in-loop approval.",
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
    "id": "5f69ecc2bdb05f611d482389ae5a14a3",
    "name": "q_c09_9_2_2",
    "title": "[9.2.2] Verify that approval requests display canonicalized and complete action parameters (diff, command, recipient, amount, scope) without truncation or transformation.",
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
    "id": "345f8300112f3f40db6c908a901d3be6",
    "name": "q_c09_9_2_3",
    "title": "[9.2.3] Verify that approvals are cryptographically bound (e.g., signed or MACed) to the exact action parameters, requester identity, and execution context.",
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
    "id": "cf02d46c956ef4bdab70e2c37542d68b",
    "name": "q_c09_9_2_4",
    "title": "[9.2.4] Verify that approvals include a unique nonce and are single-use to prevent replay or substitution.",
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
    "id": "ec74f210f4425c012ddb826718732b79",
    "name": "q_c09_9_2_5",
    "title": "[9.2.5] Verify that approvals expire within a defined maximum time-to-live (TTL) and are rejected after expiration.",
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
    "id": "64502550dd5148fd2b8946da641a8b30",
    "name": "q_c09_9_2_6",
    "title": "[9.2.6] Verify that where rollback is feasible, compensating actions are defined and tested (transactional semantics), and failures trigger rollback or safe containment.",
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
], "title": "C9.2 High-Impact Action Approval and Irreversibility Controls", "state": "expanded" });
export default c09_2;