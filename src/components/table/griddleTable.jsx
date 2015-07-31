var Griddle = require('griddle-react');

import React, {Component} from 'react';

export default class GriddleTable extends Component {
    render() {
        return (
            <Griddle
                results={this.props.data}
                showFilter={true}
                showSettings={true}
                enableInfiniteScroll={true}
                useFixedHeader={true}
                bodyHeight={400}/>
        );
    }
}