var React = require('react');
var _ = require('underscore');
var DataGrid = require('react-datagrid');
var data = require('../data/sysdig.json');

import HelloWorld from './test';
import Table from './table.jsx';
import Chart from './chart.jsx';

var Treemap = Chart.Treemap;
var BarChart = Chart.BarChart;

var columns = [
    {name: 'evt.cpu'},
    {name: 'evt.dir'},
    {name: 'evt.info'},
    {name: 'evt.num'},
    {name: 'evt.reltime'},
    {name: 'evt.type'},
    {name: 'fd.num'},
    {name: 'proc.name'},
    {name: 'proc.pid'},
    {name: 'thread.pid'}
];

function createDataObj(event) {
    return { label: event[0], value: event[1] };
}

var parsedData = _.chain(data.events).countBy('proc.name').pairs().map(createDataObj).value();

var SysdigTable = React.createClass({
    render: function() {
        return (
                <div className="sysdigtable">
                <DataGrid
	    idProperty='id'
	    dataSource={data.events}
	    columns={columns}
	    style={{height: 500}}/>
                <div>total number of events: {data.events.length}</div>
                </div>
        );
    }
});

var SysdigTreemap = React.createClass({
    render: function() {
        return (
            <Treemap
              data={parsedData}
              width={850}
              height={650}
              textColor="#484848"
              fontSize="10px"
              title="Process name"/>
        );
    }
});


React.render(
     <SysdigTable/>,
    document.getElementById('content-table')
);

React.render(
    <SysdigTreemap/>,
    document.getElementById('treemap-chart')
);

React.render(
    <Table
        results={data.events}
        showFilter={true}
        showSettings={true}
        enableInfiniteScroll={true}
        useFixedHeader={true}
        bodyHeight={400}/>,
    document.getElementById('griddle-table')
);