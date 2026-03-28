const c02_5 = () => ({ "type": "panel", "name": "C2.5 Content & Policy Screening", "elements": [
  {
    "type": "radiogroup",
    "id": "555fb118975959007f911c3799e528a2",
    "name": "q_c02_2_5_1",
    "title": "[2.5.1] Verify that a content classifier scores every input and output for violence, self-harm, hate, sexual content and illegal requests, with configurable thresholds.",
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
    "id": "907c122ba7e22d0216766728ea432354",
    "name": "q_c02_2_5_2",
    "title": "[2.5.2] Verify that inputs which violate policies will be rejected so they will not propagate to downstream model or tool/MCP calls.",
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
    "id": "6617e9908676043c082ed89687a8f990",
    "name": "q_c02_2_5_3",
    "title": "[2.5.3] Verify that screening respects user-specific policies (age and regional legal constraints) via attribute-based rules resolved at request time, including the role or permission level of the calling agent.",
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
    "id": "453520b736669b896d6c090d5ff0a9f9",
    "name": "q_c02_2_5_4",
    "title": "[2.5.4] Verify that screening logs include classifier confidence scores and policy category tags with applied stage (pre-prompt or post-response) and trace metadata (source, tool or MCP server, agent ID, session) for SOC correlation and future red-team replay.",
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
], "title": "C2.5 Content & Policy Screening", "state": "expanded" });
export default c02_5;