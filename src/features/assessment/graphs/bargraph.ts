interface BarDataset {
  label: string;
  backgroundColor: string | string[];
  borderColor: string | string[];
  borderWidth: number;
  data: number[];
}

interface BarMetaData {
  labels: string[];
  datasets: BarDataset[];
}

interface BarLayoutProps {
  indexAxis: 'x' | 'y';
  aspectRatio: number;
  responsive: boolean;
  maintainAspectRatio: boolean;
  scales: {
    x: { grid: { color: string }; ticks: { color: string } };
    y: { grid: { color: string }; ticks: { color: string } };
  };
  plugins: {
    legend: { labels: { color: string } };
    title: { color: string };
  };
}

export default class Bargraph {
  metaData: BarMetaData;
  layout_props: BarLayoutProps;

  constructor() {
    this.metaData = {
      labels: [],
      datasets: [{
        label: 'Current Assessment',
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(255, 205, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(201, 203, 207, 0.7)',
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
        borderWidth: 1,
        data: [],
      }],
    };

    this.layout_props = {
      indexAxis: 'y',
      aspectRatio: NaN,
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          ticks: { color: '#94a3b8' },
        },
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          ticks: { color: '#e2e8f0' },
        },
      },
      plugins: {
        legend: { labels: { color: '#e2e8f0' } },
        title: { color: '#e2e8f0' },
      },
    };
  }

  set_aspect_ratio(ratio: number): void {
    this.layout_props.aspectRatio = ratio;
  }

  setDatasetLabel(label: string): void {
    this.metaData.datasets[0].label = label;
  }

  set_labels(label_array: string[]): void {
    this.metaData.labels = this.metaData.labels.concat(label_array);
  }

  resetData(): void {
    this.metaData.datasets[0].data = [];
    if (this.metaData.datasets.length > 1) {
      this.metaData.datasets[1].data = [];
    }
  }
}
