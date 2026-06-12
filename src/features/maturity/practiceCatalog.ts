/**
 * Canonical OWASP SAMM catalogue — single source of truth for the maturity
 * planning layer (targets, gap analysis, action plans).
 *
 * Practice and business-function names MUST stay byte-for-byte identical to the
 * ones produced by `assessmentCalculator` (graphs/testCalculator.ts) and used as
 * keys in `messages/*.json` under `charts.practices` / `charts.businessFunctions`.
 * The order also mirrors `computeResults()` so a catalogue index lines up with the
 * `practiceScores` array index. `practiceCatalog.test.ts` guards this invariant.
 */

export const BUSINESS_FUNCTIONS = [
  'Governance',
  'Design',
  'Implementation',
  'Verification',
  'Operations',
] as const;

export type BusinessFunction = (typeof BUSINESS_FUNCTIONS)[number];

export interface CatalogPractice {
  /** Canonical English name — also the i18n key and the targets/plans key. */
  name: string;
  /** Owning business function. */
  bf: BusinessFunction;
  /** Position in the flat 15-practice list (aligned with `practiceScores`). */
  index: number;
}

const PRACTICES_BY_BF: Record<BusinessFunction, string[]> = {
  Governance: ['Strategy and Metrics', 'Policy and Compliance', 'Education and Guidance'],
  Design: ['Threat Assessment', 'Security Requirements', 'Security Architecture'],
  Implementation: ['Secure Build', 'Secure Deployment', 'Defect Management'],
  Verification: ['Architecture Assessment', 'Requirements Testing', 'Security Testing'],
  Operations: ['Incident Management', 'Environment Management', 'Operations Management'],
};

export const PRACTICE_CATALOG: CatalogPractice[] = BUSINESS_FUNCTIONS.flatMap(bf =>
  PRACTICES_BY_BF[bf].map(name => ({ name, bf, index: 0 })),
).map((p, index) => ({ ...p, index }));

/** Flat list of the 15 canonical practice names, in `practiceScores` order. */
export const PRACTICE_NAMES: string[] = PRACTICE_CATALOG.map(p => p.name);

/** Maximum maturity score on the SAMM 0–3 scale. */
export const MAX_SCORE = 3;

/** Returns the owning business function for a practice name, or null if unknown. */
export function bfOfPractice(practiceName: string): BusinessFunction | null {
  return PRACTICE_CATALOG.find(p => p.name === practiceName)?.bf ?? null;
}

/** Returns the catalogue entry for a practice name, or null if unknown. */
export function findPractice(practiceName: string): CatalogPractice | null {
  return PRACTICE_CATALOG.find(p => p.name === practiceName) ?? null;
}
