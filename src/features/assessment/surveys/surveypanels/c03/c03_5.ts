const c03_5 = () => ({ "type": "panel", "name": "C3.5 Hosted and Provider-Managed Model Controls", "elements": [
  {
    "type": "radiogroup",
    "id": "e6ac08d43b56f32a2795606f1efde9bf",
    "name": "q_c03_3_5_1",
    "title": "[3.5.1] Verify that hosted model dependencies are inventoried with provider, endpoint, provider-exposed model identifier, version or release identifier when available, and fallback or routing relationships.",
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
    "id": "195a428198b0764bac095468670ddc9a",
    "name": "q_c03_3_5_2",
    "title": "[3.5.2] Verify that provider model, version, or routing changes trigger security re-evaluation before continued use in high-risk workflows.",
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
    "id": "15345c170b2dfc11b117700ce0cfe6d5",
    "name": "q_c03_3_5_3",
    "title": "[3.5.3] Verify that logs record the exact hosted model identifier returned by the provider, or explicitly record that no such identifier was exposed.",
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
    "id": "e713ae80d8fdafe4d9832d362cb5cac4",
    "name": "q_c03_3_5_4",
    "title": "[3.5.4] Verify that high-assurance deployments fail closed or require explicit approval when the provider does not expose sufficient model identity or change notification information for verification.",
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
], "title": "C3.5 Hosted and Provider-Managed Model Controls", "state": "expanded" });
export default c03_5;