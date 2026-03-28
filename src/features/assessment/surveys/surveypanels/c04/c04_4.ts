const c04_4 = () => ({ "type": "panel", "name": "C4.4 Secrets & Cryptographic Key Management", "elements": [
  {
    "type": "radiogroup",
    "id": "27cc6a31d7499ce006f3aace67fd634b",
    "name": "q_c04_4_4_1",
    "title": "[4.4.1] Verify that secrets are stored in a dedicated secrets management system with encryption at rest and isolated from application workloads.",
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
    "id": "68025bb040b2a0339b8cb724409ab888",
    "name": "q_c04_4_4_2",
    "title": "[4.4.2] Verify that access to production secrets requires strong authentication.",
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
    "id": "cc17c5e9e27d57ab76328ddf212e8ac0",
    "name": "q_c04_4_4_3",
    "title": "[4.4.3] Verify that secrets are deployed to applications at runtime through a dedicated secrets management system. Secrets must never be embedded in source code, configuration files, build artifacts, container images, or environment variables.",
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
    "id": "3324fa6c15acd7252b70df2dac81e90e",
    "name": "q_c04_4_4_4",
    "title": "[4.4.4] Verify that cryptographic keys are generated and stored in hardware-backed modules (e.g., HSMs, cloud KMS).",
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
    "id": "15600db215bec8b1d74ae9487fa01afa",
    "name": "q_c04_4_4_5",
    "title": "[4.4.5] Verify that secrets rotation is automated.",
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
], "title": "C4.4 Secrets & Cryptographic Key Management", "state": "expanded" });
export default c04_4;