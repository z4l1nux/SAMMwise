// ── LLM / AI analysis ────────────────────────────────────────────────────────

export type LLMProvider = 'anthropic' | 'openai' | 'gemini' | 'ollama';

export interface LLMSettingsType {
  provider: LLMProvider;
  encryptedKey: string;
  model: string;
  ollamaUrl: string;
  autoAnalysis: boolean;
}

export interface AnalysisResult {
  timestamp: string;
  provider: LLMProvider;
  model: string;
  analysis: string;
}

// ── Assessment / SAMM scores ──────────────────────────────────────────────────

export interface ScorePayload {
  overallScore: number;
  bfNames: string[];
  bfScores: number[];
  practiceNames: string[];
  practiceScores: number[];
  responseCount: Record<string, number>;
  company: string;
  project: string;
}

export interface PreviousPayload extends ScorePayload {}

export interface ScoreData {
  score: number;
  prevScore: number | null;
  percent: number;
  company: string;
  project: string;
  desc: string;
}

export interface PracticeRow {
  bf: string;
  practice: string;
  score: number;
}

export interface ScoreBand {
  labelKey: string;
  color: string;
}

// ── Survey JSON types ─────────────────────────────────────────────────────────

export interface SurveyChoice {
  value: number;
  weight?: number;
  text: string;
}

export interface SurveyQuestion {
  name: string;
  type: string;
  id?: string;
  title: string;
  description?: string;
  choices: SurveyChoice[];
  isRequired?: boolean;
}

export interface SurveyPanel {
  type: 'panel';
  name: string;
  elements: SurveyQuestion[];
  state?: string;
}

export interface SurveyPage {
  name: string;
  elements: SurveyPanel[];
  description?: string;
}

export interface SurveyJSON {
  pages: SurveyPage[];
  questionStartIndex?: string;
}

// ── Graph / Chart helpers ─────────────────────────────────────────────────────

export interface ChartDataset {
  label: string;
  backgroundColor: string | string[];
  borderColor: string | string[];
  borderWidth?: number;
  data: number[];
  circumference?: number;
  rotation?: number;
  pointBackgroundColor?: string;
  pointBorderColor?: string;
  pointHoverBackgroundColor?: string;
  pointHoverBorderColor?: string;
}

export interface ChartMetaData {
  labels: string[];
  datasets: ChartDataset[];
}
