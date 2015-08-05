import _ from 'underscore';
import React, {Component} from 'react';

import Column from './column.jsx';
import TBody from './tbody.jsx';
import THead from './thead.jsx';
import NoDataTable from './noDataTable.jsx';

class Table extends Component {
    constructor(props) {
        super(props);

        var sortBy = null;
        if (props.initialSort) {
            sortBy = _.where(this.props.columns, { name: props.initialSort })[0];
        }

        this.state = {
            sortBy: sortBy
        };
    }

    sortTable(column) {    
        this.setState({ sortBy: column });
    }

    tableContent() {
        var content = this.props.data;
        var filter = this.props.filter;

        return _.filter(content, (row, index) => {

            for (let key in row) {
                if ((row[key] || '').toString().toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
                    return row;
                }
            }
        });
    }

    getDataForRender(data) {
        var sortBy = this.state.sortBy;
        var columns = this.props.columns;

        if (sortBy || this.props.initialSort) {
            data = _.sortBy(data, sortBy.name);

            if (sortBy.sortAsc === false) {
                data.reverse();
            }

            sortBy.toggleSort();
        }

        return data;
    }

    render() {
        var data = this.getDataForRender(this.tableContent());
        var tableClassName = this.props.className || 'dt';
        
        return (
            <div className={tableClassName}>
                <THead 
                    sortBy={this.state.sortBy}
                    onHeadersCellClick={this.sortTable.bind(this)} 
                    columns={this.props.columns} />
                <TBody {...this.props} {...this.state} 
                    rows={data} />
            </div>
        );
    }
}

Table.Column = Column;

export default Table;