import _ from 'underscore';
import React, {Component} from 'react';

import HeadCell from './headCell.jsx';

class HeadRow extends Component {
    render() {
        var data = this.props.row;
        var fields = _.map(data, (col, index) => {
            return <HeadCell 
                    sortBy={this.props.sortBy}
                    onHeadersCellClick={this.props.onHeadersCellClick}
                    column={col} key={index} />;
        });

        return (
            <tr className="tr">{fields}</tr>
        );
    }
}

export default HeadRow;