import _ from 'underscore';
import React, {Component} from 'react';

class HeadCell extends Component {
    handleCLick() {
        this.props.onHeadersCellClick(this.props.column);
    }

    getSortIcon() {
        var sortBy = this.props.sortBy;
        var column = this.props.column;

        if (column === sortBy) {
            return column.sortAsc ? <i className="fa fa-sort-asc"></i> : 
                <i className="fa fa-sort-desc"></i>;
        } else {
            return <i className="fa fa-sort"></i>;
        }
    }

    render() {
        var content = this.props.column.name;
        var sortIcon = this.getSortIcon();

        return (
            <th className="th" onClick={this.handleCLick.bind(this)}>
                <div>
                    <span>{content}</span>
                    {sortIcon}
                </div>
            </th>
        );
    }
}

export default HeadCell;