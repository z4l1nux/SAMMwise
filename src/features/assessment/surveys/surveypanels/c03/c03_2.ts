const c03_2 = () => ({ "type": "panel", "name": "C3.2 Model Validation & Testing", "elements": [
  {
    "type": "radiogroup",
    "id": "e96dbc1726330f37fcf903578ec9707b",
    "name": "q_c03_3_2_1",
    "title": "[3.2.1] Verify that models undergo automated security testing that includes input validation, output sanitization, and safety evaluations with pass/fail thresholds before deployment.",
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
    "id": "48cb4a11fe98e23da7f5d97f86bed8dc",
    "name": "q_c03_3_2_2",
    "title": "[3.2.2] Verify that security testing covers agent workflows, tool and MCP integrations, RAG and memory interactions, multimodal inputs, and guardrails (safety models or detection services) using a versioned evaluation harness.",
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
    "id": "45c15fd30f0ed7c694129219167b370a",
    "name": "q_c03_3_2_3",
    "title": "[3.2.3] Verify that all model changes (deployment, configuration, retirement) generate immutable audit records including a timestamp, an authenticated actor identity, a change type, and before/after states, with trace metadata (environment and consuming services/agents) and a model identifier (version/digest/signature).",
    "description": "Level: 2 | Role: V",
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
    "id": "60345bc937073565caa093048cb2fbc0",
    "name": "q_c03_3_2_4",
    "title": "[3.2.4] Verify that validation failures automatically block model deployment unless an explicit override approval from pre-designated authorized personnel with documented business justifications.",
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
    "id": "c45731314c0a881b84fd24e430fd2b23",
    "name": "q_c03_3_2_5",
    "title": "[3.2.5] Verify that models subjected to post-training quantization, pruning, or distillation are re-evaluated against the same safety and alignment test suite on the compressed artifact before deployment, and that evaluation results are retained as distinct records linked to the compressed artifact's version or digest.",
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
], "title": "C3.2 Model Validation & Testing", "state": "expanded" });
export default c03_2;