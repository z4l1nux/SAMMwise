const c01_3 = () => ({ "type": "panel", "name": "C1.3 Data Labeling and Annotation Security", "elements": [
  {
    "type": "radiogroup",
    "id": "8b34b251b979246507bbd2615024a529",
    "name": "q_c01_1_3_1",
    "title": "[1.3.1] Verify that labeling interfaces and platforms enforce access controls and maintain audit logs of all labeling activities, and that annotator identity metadata is exported and retained alongside the dataset so that every annotation or preference pair can be attributed to a specific, verified human annotator throughout the training pipeline, not only within the labeling platform.",
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
    "id": "1d75c6aa7726ed023ae598c8bf23da03",
    "name": "q_c01_1_3_2",
    "title": "[1.3.2] Verify that cryptographic hashes or digital signatures are applied to labeling artifacts, annotation data, and fine-tuning feedback records (including RLHF preference pairs) to ensure their integrity and authenticity.",
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
    "id": "1235b04d446d1ddd1e6a6147936c75e8",
    "name": "q_c01_1_3_3",
    "title": "[1.3.3] Verify that labeling audit logs are tamper-evident and that labeling platforms protect against unauthorized modifications.",
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
    "id": "f2cce26bf2e517924639940d15b9ceef",
    "name": "q_c01_1_3_4",
    "title": "[1.3.4] Verify that sensitive information in labels is redacted, anonymized, or encrypted using appropriate granularity at rest and in transit.",
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
], "title": "C1.3 Data Labeling and Annotation Security", "state": "expanded" });
export default c01_3;