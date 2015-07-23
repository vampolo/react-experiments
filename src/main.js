var React = require('react');
var DataGrid = require('react-datagrid');
var data = require('../../sysdig.json');
import HelloWorld from './test';


// var data = [
//     {id: 1, title: 'test'},
//     {id: 2, title: 'test2'}
// ];

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
	    dataSource={data.events}
	    columns={columns}
	    style={{height: 1000}}/>
                <div>total number of events: {data.events.length}</div>
                </div>
        );
    }
});


React.render(
     <SysdigTable/>,
    document.getElementById('content-table')
);


// React.render(
//         <HelloWorld/>,
//     document.getElementById('hello-world')
// );
