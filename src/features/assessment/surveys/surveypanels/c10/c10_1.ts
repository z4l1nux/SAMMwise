const c10_1 = () => ({ "type": "panel", "name": "C10.1 Component Integrity & Supply Chain Hygiene", "elements": [
  {
    "type": "radiogroup",
    "id": "472f3b2229967dbc84013433841a9f8a",
    "name": "q_c10_10_1_1",
    "title": "[10.1.1] Verify that MCP server and client components are obtained only from trusted sources and verified using signatures, checksums, or secure package metadata, rejecting tampered or unsigned builds.",
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
    "id": "bd490ba8b3e9e07d89da48e5f5b52b5c",
    "name": "q_c10_10_1_2",
    "title": "[10.1.2] Verify that only allowlisted MCP server identifiers (name, version, and registry) are permitted in production and that the runtime rejects connections to unlisted or unregistered servers at load time.",
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
], "title": "C10.1 Component Integrity & Supply Chain Hygiene", "state": "expanded" });
export default c10_1;