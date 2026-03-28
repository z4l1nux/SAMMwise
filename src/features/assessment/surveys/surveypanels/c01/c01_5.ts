const c01_5 = () => ({ "type": "panel", "name": "C1.5 Data Lineage and Traceability", "elements": [
  {
    "type": "radiogroup",
    "id": "6a684c52ad0955678b7e9c5f6255114a",
    "name": "q_c01_1_5_1",
    "title": "[1.5.1] Verify that the lineage of each dataset and its components, including all transformations, augmentations, and merges, is recorded and can be reconstructed.",
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
    "id": "1638f1d6d0e507bd1e32134cd9c71652",
    "name": "q_c01_1_5_2",
    "title": "[1.5.2] Verify that lineage records are immutable, securely stored, and accessible for audits.",
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
    "id": "fe26f93c8302fd5e95f4195420aa1464",
    "name": "q_c01_1_5_3",
    "title": "[1.5.3] Verify that lineage tracking covers synthetic data generated via augmentation, synthesis, or privacy-preserving techniques and that all synthetic data is clearly labeled and distinguishable from real data throughout the pipeline.",
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
], "title": "C1.5 Data Lineage and Traceability", "state": "expanded" });
export default c01_5;