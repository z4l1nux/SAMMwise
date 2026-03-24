interface DonutDataset {
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
}

interface DonutMetaData {
  labels: string[];
  datasets: DonutDataset[];
}

export default class DonutGraph {
  metaData: DonutMetaData;
  options: Record<string, any>;
  buss_func_data: number[];

  constructor() {
    this.metaData = {
      labels: ['Bad', 'Less than ideal', 'Okay', 'Good'],
      datasets: [
        {
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
        },
        {
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132)',
            'rgba(255, 159, 64)',
            'rgba(255, 205, 86)',
            'rgba(75, 192, 192)',
            'rgba(54, 162, 235)',
            'rgba(153, 102, 255)',
            'rgba(201, 203, 207)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
        },
      ],
    };
    this.options = {};
    this.buss_func_data = [0, 0, 0, 0];
  }

  setLabels(labels: string[]): void {
    this.metaData.labels = labels;
  }

  set_buss_func_scores(data_in: any, i: number, j: number): void {
    // Dynamic import avoided here; caller passes surveyCalculatorJSON result
    for (let g = 0; g < 5; g++) {
      const answer = data_in.Pages[i].panels[j].answers[g];
      if (answer === 0)    this.buss_func_data[0]++;
      if (answer === 0.25) this.buss_func_data[1]++;
      if (answer === 0.5)  this.buss_func_data[2]++;
      if (answer === 1)    this.buss_func_data[3]++;
    }
  }

  update_properties_dataset(index: number): void {
    this.metaData.datasets[0].data.push(this.buss_func_data[index]);
  }
}
