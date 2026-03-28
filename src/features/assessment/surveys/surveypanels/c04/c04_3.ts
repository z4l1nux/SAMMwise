const c04_3 = () => ({ "type": "panel", "name": "C4.3 Network Security & Access Control", "elements": [
  {
    "type": "radiogroup",
    "id": "48c35d811dafe0a02d8b0195cc7a7cc4",
    "name": "q_c04_4_3_1",
    "title": "[4.3.1] Verify that network policies enforce default-deny ingress and egress, with only required services explicitly allowed.",
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
    "id": "7f93ab819b44025da74a5e58f46dfdb7",
    "name": "q_c04_4_3_2",
    "title": "[4.3.2] Verify that AI workloads across environments (development, testing, production) run in isolated network segments with no direct internet access and no shared identity roles, security groups, or cross-environment connectivity.",
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
    "id": "b95785b08c5f8884f59769281b867ef5",
    "name": "q_c04_4_3_3",
    "title": "[4.3.3] Verify that administrative and remote access protocols and access to cloud metadata services are restricted and require strong authentication.",
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
    "id": "59bdb6a575a78eb99582324985cf3cec",
    "name": "q_c04_4_3_4",
    "title": "[4.3.4] Verify that inter-service communication uses mutual TLS with certificate validation and regular automated rotation.",
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
    "id": "48c114acba8690e579a4beae173fe2b1",
    "name": "q_c04_4_3_5",
    "title": "[4.3.5] Verify that egress traffic is restricted to approved destinations and all requests are logged.",
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
], "title": "C4.3 Network Security & Access Control", "state": "expanded" });
export default c04_3;