interface AnswerMap {
  [key: string]: number | null;
}

interface PracticeData {
  answers: Map<string, number | null>;
  score: number;
}

interface BusinessFunction {
  totalScore: number;
  practices: Record<string, PracticeData>;
}

interface SAMMModel {
  [bussFunc: string]: BusinessFunction;
}

interface ResponseCount {
  [key: string]: number;
  'No': number;
  'Yes, for some': number;
  'Yes, for most': number;
  'Yes, for all': number;
}

export default class assessmentCalculator {
  answerValues: AnswerMap;
  sammModel: SAMMModel;
  overallScore: number | null;
  responseCount: ResponseCount;
  businessFunctionNames: string[];
  practiceNames: string[];
  businessFunctionScores: number[];
  practiceScores: number[];

  constructor(answerValues: AnswerMap) {
    this.answerValues = answerValues;
    this.sammModel = {
      'Governance': {
        totalScore: 0,
        practices: {
          'Strategy and Metrics':  { answers: this.getAnswerMap(1),  score: 0 },
          'Policy and Compliance': { answers: this.getAnswerMap(7),  score: 0 },
          'Education and Guidance':{ answers: this.getAnswerMap(13), score: 0 },
        },
      },
      'Design': {
        totalScore: 0,
        practices: {
          'Threat Assessment':    { answers: this.getAnswerMap(19), score: 0 },
          'Security Requirements':{ answers: this.getAnswerMap(25), score: 0 },
          'Security Architecture':{ answers: this.getAnswerMap(31), score: 0 },
        },
      },
      'Implementation': {
        totalScore: 0,
        practices: {
          'Secure Build':      { answers: this.getAnswerMap(37), score: 0 },
          'Secure Deployment': { answers: this.getAnswerMap(43), score: 0 },
          'Defect Management': { answers: this.getAnswerMap(49), score: 0 },
        },
      },
      'Verification': {
        totalScore: 0,
        practices: {
          'Architecture Assessment': { answers: this.getAnswerMap(55), score: 0 },
          'Requirements Testing':    { answers: this.getAnswerMap(61), score: 0 },
          'Security Testing':        { answers: this.getAnswerMap(67), score: 0 },
        },
      },
      'Operations': {
        totalScore: 0,
        practices: {
          'Incident Management':    { answers: this.getAnswerMap(73), score: 0 },
          'Environment Management': { answers: this.getAnswerMap(79), score: 0 },
          'Operations Management':  { answers: this.getAnswerMap(85), score: 0 },
        },
      },
    };
    this.overallScore = null;
    this.responseCount = { 'No': 0, 'Yes, for some': 0, 'Yes, for most': 0, 'Yes, for all': 0 };
    this.businessFunctionNames = ['Governance', 'Design', 'Implementation', 'Verification', 'Operations'];
    this.practiceNames = [];
    this.businessFunctionScores = [];
    this.practiceScores = [];
  }

  getAnswerMap(start: number): Map<string, number | null> {
    const answerMap = new Map<string, number | null>();
    for (let i = start; i < start + 6; i++) {
      const key = 'question' + i;
      answerMap.set(key, this.answerValues[key]);
    }
    return answerMap;
  }

  isPracticeCompleted(values: (number | null)[]): boolean {
    return !values.some(el => el == null);
  }

  sortResponseCount(values: (number | null)[]): void {
    for (let i = 0; i < values.length; i++) {
      if (values[i] === 0)    this.responseCount['No']++;
      if (values[i] === 0.25) this.responseCount['Yes, for some']++;
      if (values[i] === 0.5)  this.responseCount['Yes, for most']++;
      if (values[i] === 1)    this.responseCount['Yes, for all']++;
    }
  }

  computeResults(): void {
    for (const bussFunc in this.sammModel) {
      for (const practice in this.sammModel[bussFunc]['practices']) {
        this.practiceNames.push(practice);
        const answers = this.sammModel[bussFunc]['practices'][practice]['answers'];
        const question_values = Array.from(answers.values()) as (number | null)[];
        if (this.isPracticeCompleted(question_values)) {
          this.sortResponseCount(question_values);
          const vals = question_values as number[];
          const lvl1 = (vals[0] + vals[3]) / 2;
          const lvl2 = (vals[1] + vals[4]) / 2;
          const lvl3 = (vals[2] + vals[5]) / 2;
          const score = lvl1 + lvl2 + lvl3;
          if (bussFunc === 'Implementation') {
            console.log('practice', practice, 'score', score);
          }
          this.sammModel[bussFunc]['practices'][practice]['score'] = score;
          this.sammModel[bussFunc]['totalScore'] += score / 3;
          this.practiceScores.push(score);
        } else {
          this.practiceScores.push(0);
        }
      }
      this.businessFunctionScores.push(this.sammModel[bussFunc]['totalScore']);
      this.overallScore = (this.overallScore ?? 0) + this.sammModel[bussFunc]['totalScore'] / 5;
    }
  }
}
