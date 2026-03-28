const c13_3 = () => ({ "type": "panel", "name": "C13.3 Model, Data, and Performance Drift Detection", "elements": [
  {
    "type": "radiogroup",
    "id": "1419eed348792eb73bb25a2998fbaa50",
    "name": "q_c13_13_3_1",
    "title": "[13.3.1] Verify that model performance metrics (accuracy, precision, recall, F1 score, confidence scores, latency, and error rates) are continuously monitored across model versions and time periods and compared against documented baselines.",
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
    "id": "82300b4fca579f13781fe665a94306b3",
    "name": "q_c13_13_3_2",
    "title": "[13.3.2] Verify that baseline performance profiles are formally documented and version-controlled, and are reviewed at a defined frequency or after any model or data pipeline change.",
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
    "id": "5a20a28eb1b7ebb0963894c97ac2f5b5",
    "name": "q_c13_13_3_3",
    "title": "[13.3.3] Verify that automated alerting triggers when performance metrics exceed predefined degradation thresholds or deviate significantly from baselines, and that alerts initiate model retraining or replacement workflows.",
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
    "id": "12b9e1db32c972a3de3e8c529903bf09",
    "name": "q_c13_13_3_4",
    "title": "[13.3.4] Verify that hallucination detection monitors identify and flag instances when model outputs contain factually incorrect, inconsistent, or fabricated information, and that hallucination rates are tracked as continuous time-series metrics to enable trend analysis and detection of sustained model degradation.",
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
    "id": "3db5d5c601e81d7745df8d1e3d3bbbd2",
    "name": "q_c13_13_3_5",
    "title": "[13.3.5] Verify that data drift detection monitors input distribution changes that may impact model performance, using statistically validated methods appropriate to the data type.",
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
    "id": "2b2270b17b47d828ee7495d7577722ff",
    "name": "q_c13_13_3_6",
    "title": "[13.3.6] Verify that schema drift in incoming data (unexpected field additions, removals, type changes, or format variations) is detected and triggers alerting.",
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
    "id": "e8d38a9419f435ab73cb0b8f6673f5b0",
    "name": "q_c13_13_3_7",
    "title": "[13.3.7] Verify that concept drift detection identifies changes in the relationship between inputs and expected outputs.",
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
    "id": "c486f6b578f392d8e906a2a0471b8c72",
    "name": "q_c13_13_3_8",
    "title": "[13.3.8] Verify that degradation root cause analysis correlates performance drops with data changes, infrastructure issues, or external factors.",
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
    "id": "90622156c9727fc9f020ca1499600051",
    "name": "q_c13_13_3_9",
    "title": "[13.3.9] Verify that sudden unexplained behavioral shifts are distinguished from gradual expected operational drift, with a security escalation path defined for unexplained sudden drift.",
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
], "title": "C13.3 Model, Data, and Performance Drift Detection", "state": "expanded" });
export default c13_3;