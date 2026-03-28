const c11_4 = () => ({ "type": "panel", "name": "C11.4 Model-Inversion Resistance", "elements": [
  {
    "type": "radiogroup",
    "id": "a72bfa907776f2d1437ad3858cbd3995",
    "name": "q_c11_11_4_1",
    "title": "[11.4.1] Verify that sensitive attributes are never directly output; where needed, outputs use generalized categories (e.g., ranges, buckets) or one-way transforms.",
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
    "id": "b6e50b82def60d4798a22939ce4234dc",
    "name": "q_c11_11_4_2",
    "title": "[11.4.2] Verify that query-rate limits throttle repeated adaptive queries from the same principal to raise the cost of inversion attacks.",
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
    "id": "77df808175c64decddbcbd022c8c09dd",
    "name": "q_c11_11_4_3",
    "title": "[11.4.3] Verify that models handling sensitive data are trained with privacy-preserving techniques (e.g., differential privacy, gradient clipping) to limit information leakage through outputs.",
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
  }
], "title": "C11.4 Model-Inversion Resistance", "state": "expanded" });
export default c11_4;