const c06_1 = () => ({ "type": "panel", "name": "C6.1 Pretrained Model Vetting & Origin Integrity", "elements": [
  {
    "type": "radiogroup",
    "id": "f80c78fb38a080def3855b976e465681",
    "name": "q_c06_6_1_1",
    "title": "[6.1.1] Verify that every third-party model artifact includes a signed origin-and-integrity record identifying its source, version, and integrity checksum.",
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
    "id": "7f0894882d5679989fe2b80ea266ed73",
    "name": "q_c06_6_1_2",
    "title": "[6.1.2] Verify that models are scanned for malicious layers or Trojan triggers using automated tools before import.",
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
    "id": "f94b4006570dfa9a856116092a8851ce",
    "name": "q_c06_6_1_3",
    "title": "[6.1.3] Verify that model licenses, export-control tags, and data-origin statements are recorded in an AI BOM entry.",
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
    "id": "dc4479416ebe6bf3bef6f91f03fe16a8",
    "name": "q_c06_6_1_4",
    "title": "[6.1.4] Verify that high-risk models (e.g., publicly uploaded weights, unverified creators) remain quarantined until human review and sign-off.",
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
    "id": "5a2deaa83dc2e7cd5afef1c56aea3ac7",
    "name": "q_c06_6_1_5",
    "title": "[6.1.5] Verify that transfer-learning fine-tunes pass adversarial evaluation to detect hidden behaviors.",
    "description": "Level: 3 | Role: D",
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
    "id": "81d08fafd2092da4732a573473b616ef",
    "name": "q_c06_6_1_6",
    "title": "[6.1.6] Verify that third-party or open-source models pass a defined behavioral acceptance test suite (covering safety, alignment, and capability boundaries relevant to the deployment context) before being imported or promoted to any non-development environment.",
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
], "title": "C6.1 Pretrained Model Vetting & Origin Integrity", "state": "expanded" });
export default c06_1;