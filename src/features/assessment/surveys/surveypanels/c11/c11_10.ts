const c11_10 = () => ({ "type": "panel", "name": "C11.10 Adversarial Bias Exploitation Defense", "elements": [
  {
    "type": "radiogroup",
    "id": "b30910a28ef68ec2a688aba52b38608c",
    "name": "q_c11_11_10_1",
    "title": "[11.10.1] Verify that inference endpoints for security-relevant classifiers (e.g., abuse detection, fraud scoring) include monitoring that accounts for query patterns indicative of bias probing, such as systematic variation along a single input dimension (e.g., demographic, linguistic, stylistic) while other dimensions remain constant, and alert when such patterns are detected.",
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
    "id": "96305cffd05e8575675ddc13332e8c9f",
    "name": "q_c11_11_10_2",
    "title": "[11.10.2] Verify that adversarial robustness evaluations for security-relevant classifiers are stratified by meaningful input subgroups (e.g., language register, content category), with per-subgroup false-negative rates under adversarial conditions measured and flagged when deviating from aggregate rates beyond a defined threshold.",
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
    "id": "af21a4e4e96161e8f439e0abba2b7cd0",
    "name": "q_c11_11_10_3",
    "title": "[11.10.3] Verify that where bias-based evasion is identified as a material threat, adversarial hardening (e.g., adversarial training with per-subgroup loss constraints, ensemble diversity across training distributions) incorporates explicit subgroup robustness requirements, and that per-subgroup robustness metrics are verified not to regress across model releases.",
    "description": "Level: 3 | Role: D",
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
], "title": "C11.10 Adversarial Bias Exploitation Defense", "state": "expanded" });
export default c11_10;