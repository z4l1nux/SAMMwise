const c09_8 = () => ({ "type": "panel", "name": "C9.8 Multi-Agent Domain Isolation and Swarm Risk Controls", "elements": [
  {
    "type": "radiogroup",
    "id": "ede78584d2366bfb27e388f33990734c",
    "name": "q_c09_9_8_1",
    "title": "[9.8.1] Verify that agents in different tenants, security domains, or environments (dev/test/prod) run in isolated runtimes and network segments, with default-deny controls that prevent cross-domain discovery and calls.",
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
    "id": "a2f9347b3f61771f40527efced78410d",
    "name": "q_c09_9_8_2",
    "title": "[9.8.2] Verify that runtime monitoring detects unsafe emergent behavior (oscillation, deadlocks, uncontrolled broadcast, abnormal call graphs) and automatically applies corrective actions (throttle, isolate, terminate).",
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
    "id": "410d4160c01f4404abc34e4522883338",
    "name": "q_c09_9_8_3",
    "title": "[9.8.3] Verify that each agent is restricted to its own memory namespace and is technically prevented from reading or modifying peer agent state, preventing unauthorized cross-agent access within the same swarm.",
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
    "id": "f26e5aafb2d44632075fb7d08608fd39",
    "name": "q_c09_9_8_4",
    "title": "[9.8.4] Verify that each agent operates with an isolated context window and dedicated credentials scoped to its role, preventing peer agents from accessing or influencing another agent's context or credential scope to prevent unauthorized cross-agent access within the same swarm.",
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
    "id": "d94f617799a8cfaf3915f6281e858da4",
    "name": "q_c09_9_8_5",
    "title": "[9.8.5] Verify that swarm-level aggregate action rate limits (e.g., total external API calls, file writes, or network requests per time window across all agents) are enforced to prevent bursts that cause denial-of-service or abuse of external systems.",
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
    "id": "b8396d48a4749420e330d75388770ed2",
    "name": "q_c09_9_8_6",
    "title": "[9.8.6] Verify that a swarm-level shutdown capability exists that can halt all active agent instances or selected problematic instances in an organized fashion and prevents new agent spawning, with shutdown completable within a pre-defined response time.",
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
], "title": "C9.8 Multi-Agent Domain Isolation and Swarm Risk Controls", "state": "expanded" });
export default c09_8;