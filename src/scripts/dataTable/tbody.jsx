import _ from 'underscore';
import React, {Component} from 'react';

import Row from './row.jsx';

class TBody extends Component {
    noDataTable(containerStyle, tableStyle) {
        return (
            <div className="table-container" style={containerStyle}>
                <table style={tableStyle}>
                    <tbody className="tbody">
                        <NoDataTable message={this.props.noDataMessage}/>
                    </tbody>
                </table>
            </div>
        );
    }

    rowsList() {
        var content = this.props.rows;
        
        return _.map(content, (row, index) => {
            return <Row {...this.props} row={row} key={index} />;
        });
    }

    render() {
        var containerStyle, tableStyle;
        var rowsList = this.rowsList();

        tableStyle = {
            'width':        '100%',
            'tableLayout':  'fixed'
        };

        containerStyle = {
            'position':     'relative', 
            'overflowY':    'auto',
            'height':       this.props.height + 'px',
            'width':        '100%'
        };

        if (_.isEmpty(rowsList)) {
            return this.noDataTable(containerStyle, tableStyle);
        }

        return (
            <div className="table-container" style={containerStyle}>
                <table style={tableStyle}>
                    <tbody className="tbody">{rowsList}</tbody>
                </table>
            </div>
        );
    }
}

TBody.defaultProps = {
    height: 400
};

export default TBody;