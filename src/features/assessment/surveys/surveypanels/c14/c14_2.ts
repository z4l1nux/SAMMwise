const c14_2 = () => ({ "type": "panel", "name": "C14.2 Human-in-the-Loop Decision Checkpoints", "elements": [
  {
    "type": "radiogroup",
    "id": "3b111003032a5ca82ab129becdc8f15d",
    "name": "q_c14_14_2_1",
    "title": "[14.2.1] Verify that high-risk AI decisions require explicit human approval before execution.",
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
    "id": "2fd44a8b6a3072302f431d294ea7bb50",
    "name": "q_c14_14_2_2",
    "title": "[14.2.2] Verify that risk thresholds are clearly defined and automatically trigger human review workflows.",
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
    "id": "17477e12e9b1745833d3f3f4fc432901",
    "name": "q_c14_14_2_3",
    "title": "[14.2.3] Verify that time-sensitive decisions have fallback procedures when human approval cannot be obtained within required timeframes.",
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
    "id": "bc02ecd80c2235c23467760a5db8d6fd",
    "name": "q_c14_14_2_4",
    "title": "[14.2.4] Verify that escalation procedures define clear authority levels for different decision types or risk categories, if applicable.",
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
], "title": "C14.2 Human-in-the-Loop Decision Checkpoints", "state": "expanded" });
export default c14_2;