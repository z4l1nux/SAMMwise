const c10_6 = () => ({ "type": "panel", "name": "C10.6 Transport Restrictions & High-Risk Boundary Controls", "elements": [
  {
    "type": "radiogroup",
    "id": "e06244a9a85f2c02a1dc69df9c42f66a",
    "name": "q_c10_10_6_1",
    "title": "[10.6.1] Verify that stdio-based MCP transports are limited to co-located, single-process development scenarios and isolated from shell execution, terminal injection, and process-spawning capabilities; stdio must not cross network or multi-tenant boundaries.",
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
  },
  {
    "type": "radiogroup",
    "id": "f4c4353580c0cf8104b1d9bfa44a9ecf",
    "name": "q_c10_10_6_2",
    "title": "[10.6.2] Verify that MCP servers expose only allow-listed functions and resources and prohibit dynamic dispatch, reflective invocation, or execution of function names influenced by user or model-provided input.",
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
  },
  {
    "type": "radiogroup",
    "id": "3108b7ea64939d3be471ce168db8c8c0",
    "name": "q_c10_10_6_3",
    "title": "[10.6.3] Verify that tenant boundaries, environment boundaries (e.g., dev/test/prod), and data domain boundaries are enforced at the MCP layer to prevent cross-tenant or cross-environment server or resource discovery.",
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
], "title": "C10.6 Transport Restrictions & High-Risk Boundary Controls", "state": "expanded" });
export default c10_6;