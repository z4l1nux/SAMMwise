const c03_7 = () => ({ "type": "panel", "name": "C3.7 Fine-Tuning Pipeline Authorization & Reward Model Integrity", "elements": [
  {
    "type": "radiogroup",
    "id": "1b7240d05ecff0c74e38f4c42e7efbb6",
    "name": "q_c03_3_7_1",
    "title": "[3.7.1] Verify that initiating a fine-tuning or retraining run requires authorization from a person who did not request the run (separation of duties).",
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
    "id": "37e6614e354ab218e39a6c674418e9ed",
    "name": "q_c03_3_7_2",
    "title": "[3.7.2] Verify that reward models used in RLHF fine-tuning are versioned, cryptographically signed, and integrity-verified before use in a training run.",
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
    "id": "3c115e82891c34ccc30d8528cc9b6d94",
    "name": "q_c03_3_7_3",
    "title": "[3.7.3] Verify that RLHF training stages include automated detection of reward hacking or reward model over-optimization (e.g., held-out human-preference probe sets, divergence thresholds, or KL penalty monitoring), with the run blocked from promotion if detection thresholds are exceeded.",
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
    "id": "f9a0b4ed96d74a0465e776c2950c9a7c",
    "name": "q_c03_3_7_4",
    "title": "[3.7.4] Verify that in multi-stage fine-tuning pipelines, each stage's output is integrity-verified before the next stage consumes it, and intermediate checkpoints are registered as distinct artifacts enabling per-stage rollback.",
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
], "title": "C3.7 Fine-Tuning Pipeline Authorization & Reward Model Integrity", "state": "expanded" });
export default c03_7;