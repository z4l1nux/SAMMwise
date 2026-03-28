const c06_2 = () => ({ "type": "panel", "name": "C6.2 Framework & Library Scanning", "elements": [
  {
    "type": "radiogroup",
    "id": "3f2920f5446c099a1c4eacdbfb395f8d",
    "name": "q_c06_6_2_1",
    "title": "[6.2.1] Verify that CI pipelines run dependency scanners on AI frameworks and critical libraries.",
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
    "id": "98e3d10d9db5b517b2ed19a750b3fb95",
    "name": "q_c06_6_2_2",
    "title": "[6.2.2] Verify that critical and high-severity vulnerabilities block promotion to production images.",
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
    "id": "de8d6ca420aeac388ff171357b1a6a5e",
    "name": "q_c06_6_2_3",
    "title": "[6.2.3] Verify that static code analysis runs on forked or vendored AI libraries.",
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
    "id": "04bd372a2d50e548918cbe4a707441da",
    "name": "q_c06_6_2_4",
    "title": "[6.2.4] Verify that framework upgrade proposals include a security impact assessment referencing public vulnerability feeds.",
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
    "id": "fd881c53b5a43b690783e6aae56859c3",
    "name": "q_c06_6_2_5",
    "title": "[6.2.5] Verify that runtime sensors alert on unexpected dynamic library loads that deviate from the signed SBOM.",
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
], "title": "C6.2 Framework & Library Scanning", "state": "expanded" });
export default c06_2;