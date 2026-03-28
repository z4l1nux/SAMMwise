const c09_3 = () => ({ "type": "panel", "name": "C9.3 Tool and Plugin Isolation and Safe Integration", "elements": [
  {
    "type": "radiogroup",
    "id": "48a7648031335ab54360fbe504b55426",
    "name": "q_c09_9_3_1",
    "title": "[9.3.1] Verify that each tool/plugin executes in an isolated sandbox (container/VM/WASM/OS sandbox) with least-privilege filesystem, network egress, and syscall permissions appropriate to the tool's function.",
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
    "id": "b14971886b7cddf008a9e512affccb70",
    "name": "q_c09_9_3_2",
    "title": "[9.3.2] Verify that per-tool quotas and timeouts (CPU, memory, disk, egress, execution time) are enforced and logged, and that quota breaches fail closed.",
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
    "id": "a092df59641b771495a40c86b473b310",
    "name": "q_c09_9_3_3",
    "title": "[9.3.3] Verify that tool outputs are validated against strict schemas and security policies before being incorporated into downstream reasoning or follow-on actions.",
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
    "id": "cc0d75c4cb349424869c6ab3001d2af7",
    "name": "q_c09_9_3_4",
    "title": "[9.3.4] Verify that tool binaries or packages are integrity-verified (e.g., signatures, checksums) prior to loading.",
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
    "id": "5b6dda0a52f47b4becdd29da169c0899",
    "name": "q_c09_9_3_5",
    "title": "[9.3.5] Verify that tool manifests declare required privileges, side-effect level, resource limits, and output validation requirements, and that the runtime enforces these declarations.",
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
    "id": "244f2beb0349a5fcfacb3dfd9eac1603",
    "name": "q_c09_9_3_6",
    "title": "[9.3.6] Verify that sandbox escape indicators or policy violations trigger automated containment (tool disabled/quarantined).",
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
], "title": "C9.3 Tool and Plugin Isolation and Safe Integration", "state": "expanded" });
export default c09_3;