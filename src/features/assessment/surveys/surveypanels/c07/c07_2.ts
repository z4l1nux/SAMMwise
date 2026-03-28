const c07_2 = () => ({ "type": "panel", "name": "C7.2 Hallucination Detection & Mitigation", "elements": [
  {
    "type": "radiogroup",
    "id": "cb07061aca8a7bf594649455b6e7505d",
    "name": "q_c07_7_2_1",
    "title": "[7.2.1] Verify that the system assesses the reliability of generated answers using a confidence or uncertainty estimation method (e.g., confidence scoring, retrieval-based verification, or model uncertainty estimation).",
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
    "id": "2b0b0584bf7bf00db9dffaefc2ba5c96",
    "name": "q_c07_7_2_2",
    "title": "[7.2.2] Verify that the application automatically blocks answers or switches to a fallback message if the confidence score drops below a defined threshold.",
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
    "id": "0a0dfcb2b4d1aa65e7885606439d0af1",
    "name": "q_c07_7_2_3",
    "title": "[7.2.3] Verify that hallucination events (low-confidence responses) are logged with input/output metadata for analysis.",
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
    "id": "f59a6c4862dd0234352adc3b2d953135",
    "name": "q_c07_7_2_4",
    "title": "[7.2.4] Verify that for responses classified as high-risk or high-impact by policy, the system performs an additional verification step through an independent mechanism, such as retrieval-based grounding against authoritative sources, deterministic rule-based validation, tool-based fact-checking, or consensus review by a separately provisioned model.",
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
    "id": "d7fd8cdc59ecf21f4b450b1832474842",
    "name": "q_c07_7_2_5",
    "title": "[7.2.5] Verify that the system tracks tool and function invocation history within a request chain and flags high-confidence factual assertions that were not preceded by relevant verification tool usage, as a practical hallucination detection signal independent of confidence scoring.",
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
], "title": "C7.2 Hallucination Detection & Mitigation", "state": "expanded" });
export default c07_2;