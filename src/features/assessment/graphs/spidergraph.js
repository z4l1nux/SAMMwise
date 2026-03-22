export default class SpiderGraph{
    constructor(){
        this.metaData = {
            labels:[],
            datasets:[
                {
                    label: 'Current Assessment',
                    backgroundColor: 'rgba(255, 24, 0, 0.2)',
                    borderColor: 'rgba(255, 99, 132)',
                    pointBackgroundColor: 'rgba(255, 99, 132, 0.2)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255, 99, 132, 0.2)',
                    data: []
                },
                {
                    label: 'Previous Assessment',
                    backgroundColor: 'rgba(179,181,198,0.2)',
                    borderColor: 'rgba(179,181,198,1)',
                    pointBackgroundColor: 'rgba(179,181,198,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    data: []
                }
            ]

        }
        this.layout_props = {
            scales: {
                r: {
                    suggestedMin: 0,
                    suggestedMax: 3,
                    grid: { color: 'rgba(255, 255, 255, 0.15)' },
                    angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
                    ticks: {
                        color: '#94a3b8',
                        backdropColor: 'transparent',
                        font: { size: 11 }
                    },
                    pointLabels: {
                        color: '#e2e8f0',
                        font: { size: 12 }
                    },
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: "Score for each",
                    color: '#e2e8f0',
                    padding: { top: 10, bottom: 30 }
                },
                legend: {
                    labels: { color: '#e2e8f0' }
                }
            }
        }

    }

    set_title_text(text){
        this.layout_props.plugins.title.text = text
    }

    setDatasetLabels(currentLabel, previousLabel){
        this.metaData.datasets[0].label = currentLabel;
        this.metaData.datasets[1].label = previousLabel;
    }

    reset_data(){
        this.metaData.datasets[0].data = [];
        this.metaData.datasets[1].data = [];
    }
}
