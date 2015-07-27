var React = require('react');
var DataGrid = require('react-datagrid');

import Table from './table.jsx';
import SysdigChart from './chart.jsx';
import SysdigData from './data.jsx';

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

var SysdigTable = React.createClass({
    render: function() {
        return (
                <div className="sysdigtable">
                <DataGrid
            	    idProperty='id'
            	    dataSource={SysdigData.events}
            	    columns={columns}
            	    style={{height: 500}}/>
                <div>total number of events: {SysdigData.events.length}</div>
                </div>
        );
    }
});


React.render(
     <SysdigTable/>,
    document.getElementById('content-table')
);

React.render(
    <SysdigChart.Treemap data={SysdigData.name}/>,
    document.getElementById('treemap-chart')
);

React.render(
    <Table
        results={SysdigData.events}
        showFilter={true}
        showSettings={true}
        enableInfiniteScroll={true}
        useFixedHeader={true}
        bodyHeight={400}/>,
    document.getElementById('griddle-table')
);