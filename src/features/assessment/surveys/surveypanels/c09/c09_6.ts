const c09_6 = () => ({ "type": "panel", "name": "C9.6 Authorization, Delegation, and Continuous Enforcement", "elements": [
  {
    "type": "radiogroup",
    "id": "05b46420d161b8b981f74445c4bf48d9",
    "name": "q_c09_9_6_1",
    "title": "[9.6.1] Verify that agent actions are authorized against fine-grained policies enforced by the runtime that restrict which tools an agent may invoke, which parameter values it may supply (e.g., allowed resources, data scopes, action types), and that policy violations are blocked.",
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
    "id": "99b1084132ed3721687214909459f7e8",
    "name": "q_c09_9_6_2",
    "title": "[9.6.2] Verify that when an agent acts on a user's behalf, the runtime propagates an integrity-protected delegation context (user ID, tenant, session, scopes) and enforces that context at every downstream call without using the user's credentials.",
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
    "id": "a91487aeb007dc6c553b116e8737300e",
    "name": "q_c09_9_6_3",
    "title": "[9.6.3] Verify that authorization is re-evaluated on every call (continuous authorization) using current context (user, tenant, environment, data classification, time, risk).",
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
    "id": "1e4e24959efd9bdf213f57bb3bd54193",
    "name": "q_c09_9_6_4",
    "title": "[9.6.4] Verify that all access control decisions are enforced by application logic or a policy engine, never by the AI model itself, and that model-generated output (e.g., \"the user is allowed to do this\") cannot override or bypass access control checks.",
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
], "title": "C9.6 Authorization, Delegation, and Continuous Enforcement", "state": "expanded" });
export default c09_6;