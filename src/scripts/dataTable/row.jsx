import _ from 'underscore';
import React, {Component} from 'react';

import Cell from './cell.jsx';

class Row extends Component {
    render() {
        var data = this.props.row;
        var cols = this.props.columns;
        var fields = _.map(cols, (col, index) => {
            var content = data[col.name];
            return <Cell
                        rowHeight={this.props.rowHeight}
                        onRowClick={this.props.onRowClick}
                        column={col}
                        content={content} key={index} />;
        });
        var rowStyle = {
            'backgroundColor': this.props.bcolor || '#FFFFFF'
        };

        return (
            <tr className="tr" style={rowStyle}>{fields}</tr>
        );
    }
}

export default Row;