const c11_2 = () => ({ "type": "panel", "name": "C11.2 Adversarial-Example Hardening", "elements": [
  {
    "type": "radiogroup",
    "id": "c17b5a0d0fcafa6d224ace4d484f4bce",
    "name": "q_c11_11_2_1",
    "title": "[11.2.1] Verify that models serving high-risk functions are evaluated against known adversarial attack techniques relevant to their modality (e.g., perturbation attacks for vision, token-manipulation attacks for text).",
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
    "id": "1bf481375876ca87c0fd9aad1f61a7de",
    "name": "q_c11_11_2_2",
    "title": "[11.2.2] Verify that adversarial-example detection raises alerts in production pipelines, with blocking or degraded-capability responses for high-risk endpoints or use cases.",
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
    "id": "ed99ea05cebac2125fd60b19ea43b7a5",
    "name": "q_c11_11_2_3",
    "title": "[11.2.3] Verify that adversarial training or equivalent hardening techniques are applied where feasible, with documented configurations and reproducible procedures.",
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
    "id": "1830614326fc92f1c3727e3bb786238a",
    "name": "q_c11_11_2_4",
    "title": "[11.2.4] Verify that robustness evaluations use adaptive attacks (attacks specifically designed to defeat the deployed defenses) to confirm no measurable robustness loss across releases.",
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
    "id": "b0f87ca553d1eff94985f8bb6e7ec489",
    "name": "q_c11_11_2_5",
    "title": "[11.2.5] Verify that formal robustness verification methods (e.g., certified bounds, interval-bound propagation) are applied to safety-critical model components where the model architecture supports them.",
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
], "title": "C11.2 Adversarial-Example Hardening", "state": "expanded" });
export default c11_2;