// class for adding datasets into the bar graphs
// this can be used to make additional features such as a line graph for
// roadmap usage

interface DatasetMetaData {
  label: string;
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  data: number[];
}

export default class Dataset {
  metaData: DatasetMetaData;

  constructor(label?: string) {
    this.metaData = {
      label: label || 'Previous Dataset',
      backgroundColor: 'rgba(179,181,198,0.5)',
      borderColor: 'rgba(179,181,198)',
      borderWidth: 2,
      data: [],
    };
  }
}
