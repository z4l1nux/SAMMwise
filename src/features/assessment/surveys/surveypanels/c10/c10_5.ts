const c10_5 = () => ({ "type": "panel", "name": "C10.5 Outbound Access & Agent Execution Safety", "elements": [
  {
    "type": "radiogroup",
    "id": "5a8c3975ab78a10b2b098ace4b49f149",
    "name": "q_c10_10_5_1",
    "title": "[10.5.1] Verify that MCP servers may only initiate outbound requests to approved internal or external destinations following least-privilege egress policies and cannot access arbitrary network targets or internal cloud metadata services.",
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
    "id": "f85fc10c9fc59626e3011ff54159e9d8",
    "name": "q_c10_10_5_2",
    "title": "[10.5.2] Verify that outbound MCP actions implement execution limits (e.g., timeouts, recursion limits, concurrency caps, or circuit breakers) to prevent unbounded agent-driven tool invocation or chained side effects.",
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
    "id": "c0b3fbb9ffd7da15599a71ead4c0710e",
    "name": "q_c10_10_5_3",
    "title": "[10.5.3] Verify that MCP tool invocations classified as high-risk or destructive (e.g., data deletion, financial transactions, system configuration changes) require explicit user confirmation before execution.",
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
], "title": "C10.5 Outbound Access & Agent Execution Safety", "state": "expanded" });
export default c10_5;