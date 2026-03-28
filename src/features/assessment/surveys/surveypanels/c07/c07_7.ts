const c07_7 = () => ({ "type": "panel", "name": "C7.7 Generative Media Safeguards", "elements": [
  {
    "type": "radiogroup",
    "id": "3a15ef2f61da8bc8c6868f2ae7b565c2",
    "name": "q_c07_7_7_1",
    "title": "[7.7.1] Verify that input filters block prompts requesting explicit or non-consensual synthetic content before the model processes them.",
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
    "id": "ba06cfe880bcb62cbafcb6b421a3aaea",
    "name": "q_c07_7_7_2",
    "title": "[7.7.2] Verify that the system refuses to generate media (images/audio) that depicts real people without verified consent.",
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
    "id": "444a1ff163444e1c80d5c273b6dba19a",
    "name": "q_c07_7_7_3",
    "title": "[7.7.3] Verify that the system checks generated content for copyright violations before releasing it.",
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
    "id": "e8f6705d01b40f79501df3b83a4aa565",
    "name": "q_c07_7_7_4",
    "title": "[7.7.4] Verify that attempts to bypass filters are detected and logged as security events.",
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
    "id": "60b5190fe8f73348921c0fb5d7eee729",
    "name": "q_c07_7_7_5",
    "title": "[7.7.5] Verify that all generated media includes an invisible watermark or cryptographic signature to prove it was AI-generated.",
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
], "title": "C7.7 Generative Media Safeguards", "state": "expanded" });
export default c07_7;