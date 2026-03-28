const c01_4 = () => ({ "type": "panel", "name": "C1.4 Training Data Quality and Security Assurance", "elements": [
  {
    "type": "radiogroup",
    "id": "d9c03e0c54eceaa19ea7a8af8114fc24",
    "name": "q_c01_1_4_1",
    "title": "[1.4.1] Verify that automated tests catch format errors and nulls on every ingest or significant data transformation.",
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
    "id": "ba92566d078f3bb4a6661ae49900e715",
    "name": "q_c01_1_4_2",
    "title": "[1.4.2] Verify that training and fine-tuning pipelines implement data integrity validation and poisoning detection techniques (e.g., statistical analysis, outlier detection, embedding analysis) to identify potential data poisoning or unintentional corruption in training data.",
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
    "id": "60accee6727306890abe8a5ad733c28e",
    "name": "q_c01_1_4_3",
    "title": "[1.4.3] Verify that automatically generated labels (e.g., via models or weak supervision) are subject to confidence thresholds and consistency checks to detect misleading or low-confidence labels.",
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
    "id": "0c0c8c1c6bca002c267a71f497adfc79",
    "name": "q_c01_1_4_4",
    "title": "[1.4.4] Verify that appropriate defenses, such as adversarial training, data augmentation with perturbed inputs, or robust optimization techniques, are implemented and tuned for relevant models based on risk assessment.",
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
    "id": "92bc68bc4802a63f4cbb59317b9e702c",
    "name": "q_c01_1_4_5",
    "title": "[1.4.5] Verify that automated tests catch label skews on every ingest or significant data transformation.",
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
    "id": "f12d27a0f5834e9683d997a3d1b17c33",
    "name": "q_c01_1_4_6",
    "title": "[1.4.6] Verify that models used in security-relevant decisions (e.g., abuse detection, fraud scoring, automated trust decisions) are evaluated for systematic bias patterns that an adversary could exploit to evade controls (e.g., mimicking a trusted language style or demographic pattern to bypass detection).",
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
], "title": "C1.4 Training Data Quality and Security Assurance", "state": "expanded" });
export default c01_4;