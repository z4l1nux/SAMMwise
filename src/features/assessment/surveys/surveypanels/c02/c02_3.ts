const c02_3 = () => ({ "type": "panel", "name": "C2.3 Prompt Character Set", "elements": [
  {
    "type": "radiogroup",
    "id": "1bbc0e4c72b92070fc0b489f2fb0180f",
    "name": "q_c02_2_3_1",
    "title": "[2.3.1] Verify that the system implements a character set limitation for user inputs, allowing only characters that are explicitly required for business purposes using an allow-list approach.",
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
    "id": "a8fa365995ef1aed92f368b817c626bd",
    "name": "q_c02_2_3_2",
    "title": "[2.3.2] Verify that inputs containing characters outside of the allowed set are rejected and logged with trace metadata (source, tool or MCP server, agent ID, session).",
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
  }
], "title": "C2.3 Prompt Character Set", "state": "expanded" });
export default c02_3;