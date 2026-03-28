const c08_5 = () => ({ "type": "panel", "name": "C8.5 Scope Enforcement for User-Specific Memory", "elements": [
  {
    "type": "radiogroup",
    "id": "09a668bb0dc4ef4668c06aff3359b2da",
    "name": "q_c08_8_5_1",
    "title": "[8.5.1] Verify that every retrieval operation enforces scope constraints (tenant/user/classification) in the vector engine query and verifies them again before prompt assembly (post-filter).",
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
    "id": "3f91d45984a29d7d47faaa51cd42687e",
    "name": "q_c08_8_5_2",
    "title": "[8.5.2] Verify that vector identifiers, namespaces, and metadata indexing prevent cross-scope collisions and enforce uniqueness per tenant.",
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
    "id": "2a7abdf5b7e486f0d37fd04b5dfecc55",
    "name": "q_c08_8_5_3",
    "title": "[8.5.3] Verify that retrieval results that match similarity criteria but fail scope checks are discarded.",
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
    "id": "178f61c847b1cca5aa7fd1be20f93d17",
    "name": "q_c08_8_5_4",
    "title": "[8.5.4] Verify that multi-tenant tests simulate adversarial retrieval attempts (prompt-based and query-based) and demonstrate zero out-of-scope document inclusion in prompts and outputs.",
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
    "id": "377b6972981e71dccdaefdcdb3428037",
    "name": "q_c08_8_5_5",
    "title": "[8.5.5] Verify that in multi-agent systems, each agent's memory namespace is isolated and enforced through access control, not just organizational naming conventions.",
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
    "id": "52d9c6159e1b2176113f823633beddd5",
    "name": "q_c08_8_5_6",
    "title": "[8.5.6] Verify that encryption keys and access policies are segregated per tenant for memory/vector storage, providing cryptographic isolation in shared infrastructure.",
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
], "title": "C8.5 Scope Enforcement for User-Specific Memory", "state": "expanded" });
export default c08_5;