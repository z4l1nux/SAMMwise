const c07_3 = () => ({ "type": "panel", "name": "C7.3 Output Safety & Privacy Filtering", "elements": [
  {
    "type": "radiogroup",
    "id": "6327207c9dacfe9b0eadbcfa46dacb49",
    "name": "q_c07_7_3_1",
    "title": "[7.3.1] Verify that automated classifiers scan every response and block content that matches hate, harassment, or sexual violence categories.",
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
    "id": "86db331874bf67415ef09d51edb38b0f",
    "name": "q_c07_7_3_2",
    "title": "[7.3.2] Verify that the system scans every response for PII (like credit cards or emails) and automatically redacts it before display.",
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
    "id": "60a6715f3c15c5d18c765d6f6f408415",
    "name": "q_c07_7_3_3",
    "title": "[7.3.3] Verify that PII detection and redaction events are logged without including the redacted PII values themselves, to maintain an audit trail without creating secondary PII exposure.",
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
    "id": "e0d26a3cb07d20fc07a33a9b3d41dc56",
    "name": "q_c07_7_3_4",
    "title": "[7.3.4] Verify that data labeled as \"confidential\" in the system remains blocked or redacted.",
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
    "id": "de242be8e94d7cb9cab5e164b1e3e962",
    "name": "q_c07_7_3_5",
    "title": "[7.3.5] Verify that safety filters can be configured differently based on the user's role or location (e.g., stricter filters for minors) as appropriate.",
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
    "id": "bcda2ab54583348167f1052fd3340d67",
    "name": "q_c07_7_3_6",
    "title": "[7.3.6] Verify that the system requires a human approval step or re-authentication if the model generates high-risk content.",
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
    "id": "70a1b5ac58c0f8937e8c3a023b445d9a",
    "name": "q_c07_7_3_7",
    "title": "[7.3.7] Verify that output filters detect and block responses that reproduce verbatim segments of system prompt content.",
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
    "id": "da1ba99987e831bc80f1afe0a69f3471",
    "name": "q_c07_7_3_8",
    "title": "[7.3.8] Verify that LLM client applications prevent model-generated output from triggering automatic outbound requests (e.g., auto-rendered images, iframes, or link prefetching) to attacker-controlled endpoints, for example by disabling automatic external resource loading or restricting it to explicitly allowlisted origins as appropriate.",
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
], "title": "C7.3 Output Safety & Privacy Filtering", "state": "expanded" });
export default c07_3;