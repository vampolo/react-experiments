var DataGrid = require('react-datagrid');
import React, {Component} from 'react';

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

export default class DataTable extends Component {
    render() {
        return (
            <div className="sysdigtable">
            <DataGrid
                idProperty='id'
                dataSource={this.props.data}
                columns={columns}
                style={{height: 500}}/>
            <div>total number of events: {this.props.data.length}</div>
            </div>
        );
    }
}