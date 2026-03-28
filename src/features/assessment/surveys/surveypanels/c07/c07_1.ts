const c07_1 = () => ({ "type": "panel", "name": "C7.1 Output Format Enforcement", "elements": [
  {
    "type": "radiogroup",
    "id": "dd3693a437ec99d06abb4cbfac5a961e",
    "name": "q_c07_7_1_1",
    "title": "[7.1.1] Verify that the application validates all model outputs against a strict schema (like JSON Schema) and rejects any output that does not match.",
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
    "id": "cb4270b4aab16e6d4cfc231dd80e4c7b",
    "name": "q_c07_7_1_2",
    "title": "[7.1.2] Verify that the system uses \"stop sequences\" or token limits to strictly cut off generation before it can overflow buffers or executes unintended commands.",
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
    "id": "39490c10ec2c93ae9819b1951acf47ea",
    "name": "q_c07_7_1_3",
    "title": "[7.1.3] Verify that components processing model output treat it as untrusted input (e.g., using parameterized queries or safe de-serializers).",
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
    "id": "e41376e092922e624da4de54a034f79e",
    "name": "q_c07_7_1_4",
    "title": "[7.1.4] Verify that the system logs the specific error type when an output is rejected for bad formatting.",
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
], "title": "C7.1 Output Format Enforcement", "state": "expanded" });
export default c07_1;