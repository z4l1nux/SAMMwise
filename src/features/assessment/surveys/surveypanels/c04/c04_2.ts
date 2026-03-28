const c04_2 = () => ({ "type": "panel", "name": "C4.2 Secure Build & Deployment Pipelines", "elements": [
  {
    "type": "radiogroup",
    "id": "c14afb6c2b7f4c56757d5a03181258e7",
    "name": "q_c04_4_2_1",
    "title": "[4.2.1] Verify that builds are completely automated and produce a software bill of materials (SBOM).",
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
    "id": "569052be932d486bdb7848404c0bc2d9",
    "name": "q_c04_4_2_2",
    "title": "[4.2.2] Verify that build artifacts are cryptographically signed with build-origin metadata (source repository, build pipeline, commit hash) that can be independently verified.",
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
    "id": "d8a621d983f81584c25acd1e6d9fe0d8",
    "name": "q_c04_4_2_3",
    "title": "[4.2.3] Verify that build artifact signatures and build-origin metadata are validated at deployment admission, and unverified artifacts are rejected.",
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
    "id": "d782d746a576b4694e1ec61172925240",
    "name": "q_c04_4_2_4",
    "title": "[4.2.4] Verify that builds are reproducible, producing identical output from identical source inputs, enabling independent verification of build integrity.",
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
], "title": "C4.2 Secure Build & Deployment Pipelines", "state": "expanded" });
export default c04_2;