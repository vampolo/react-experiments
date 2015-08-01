import d3 from 'd3';
import React, {Component} from 'react';

/**
 * Generate a value list for simulate the sysdig spectrogram
 * 
 * For get real data, use:
 *     filter: evt.dir=<
 *     field: evt.latency
 *
 * Create a spectogram with different time frequencies 
 */
function generateValueList() {
    function randNum(start, stop){
        return start + Math.floor(Math.random() * (stop - start + 1));
    }

    return [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      randNum(3,5), randNum(3,5), 4, randNum(4,7), randNum(4,8), randNum(5,7), randNum(7,9), randNum(8,10), randNum(9,10), randNum(9,10),
      randNum(9,10), 10, 10, randNum(9,10), randNum(8,9), randNum(9,10), randNum(9,10), 7, randNum(6,7), randNum(5,7),
      randNum(4,5), randNum(4,5), randNum(7,8), randNum(7,8), randNum(4,5), randNum(4,5), 7, randNum(4,5), randNum(4,5), randNum(4,5),
      randNum(4,5), randNum(3,5), randNum(3,5), randNum(3,4), randNum(3,4), randNum(2,4), randNum(2,4), randNum(2,3), randNum(2,3), randNum(1,3),
      randNum(1,3), randNum(1,3), randNum(1,2), randNum(1,2), randNum(0,2), randNum(0,2), randNum(0,2), randNum(0,2), randNum(0,2), randNum(0,2),
      randNum(0,2), randNum(0,2), randNum(0,2), randNum(0,2), randNum(0,2), randNum(0,1), randNum(0,1), randNum(0,1), randNum(0,1), randNum(1,2),
      randNum(0,1), randNum(0,1), randNum(0,1), randNum(0,1), randNum(0,1), randNum(0,1), 1, randNum(0,1), randNum(0,1), 1,
      0, randNum(0,1), randNum(0,1), 0, 0, randNum(0,1), randNum(0,1), 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
}

class D3HMap {
    constructor(el, width, height, margin, itemSize, colorCalibration) {
        this.el = el;
        this.width = width;
        this.height = height;
        this.margin = margin;
        this.itemSize = itemSize;
        this.colorCalibration = colorCalibration;

        this.cellSize = this.itemSize - 1;
        this.itemWidth = this.itemSize / 3;
        this.cellWidth = this.cellSize / 3;
        
        this.rect = null;
        this.data = [];
        this.rowsCount = 0;
        this.rowLimit = 20;
        this.initialization();
    }

    initialization() {
        //axises and scales
        this.yBase = 0;
        this.axisWidth = this.itemWidth * this.getDataInfo().points;
        this.axisHeight = this.itemSize * 20; //data.length;
        this.xAxisScale = d3.scale.ordinal()
            .domain(this.getDataInfo().values.concat([''])) //attaching another value because of wanting other elements after the last element
            .rangePoints([0, this.axisWidth]);
        this.xAxis = d3.svg.axis()
            .scale(this.xAxisScale)
            .orient('top')
            .ticks(this.getDataInfo().values);
        this.yAxisScale = d3.scale.linear()
            .range([0, this.axisHeight])
            .domain([this.yBase, this.yBase + 20]);
        this.yAxis = d3.svg.axis()
            .orient('left')
            .scale(this.yAxisScale);

        // Spectrogram initialization
        this.svg = d3.select(this.el);
        this.spectrogram = this.svg
            .attr('width', this.width)
            .attr('height', this.height)
        .append('g')
            .attr('width', this.width - this.margin.left - this.margin.right)
            .attr('height', this.height - this.margin.top - this.margin.bottom)
            .attr('transform','translate(' + this.margin.left + ',' + this.margin.top + ')');
        this.renderAxis();
    }

    getDataInfo() {
        let list = ['1ns', '10ns', '100ns', '1us', '10us', '100us', '1ms', '10ms', '100ms', '1s', '10s'];
        return { values: list, points: list.length * 10 };
    }

    renderColor() {
        var that = this;
        this.rect.transition()
            .delay(function(d) {      
                return d.y*10;
            })
            .duration(100)
            .attrTween('fill', function(d, i, a) {
                //choose color dynamicly      
                var colorIndex = d3.scale.quantize()
                    .range([0,1,2,3,4,5,6,7,8,9,10])
                    .domain([0,10]); //IMPORTANT: the domain of the data

                return d3.interpolate(a, that.colorCalibration[colorIndex(d.v)]);
            });
    }

    renderAxis() {
        this.svg.append('g')
            .attr('transform','translate(' + this.margin.left + ',' + this.margin.top + ')')
            .attr('class','x axis')
            .call(this.xAxis)

        this.svg.append('g')
            .attr('transform','translate(' + this.margin.left + ',' + this.margin.top + ')')
            .attr('class','y axis')
            .call(this.yAxis)
        .append('text')
            .text('seconds')
            .attr('transform','translate(-10,' + (this.axisHeight + 60) + ') rotate(-90)');
    }

    loadNewData() {
        var that = this;
        let newRow = generateValueList();
        newRow.forEach(function(e, i) {
            that.data.push({
                x: i,
                y: that.rowsCount,
                v: e
            });
        });
        this.rowsCount++;

        //let's keep only rowLimit rows in the data array - cleaning the exceeding row here
        if(this.data[this.data.length-1].y - this.data[0].y > this.rowLimit)
        {
            this.data.splice(0, this.data.length / (this.rowLimit + 2)); //cutting away from the array the first row
            this.rowsCount--;
            this.yBase++;
            this.data.forEach(function(e) {
                e.y--;
            });
        }

        //render spectrogram rects
        this.rect = this.spectrogram.selectAll('rect')
            .data(this.data);

        this.rect.exit()
            .remove();

        this.rect.enter()
            .append('rect')
            .attr('width', this.cellWidth)
            .attr('height', this.cellSize)
            .attr('x',function(d) {
                return that.itemWidth * d.x;
            })
            .attr('y',function(d) {            
                return that.itemSize * d.y;
            })
            .attr('fill','#ddd');

        this.rect.filter(function(d) { return d.v > 0; })
            .append('title')
            .text(function(d) {
                return d.v;
            });

        this.yAxisScale = d3.scale.linear()
            .range([0, this.axisHeight])
            .domain([this.yBase, this.yBase + 20]);

        this.yAxis = d3.svg.axis()
            .orient('left')
            .scale(this.yAxisScale);

        //update axis
        this.svg.selectAll('g.y.axis')
            .call(this.yAxis);

        this.renderColor();
    }
}

export default class HeatMap extends Component {
    componentDidMount() {
        let el = React.findDOMNode(this.refs.spectrogram);
        //UI configuration
        let itemSize = 20;
        let width = 800;
        let height = 800;
        let margin = {top:20,right:20,bottom:20,left:50};
        let colorCalibration = ['#ddd','#00b60c','#6dd100','#a9dc00','#e3e600','#e7cd00','#e7b400','#e79b00','#e77e00','#e75300','#e70600']; //#00b60c '#6dd100'

        this.map = new D3HMap(el, width, height, margin, itemSize, colorCalibration);
        this.timer = setInterval(this.tick.bind(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        this.map.loadNewData();
    }

    render() {
        return (
            <div className="spectrogram-wrapper">
                <svg ref="spectrogram" role="spectrogram" className="spectrogram"></svg>
            </div>
        );
    }
}