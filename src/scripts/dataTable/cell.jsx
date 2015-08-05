import _ from 'underscore';
import React, {Component} from 'react';

class Cell extends Component {
    handleClick(e) {
        if (_.isFunction(this.props.onRowClick)) {
            this.props.onRowClick(this, e);
        } else if (this.props.hasChildren) {
            this.props.toggleChildren();
        }
    }

    render() {
        var content = this.props.content;
        var cellStyle = null;

        cellStyle = {
            'lineHeight': this.props.rowHeight + 'px'
        };

        return (
            <td className="td" style={cellStyle} 
                onClick={this.handleClick.bind(this)}>
                <span>{content}</span>
            </td>
        );
    }
}

Cell.defaultProps = {
    rowHeight:  30,
    onRowClick: null
};

export default Cell;