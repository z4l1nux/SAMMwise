const c11_9 = () => ({ "type": "panel", "name": "C11.9 Self-Modification & Autonomous Update Security", "elements": [
  {
    "type": "radiogroup",
    "id": "b874fdc849915ec22ece86fa9fa70f5f",
    "name": "q_c11_11_9_1",
    "title": "[11.9.1] Verify that any self-modification capability (e.g., prompt rewriting, tool-list changes, parameter updates) is restricted to explicitly designated areas with enforced boundaries.",
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
    "id": "fc5f3c457d117d48776dc176f0378855",
    "name": "q_c11_11_9_2",
    "title": "[11.9.2] Verify that proposed self-modifications undergo security impact assessment or policy validation before taking effect.",
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
    "id": "9988e479b3065e97938e3ae63d43a74c",
    "name": "q_c11_11_9_3",
    "title": "[11.9.3] Verify that all self-modifications are logged, reversible, and subject to integrity verification, enabling rollback to a known-good state.",
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
    "id": "09bc483dc29fd558b81de20d1ba7cf52",
    "name": "q_c11_11_9_4",
    "title": "[11.9.4] Verify that self-modification scope is bounded (e.g., maximum change magnitude, rate limits on updates, prohibited modification targets) to prevent runaway or adversarially induced changes.",
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
    "id": "878424a382ac4896a43e59701e653f58",
    "name": "q_c11_11_9_5",
    "title": "[11.9.5] Verify that when safety violation data (blocked inputs, filtered outputs, flagged hallucinations) is used as training signal for model improvement, the feedback pipeline includes integrity verification, poisoning detection, and human review gates to prevent adversarial manipulation of the improvement mechanism.",
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
], "title": "C11.9 Self-Modification & Autonomous Update Security", "state": "expanded" });
export default c11_9;