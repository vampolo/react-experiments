import _ from 'underscore';
import React, {Component} from 'react';

class NoDataTable extends Component {
    render() {
        return (
            <tr className="tr">
                <td className="td no-content">{this.props.message}</td>
            </tr>
        );
    }
}

NoDataTable.defaultProps = {
    message: 'No content to display'
};

export default NoDataTable;