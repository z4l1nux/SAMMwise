import InputFile from '../components/inputfile';
import { Radar, Doughnut, Bar } from 'react-chartjs-2';
import { Flex, Box } from './layout/index';
import React from 'react';

interface ComponentToPrintProps {
  completionText?: string;
  projectName?: string;
  projectDesc?: string;
  finalScore?: number;
  percentageScore?: number;
  graphObjects?: Record<string, any>;
}

class ComponentToPrint extends React.PureComponent<ComponentToPrintProps> {
    constructor(props: ComponentToPrintProps) {
        super(props);
    }

    render() {
        return (
            <>
                <div></div>
                <div id="totalsDiv">
                    <Flex flexWrap="wrap">
                        <Box width={[1]} p={3} id="box1">
                            <Bar data={this.props.graphObjects?.['totalsbar']?.metaData} options={this.props.graphObjects?.['totalsbar']?.layout_props} className="totalsBar" />
                        </Box>
                    </Flex>
                </div>
                <div>
                    <Flex flexWrap="wrap">
                        <Box width={[1, 1/2]} p={3} className="bussFuncRadarBox">
                            <Radar data={this.props.graphObjects?.['bussFuncRadar']?.metaData} options={this.props.graphObjects?.['bussFuncRadar']?.layout_props} />
                        </Box>
                        <Box width={[1, 1/2]} p={3} className="bussFuncBarBpx">
                            <Bar data={this.props.graphObjects?.['bussFuncBar']?.metaData} options={this.props.graphObjects?.['bussFuncBar']?.layout_props} className="bussFuncBarGraph" />
                        </Box>
                    </Flex>
                </div>
                <div className="practices">
                    <Flex flexWrap="wrap">
                        <Box width={[1, 1/2]} p={3} className="practiceRadarBox">
                            <Radar data={this.props.graphObjects?.['practiceRadar']?.metaData} options={this.props.graphObjects?.['practiceRadar']?.layout_props} />
                        </Box>
                        <Box width={[1, 1/2]} p={3} className="practicesBarBox">
                            <Bar data={this.props.graphObjects?.['practiceBar']?.metaData} options={this.props.graphObjects?.['practiceBar']?.layout_props} />
                        </Box>
                    </Flex>
                </div>
            </>
        );
    }
}

export default ComponentToPrint;
