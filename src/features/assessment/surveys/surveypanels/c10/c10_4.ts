const c10_4 = () => ({ "type": "panel", "name": "C10.4 Schema, Message, and Input Validation", "elements": [
  {
    "type": "radiogroup",
    "id": "30dc3e3b0fa135cd8fb9742ff8273764",
    "name": "q_c10_10_4_1",
    "title": "[10.4.1] Verify that MCP tool responses are validated before being injected into the model context to prevent prompt injection, malicious tool output, or context manipulation.",
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
    "id": "975ecf1a8464c4c0c4dd52b35bf608a0",
    "name": "q_c10_10_4_2",
    "title": "[10.4.2] Verify that MCP tool and resource schemas (e.g., JSON schemas or capability descriptors) are validated for authenticity and integrity using signatures to prevent schema tampering or malicious parameter modification.",
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
    "id": "8954d4b39d20013763fe74c6fb0a6493",
    "name": "q_c10_10_4_3",
    "title": "[10.4.3] Verify that all MCP transports enforce message-framing integrity, strict schema validation, maximum payload sizes, and rejection of malformed, truncated, or interleaved frames to prevent desynchronization or injection attacks.",
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
    "id": "11ad433e6887b8788168ccc8847b32c2",
    "name": "q_c10_10_4_4",
    "title": "[10.4.4] Verify that MCP servers perform strict input validation for all function calls, including type checking, boundary validation, enumeration enforcement, and rejection of unrecognized or oversized parameters.",
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
    "id": "9c2809a5906bd576488e5babc29f8789",
    "name": "q_c10_10_4_5",
    "title": "[10.4.5] Verify that MCP clients maintain a hash or versioned snapshot of tool definitions and that any change to a tool definition (via `notifications/tools/list_changed` or between sessions) triggers re-approval before the modified tool can be invoked.",
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
    "id": "7d03b1be1dc201eea24301f6c4c5db9f",
    "name": "q_c10_10_4_6",
    "title": "[10.4.6] Verify that MCP server error and exception responses do not expose stack traces, internal file paths, tokens, or tool implementation details to the client or model context.",
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
    "id": "d3f42a990eea024648df5b18aea3bba6",
    "name": "q_c10_10_4_7",
    "title": "[10.4.7] Verify that MCP implementations reject JSON-RPC messages containing duplicate keys at any nesting level, preventing parser disagreement where different components resolve the same message to different values.",
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
    "id": "d4a551ef149fd483e1fc44c35d843b55",
    "name": "q_c10_10_4_8",
    "title": "[10.4.8] Verify that intermediaries evaluating message content either forward the canonicalized representation they evaluated or reject messages where multiple byte representations could produce different parsed structures.",
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
], "title": "C10.4 Schema, Message, and Input Validation", "state": "expanded" });
export default c10_4;