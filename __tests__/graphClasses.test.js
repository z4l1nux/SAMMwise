import SpiderGraph from '../src/features/assessment/graphs/spidergraph'
import DonutGraph from '../src/features/assessment/graphs/donutgraph'
import Bargraph from '../src/features/assessment/graphs/bargraph'
import Dataset from '../src/features/assessment/graphs/datasetprops'

describe('SpiderGraph', () => {
  it('has two datasets by default (current and previous)', () => {
    const g = new SpiderGraph()
    expect(g.metaData.datasets).toHaveLength(2)
  })

  it('default dataset labels are English', () => {
    const g = new SpiderGraph()
    expect(g.metaData.datasets[0].label).toBe('Current Assessment')
    expect(g.metaData.datasets[1].label).toBe('Previous Assessment')
  })

  it('setDatasetLabels updates both dataset labels', () => {
    const g = new SpiderGraph()
    g.setDatasetLabels('Avaliação Atual', 'Avaliação Anterior')
    expect(g.metaData.datasets[0].label).toBe('Avaliação Atual')
    expect(g.metaData.datasets[1].label).toBe('Avaliação Anterior')
  })

  it('set_title_text updates the chart title', () => {
    const g = new SpiderGraph()
    g.set_title_text('Pontuação por Função de Negócio')
    expect(g.layout_props.plugins.title.text).toBe('Pontuação por Função de Negócio')
  })

  it('reset_data clears both dataset arrays', () => {
    const g = new SpiderGraph()
    g.metaData.datasets[0].data = [1, 2, 3]
    g.metaData.datasets[1].data = [4, 5, 6]
    g.reset_data()
    expect(g.metaData.datasets[0].data).toEqual([])
    expect(g.metaData.datasets[1].data).toEqual([])
  })
})

describe('DonutGraph', () => {
  it('has default English labels', () => {
    const g = new DonutGraph()
    expect(g.metaData.labels).toEqual(['Bad', 'Less than ideal', 'Okay', 'Good'])
  })

  it('setLabels replaces the labels array', () => {
    const g = new DonutGraph()
    g.setLabels(['Ruim', 'Abaixo do ideal', 'Razoável', 'Bom'])
    expect(g.metaData.labels).toEqual(['Ruim', 'Abaixo do ideal', 'Razoável', 'Bom'])
  })

  it('update_properties_dataset pushes data to first dataset', () => {
    const g = new DonutGraph()
    g.buss_func_data = [5, 3, 8, 2]
    g.update_properties_dataset(0)
    expect(g.metaData.datasets[0].data).toContain(5)
  })
})

describe('Bargraph', () => {
  it('default dataset label is "Current Assessment"', () => {
    const g = new Bargraph()
    expect(g.metaData.datasets[0].label).toBe('Current Assessment')
  })

  it('setDatasetLabel updates the label', () => {
    const g = new Bargraph()
    g.setDatasetLabel('Avaliação Atual')
    expect(g.metaData.datasets[0].label).toBe('Avaliação Atual')
  })

  it('set_labels appends to existing labels', () => {
    const g = new Bargraph()
    g.set_labels(['A', 'B'])
    g.set_labels(['C'])
    expect(g.metaData.labels).toEqual(['A', 'B', 'C'])
  })

  it('set_aspect_ratio updates the layout ratio', () => {
    const g = new Bargraph()
    g.set_aspect_ratio(2)
    expect(g.layout_props.aspectRatio).toBe(2)
  })

  it('resetData clears the first dataset', () => {
    const g = new Bargraph()
    g.metaData.datasets[0].data = [10, 20]
    g.resetData()
    expect(g.metaData.datasets[0].data).toEqual([])
  })
})

describe('Dataset', () => {
  it('uses default label when no argument given', () => {
    const d = new Dataset()
    expect(d.metaData.label).toBe('Previous Dataset')
  })

  it('accepts a custom label', () => {
    const d = new Dataset('Conjunto de Dados Anterior')
    expect(d.metaData.label).toBe('Conjunto de Dados Anterior')
  })

  it('initialises with empty data array', () => {
    const d = new Dataset('test')
    expect(d.metaData.data).toEqual([])
  })
})
