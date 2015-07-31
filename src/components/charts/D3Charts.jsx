import React, {Component} from 'react';
import rd3 from 'react-d3';

class SysdigChartD3 extends Component { };

export class Treemap extends SysdigChartD3 {
    render() {
        return (
            <rd3.Treemap
                data={this.props.data}
                width={600}
                height={400}
                textColor="#484848"
                fontSize="10px"
                title={this.props.name || "Treemap"}/>
        );
    }
}

export class BarChart extends SysdigChartD3 {
    render() {
        return (
            <rd3.BarChart
                data={this.props.data}
                width={600}
                height={400}
                fill={"#3182bd"}
                title={this.props.name || "Bar Chart"}/>
        );
    }
}

export class PieChart extends SysdigChartD3 {
    render() {
        return (
            <rd3.PieChart
                data={this.props.data}
                width={400}
                height={400}
                radius={100}
                innerRadius={20}
                title={this.props.name || "Pie Chart"}/>
        );
    }
}

export class ScatterChart extends SysdigChartD3 {
    render() {
        return (
            <rd3.ScatterChart
                data={this.props.data}
                width={500}
                height={400}
                yHideOrigin={true}
                title={this.props.name || "Scatter Chart"}/>
        );
    }
}

export class LineChart extends SysdigChartD3 {
    render() {
        return (
            <rd3.LineChart
                legend={true}
                data={this.props.data}
                width={500}
                height={300}
                title={this.props.name || "Line Chart"}/>
        );
    }
}