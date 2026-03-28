const c08_4 = () => ({ "type": "panel", "name": "C8.4 Prevent Embedding Inversion & Leakage", "elements": [
  {
    "type": "radiogroup",
    "id": "79aa094166c4e2e3c1e15e5d8cab6295",
    "name": "q_c08_8_4_1",
    "title": "[8.4.1] Verify that sensitive vector collections are protected against direct read access by infrastructure administrators via technical controls such as application-layer encryption, envelope encryption with strict KMS policies, or equivalent compensating controls.",
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
    "id": "6edb6082ccba85843711dc46fa6c610a",
    "name": "q_c08_8_4_2",
    "title": "[8.4.2] Verify that privacy/utility targets for embedding leakage resistance are defined and measured, and that changes to embedding models, tokenizers, retrieval settings, or privacy transforms are gated by regression tests against those targets.",
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
], "title": "C8.4 Prevent Embedding Inversion & Leakage", "state": "expanded" });
export default c08_4;