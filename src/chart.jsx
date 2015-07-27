var React = require('react');
var rd3 = require('react-d3');

var Chart = rd3;
var SysdigChart = {};

// Main class for common definitions
class SysdigChartD3 extends React.Component {};

class Treemap extends SysdigChartD3 {
    render() {
        return (
            <Chart.Treemap
              data={this.props.data}
              width={600}
              height={400}
              textColor="#484848"
              fontSize="10px"
              title={this.props.name || "Treemap"}/>
        );
    }
}

class BarChart extends SysdigChartD3 {
    render() {
        return (
            <BarChart
              data={this.props.data}
              width={500}
              height={200}
              fill={"#3182bd"}
              title={this.props.name || "Bar Chart"}/>
        );
    }
}

class PieChart extends SysdigChartD3 {
    render() {
        return (
            <PieChart
                data={this.props.data}
                width={400}
                height={400}
                radius={100}
                innerRadius={20}
                title={this.props.name || "Pie Chart"}/>
        );
    }
}


SysdigChart.Treemap = Treemap;
SysdigChart.BarChart = BarChart;
SysdigChart.PieChart = PieChart;

export default SysdigChart;