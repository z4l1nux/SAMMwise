const c11_6 = () => ({ "type": "panel", "name": "C11.6 Inference-Time Poisoned-Data Detection", "elements": [
  {
    "type": "radiogroup",
    "id": "f5a0f343ba6b63007e8767eec251334c",
    "name": "q_c11_11_6_1",
    "title": "[11.6.1] Verify that inputs from external or untrusted sources pass through anomaly detection (e.g., statistical outlier detection, consistency scoring) before model inference.",
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
    "id": "54b3c65175e1c00cd06b53fc8ac564f5",
    "name": "q_c11_11_6_2",
    "title": "[11.6.2] Verify that anomaly-detection thresholds are tuned on representative clean and adversarial validation sets and that the false-positive rate is measured and documented.",
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
    "id": "63356236647ff9db38f226d392d9d95f",
    "name": "q_c11_11_6_3",
    "title": "[11.6.3] Verify that inputs flagged as anomalous trigger gating actions (blocking, capability degradation, or human review) appropriate to the risk level.",
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
    "id": "d4ad6bfa42dcf13b4ce2aa96db940ac2",
    "name": "q_c11_11_6_4",
    "title": "[11.6.4] Verify that detection methods are periodically stress-tested with current adversarial techniques, including adaptive attacks designed to evade the specific detectors in use.",
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
    "id": "14e92c0a8e0f5b9a61c934e230753dd7",
    "name": "q_c11_11_6_5",
    "title": "[11.6.5] Verify that detection efficacy metrics are logged and periodically re-evaluated against updated threat intelligence.",
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
], "title": "C11.6 Inference-Time Poisoned-Data Detection", "state": "expanded" });
export default c11_6;