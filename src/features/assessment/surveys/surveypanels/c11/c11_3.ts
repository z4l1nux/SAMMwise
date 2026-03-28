const c11_3 = () => ({ "type": "panel", "name": "C11.3 Membership-Inference Mitigation", "elements": [
  {
    "type": "radiogroup",
    "id": "a63521df009d11b2d96780c7a271ce79",
    "name": "q_c11_11_3_1",
    "title": "[11.3.1] Verify that model outputs are calibrated (e.g., via temperature scaling or output perturbation) to reduce overconfident predictions that facilitate membership-inference attacks.",
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
    "id": "2f33fc086861970953c13374bc37fdfc",
    "name": "q_c11_11_3_2",
    "title": "[11.3.2] Verify that training on sensitive datasets employs differentially-private optimization (e.g., DP-SGD) with a documented privacy budget (epsilon).",
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
    "id": "39992d952b7459ca0fe3e1d2921beeaf",
    "name": "q_c11_11_3_3",
    "title": "[11.3.3] Verify that membership-inference attack simulations (e.g., shadow-model, likelihood-ratio, or label-only attacks) demonstrate that attack accuracy does not meaningfully exceed random guessing on held-out data.",
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
], "title": "C11.3 Membership-Inference Mitigation", "state": "expanded" });
export default c11_3;