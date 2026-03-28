const c02_4 = () => ({ "type": "panel", "name": "C2.4 Schema, Type & Length Validation", "elements": [
  {
    "type": "radiogroup",
    "id": "d6aa37c3d7aaa4e358259629b2fdef99",
    "name": "q_c02_2_4_1",
    "title": "[2.4.1] Verify that every API, tool or MCP endpoint defines an explicit input schema (e.g., JSON Schema, Protocol Buffers, or multimodal equivalent), rejects extra or unknown fields and implicit type coercion, and validates inputs server-side before prompt assembly or tool execution.",
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
    "id": "148ea52a88d05191eeb20332868c0b9b",
    "name": "q_c02_2_4_2",
    "title": "[2.4.2] Verify that inputs exceeding maximum token or byte limits are rejected with a safe error and never silently truncated.",
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
    "id": "4f5eebabc1a5c36ea20d2c0465c9f852",
    "name": "q_c02_2_4_3",
    "title": "[2.4.3] Verify that type checks (e.g., numeric ranges, enumerated values, and MIME types for images or audio) are enforced for all server-side inputs, including tool or MCP arguments.",
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
    "id": "20b171d8710847d663c556397823e230",
    "name": "q_c02_2_4_4",
    "title": "[2.4.4] Verify that semantic validators run in constant time and avoid external network calls to prevent algorithmic DoS.",
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
    "id": "caae0cbf8d6cf1f4b84e2edc682eb0e4",
    "name": "q_c02_2_4_5",
    "title": "[2.4.5] Verify that validation failures are logged with redacted payload snippets and unambiguous error codes and include trace metadata (source, tool or MCP server, agent ID, session) to aid security triage.",
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
], "title": "C2.4 Schema, Type & Length Validation", "state": "expanded" });
export default c02_4;