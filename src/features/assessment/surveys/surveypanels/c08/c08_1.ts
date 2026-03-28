const c08_1 = () => ({ "type": "panel", "name": "C8.1 Access Controls on Memory & RAG Indices", "elements": [
  {
    "type": "radiogroup",
    "id": "0e9ed831576fc087855d1bf0450baf1b",
    "name": "q_c08_8_1_1",
    "title": "[8.1.1] Verify that vector insert, update, delete, and query operations are enforced with namespace/collection/document-tag scope controls (e.g., tenant ID, user ID, data classification labels) with default-deny.",
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
    "id": "85bce2e47e0b154ab8adc0d1f0bc5bcf",
    "name": "q_c08_8_1_2",
    "title": "[8.1.2] Verify that API credentials used for vector operations carry scoped claims (e.g., permitted collections, allowed verbs, tenant binding).",
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
    "id": "8422e2e018825f69966b4bfb09f340b5",
    "name": "q_c08_8_1_3",
    "title": "[8.1.3] Verify that cross-scope access attempts (e.g., cross-tenant similarity queries, namespace traversal, tag bypass) are detected and rejected.",
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
    "id": "3bc9f1f7325de1ded3353af6142d85b4",
    "name": "q_c08_8_1_4",
    "title": "[8.1.4] Verify that every ingested document is tagged at write time with source, writer identity (authenticated user or system principal), timestamp, batch ID, and embedding model version, and that these tags are immutable after initial write.",
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
    "id": "475aed5218c6182628b332e5960ae19f",
    "name": "q_c08_8_1_5",
    "title": "[8.1.5] Verify that RAG pipeline retrieval events log the query issued, the documents or chunks retrieved, similarity scores, the knowledge source, and whether retrieved content passed prompt injection scanning before being incorporated into model context.",
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
    "id": "d6c3594eeb74c997776cf6c7741484f2",
    "name": "q_c08_8_1_6",
    "title": "[8.1.6] Verify that retrieval anomaly detection identifies embedding density outliers, repeated dominance of specific documents in similarity results, and sudden shifts in retrieval bias distribution that may indicate vector database poisoning.",
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
], "title": "C8.1 Access Controls on Memory & RAG Indices", "state": "expanded" });
export default c08_1;