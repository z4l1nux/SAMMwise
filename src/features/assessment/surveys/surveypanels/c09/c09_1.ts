const c09_1 = () => ({ "type": "panel", "name": "C9.1 Execution Budgets, Loop Control, and Circuit Breakers", "elements": [
  {
    "type": "radiogroup",
    "id": "1ffee682a08ec33446dad5a661971cf2",
    "name": "q_c09_9_1_1",
    "title": "[9.1.1] Verify that per-execution budgets (max recursion depth, max fan-out/concurrency, wall-clock time, tokens, and monetary spend) are configured and enforced by the orchestration runtime.",
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
    "id": "d4c67b95212a949318ed0e3ae75afdd3",
    "name": "q_c09_9_1_2",
    "title": "[9.1.2] Verify that cumulative resource/spend counters are tracked per request chain and hard-stop the chain when thresholds are exceeded.",
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
    "id": "bed7cb218b078b58210406cbf1bddcee",
    "name": "q_c09_9_1_3",
    "title": "[9.1.3] Verify that circuit breakers terminate execution on budget violations.",
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
    "id": "cccd175bdd301df81af689c539d9238f",
    "name": "q_c09_9_1_4",
    "title": "[9.1.4] Verify that security testing covers runaway loops, budget exhaustion, and partial-failure scenarios, confirming safe termination and consistent state.",
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
  },
  {
    "type": "radiogroup",
    "id": "63c4f90b7fd9a5518a48913ea470eb80",
    "name": "q_c09_9_1_5",
    "title": "[9.1.5] Verify that budget and circuit-breaker policies are expressed as policy-as-code and are validated in CI/CD to prevent drift and unsafe configuration changes.",
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
], "title": "C9.1 Execution Budgets, Loop Control, and Circuit Breakers", "state": "expanded" });
export default c09_1;