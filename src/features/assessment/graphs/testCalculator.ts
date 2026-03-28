import getSurvey from '../surveys/totalsurvey';

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
  overallScore: number;
  responseCount: ResponseCount;
  businessFunctionNames: string[];
  practiceNames: string[];
  businessFunctionScores: number[];
  practiceScores: number[];

  constructor(answerValues: AnswerMap) {
    this.answerValues = answerValues;
    this.overallScore = 0;
    this.responseCount = { 'No': 0, 'Yes, for some': 0, 'Yes, for most': 0, 'Yes, for all': 0 };
    this.businessFunctionNames = [];
    this.practiceNames = [];
    this.businessFunctionScores = [];
    this.practiceScores = [];

    const dynamicModel: SAMMModel = {};
    const surveyData = getSurvey();

    surveyData.pages.forEach((page: any) => {
      const bussFunc = page.name || page.title;
      this.businessFunctionNames.push(bussFunc);
      const practices: Record<string, PracticeData> = {};
      
      if (page.elements) {
        page.elements.forEach((panel: any) => {
          const practiceName = panel.title || panel.name;
          const answerMap = new Map<string, number | null>();
          
          if (panel.elements) {
            panel.elements.forEach((q: any) => {
               answerMap.set(q.name, (this.answerValues && this.answerValues[q.name] !== undefined) ? this.answerValues[q.name] : null);
            });
          }
          
          practices[practiceName] = { answers: answerMap, score: 0 };
        });
      }
      
      dynamicModel[bussFunc] = { totalScore: 0, practices };
    });

    this.sammModel = dynamicModel;
  }

  isPracticeCompleted(values: (number | null)[]): boolean {
    return !values.some(el => el == null);
  }

  sortResponseCount(values: (number | null)[]): void {
    for (let i = 0; i < values.length; i++) {
        const val = Number(values[i]);
        if (val === 0)    this.responseCount['No']++;
        if (val === 0.25) this.responseCount['Yes, for some']++;
        if (val === 0.5)  this.responseCount['Yes, for most']++;
        if (val === 1)    this.responseCount['Yes, for all']++;
    }
  }

  computeResults(): void {
    let totalScoreSum = 0;
    
    for (const bussFunc in this.sammModel) {
      let bussFuncTotalScore = 0;
      const practices = this.sammModel[bussFunc].practices;
      const practiceKeys = Object.keys(practices);
      
      for (const practice of practiceKeys) {
        this.practiceNames.push(practice);
        const answers = practices[practice].answers;
        const question_values = Array.from(answers.values()) as (number | null)[];
        
        if (this.isPracticeCompleted(question_values) && question_values.length > 0) {
          this.sortResponseCount(question_values);
          const vals = question_values as number[];
          
          // AISVS Calculation: Average answer (0.0 - 1.0) scaled up to Max 3.0
          const sum = vals.reduce((acc, v) => acc + v, 0);
          const avg = sum / vals.length;
          const score = avg * 3.0;
          
          practices[practice].score = score;
          bussFuncTotalScore += score;
          this.practiceScores.push(score);
        } else {
          this.practiceScores.push(0);
        }
      }

      const numPractices = practiceKeys.length > 0 ? practiceKeys.length : 1;
      const avgBussFuncScore = bussFuncTotalScore / numPractices;
      
      this.sammModel[bussFunc].totalScore = avgBussFuncScore;
      this.businessFunctionScores.push(avgBussFuncScore);
      totalScoreSum += avgBussFuncScore;
    }

    const numBfs = this.businessFunctionNames.length > 0 ? this.businessFunctionNames.length : 1;
    this.overallScore = totalScoreSum / numBfs;
  }
}
