const c08_2 = () => ({ "type": "panel", "name": "C8.2 Embedding Sanitization & Validation", "elements": [
  {
    "type": "radiogroup",
    "id": "90ca0d60669f43f77cec765239d99fd2",
    "name": "q_c08_8_2_1",
    "title": "[8.2.1] Verify that regulated data and sensitive fields are detected prior to embedding and are masked, tokenized, transformed, or dropped based on policy.",
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
    "id": "b0884f24ad9c3ae68688a765541727dc",
    "name": "q_c08_8_2_2",
    "title": "[8.2.2] Verify that embedding ingestion rejects or quarantines inputs that violate required content constraints (e.g., non-UTF-8, malformed encodings, oversized payloads, invisible Unicode characters, or executable content intended to poison retrieval).",
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
    "id": "ee7395b699e144472b0f909c7873b799",
    "name": "q_c08_8_2_3",
    "title": "[8.2.3] Verify that vectors that fall outside normal clustering patterns are flagged and quarantined before entering production indices.",
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
    "id": "5328d31946e2ebe4182b4d2643f48425",
    "name": "q_c08_8_2_4",
    "title": "[8.2.4] Verify that an agent's own outputs are not automatically written back into its trusted memory without explicit validation (such as content-origin checks or write-authorization controls that verify the content's source before committing writes).",
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
    "id": "510612b56d7ec0cda0219452839c709b",
    "name": "q_c08_8_2_5",
    "title": "[8.2.5] Verify that new content written to memory is checked for contradictions with what is already stored and that conflicts trigger alerts.",
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
], "title": "C8.2 Embedding Sanitization & Validation", "state": "expanded" });
export default c08_2;