const c10_3 = () => ({ "type": "panel", "name": "C10.3 Secure Transport & Network Boundary Protection", "elements": [
  {
    "type": "radiogroup",
    "id": "0ad3baa09d23790bb26c908d07cf0b0b",
    "name": "q_c10_10_3_1",
    "title": "[10.3.1] Verify that authenticated, encrypted streamable-HTTP is used as the primary MCP transport in production environments and that alternate transports (e.g., stdio or SSE) are restricted to local or tightly controlled environments with explicit justification.",
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
    "id": "ae3ded16d24c3a2dde4d6ee010f4d223",
    "name": "q_c10_10_3_2",
    "title": "[10.3.2] Verify that streamable-HTTP MCP transports use authenticated, encrypted channels (TLS 1.3 or later) with certificate validation.",
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
    "id": "d6d8f2b177f289793cbc9246b8ac335f",
    "name": "q_c10_10_3_3",
    "title": "[10.3.3] Verify that SSE-based MCP transports are used only within private, authenticated internal channels and enforce TLS, authentication, schema validation, payload size limits, and rate limiting; SSE endpoints must not be exposed to the public internet.",
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
    "id": "83413835e0f14a621e63991930817333",
    "name": "q_c10_10_3_4",
    "title": "[10.3.4] Verify that MCP servers validate the `Origin` and `Host` headers on all HTTP-based transports (including SSE and streamable-HTTP) to prevent DNS rebinding attacks and reject requests from untrusted, mismatched, or missing origins.",
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
    "id": "dec2bdf2e2aa9bb6efe14836b55d5087",
    "name": "q_c10_10_3_5",
    "title": "[10.3.5] Verify that intermediaries do not alter or remove the `Mcp-Protocol-Version` header on streamable-HTTP transports unless explicitly required by the protocol specification, preventing protocol downgrade via header stripping.",
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
], "title": "C10.3 Secure Transport & Network Boundary Protection", "state": "expanded" });
export default c10_3;