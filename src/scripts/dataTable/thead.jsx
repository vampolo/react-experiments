import _ from 'underscore';
import React, {Component} from 'react';

import HeadRow from './headRow.jsx';

class THead extends Component {
    render() {
        var headStyle = null;

        headStyle = {
            'width': 'calc(100% - 15px)',
            'tableLayout': 'fixed'
        };

        return (
            <table style={headStyle}>
                <thead className="thead">
                    <HeadRow {...this.props} row={this.props.columns} />
                </thead>
            </table>
        );
    }
}

export default THead;