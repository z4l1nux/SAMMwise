const c09_5 = () => ({ "type": "panel", "name": "C9.5 Secure Messaging and Protocol Hardening", "elements": [
  {
    "type": "radiogroup",
    "id": "bb874b948cc94a1a188be0d9cbf5225d",
    "name": "q_c09_9_5_1",
    "title": "[9.5.1] Verify that agent-to-agent and agent-to-tool channels enforce mutual authentication and encryption using current recommended protocols (e.g., TLS 1.3 or later) with strong certificate/token validation.",
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
    "id": "923f41af188f6071def2f3b87c411367",
    "name": "q_c09_9_5_2",
    "title": "[9.5.2] Verify that all messages are strictly schema-validated; unknown fields, malformed payloads, and oversized frames are rejected.",
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
    "id": "b7d3620553d7a7a372bf7bdcd2158dcf",
    "name": "q_c09_9_5_3",
    "title": "[9.5.3] Verify that message integrity covers the full payload including tool parameters, and that replay protections (nonces/sequence numbers/timestamp windows) are enforced.",
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
    "id": "54fef7411f1795145fb3fb06e95e42ad",
    "name": "q_c09_9_5_4",
    "title": "[9.5.4] Verify that agent outputs propagated to downstream agents are validated against semantic constraints (e.g., value ranges, logical consistency) in addition to schema validation.",
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
], "title": "C9.5 Secure Messaging and Protocol Hardening", "state": "expanded" });
export default c09_5;