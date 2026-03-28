const c11_5 = () => ({ "type": "panel", "name": "C11.5 Model-Extraction Defense", "elements": [
  {
    "type": "radiogroup",
    "id": "b3b3a01daa22038299270531a5e647eb",
    "name": "q_c11_11_5_1",
    "title": "[11.5.1] Verify that inference endpoints enforce per-principal and global rate limits designed to make large-scale query harvesting impractical.",
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
    "id": "fff624f6a85dd3d632b19d90eaadb1a9",
    "name": "q_c11_11_5_2",
    "title": "[11.5.2] Verify that extraction-alert events include offending query metadata and are integrated with incident-response playbooks.",
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
    "id": "3e7f2dbb4cd00719085d17af3f6437c9",
    "name": "q_c11_11_5_3",
    "title": "[11.5.3] Verify that query-pattern analysis (e.g., query diversity, input distribution anomalies) feeds an automated extraction-attempt detector.",
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
    "id": "bd49a688f36333635563a1eedf71419d",
    "name": "q_c11_11_5_4",
    "title": "[11.5.4] Verify that model watermarking or fingerprinting techniques are applied so that unauthorized copies can be identified.",
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
    "id": "225261a7a1e2319c3623dd521c03e324",
    "name": "q_c11_11_5_5",
    "title": "[11.5.5] Verify that watermark verification keys and trigger sets are protected with access controls equivalent to other critical cryptographic material.",
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
  }
], "title": "C11.5 Model-Extraction Defense", "state": "expanded" });
export default c11_5;