const c04_5 = () => ({ "type": "panel", "name": "C4.5 AI Workload Sandboxing & Validation", "elements": [
  {
    "type": "radiogroup",
    "id": "cc39a00c2f06dcdd7b14daf8b970e22e",
    "name": "q_c04_4_5_1",
    "title": "[4.5.1] Verify that external or untrusted AI models execute in isolated sandboxes.",
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
    "id": "7cba53db19c683606d95e6bca0335ede",
    "name": "q_c04_4_5_2",
    "title": "[4.5.2] Verify that sandboxed workloads have no outbound network connectivity by default, with any required access explicitly defined.",
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
    "id": "4881a7829cd6966f08169302cd2f6aca",
    "name": "q_c04_4_5_3",
    "title": "[4.5.3] Verify that workload attestation is performed before model loading, ensuring cryptographic proof that the execution environment has not been tampered with.",
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
    "id": "bd2ee396809815125cf775d3d2c46d71",
    "name": "q_c04_4_5_4",
    "title": "[4.5.4] Verify that confidential workloads execute within a trusted execution environment (TEE) that provides hardware-enforced isolation, memory encryption, and integrity protection.",
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
    "id": "ab3e3e43a194c5a752b592442f6c998d",
    "name": "q_c04_4_5_5",
    "title": "[4.5.5] Verify that confidential inference services prevent model extraction through encrypted computation with sealed model weights and protected execution.",
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
    "id": "26502d27ea283e4e7161f102f217cfa7",
    "name": "q_c04_4_5_6",
    "title": "[4.5.6] Verify that orchestration of trusted execution environments includes lifecycle management, remote attestation, and encrypted communication channels.",
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
    "id": "1dd715ac253e2b587e3029128f5368b7",
    "name": "q_c04_4_5_7",
    "title": "[4.5.7] Verify that secure multi-party computation (SMPC) enables collaborative AI training without exposing individual datasets or model parameters.",
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
], "title": "C4.5 AI Workload Sandboxing & Validation", "state": "expanded" });
export default c04_5;