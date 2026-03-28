const c05_6 = () => ({ "type": "panel", "name": "C5.6 Autonomous Agent Authorization", "elements": [
  {
    "type": "radiogroup",
    "id": "a3bf1e61a882976073b005ac96f4659c",
    "name": "q_c05_5_6_1",
    "title": "[5.6.1] Verify that autonomous agents receive scoped capability tokens that explicitly enumerate permitted actions, accessible resources, time boundaries, and operational constraints.",
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
    "id": "04521746c0888db2353db91a82e62d04",
    "name": "q_c05_5_6_2",
    "title": "[5.6.2] Verify that high-risk capabilities (file system access, code execution, external API calls, financial transactions) are disabled by default and require explicit authorization.",
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
    "id": "89dfbd1b807eb45cc2d0395a65c6ee6d",
    "name": "q_c05_5_6_3",
    "title": "[5.6.3] Verify that capability tokens are bound to user sessions, include cryptographic integrity protection, and cannot be persisted or reused across sessions.",
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
    "id": "dc601ac538830d24373c0ee212efe3c8",
    "name": "q_c05_5_6_4",
    "title": "[5.6.4] Verify that agent-initiated actions undergo authorization through a policy decision point that evaluates contextual attributes (e.g., user identity, resource sensitivity, action type, environmental context).",
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
], "title": "C5.6 Autonomous Agent Authorization", "state": "expanded" });
export default c05_6;