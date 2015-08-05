import _ from 'underscore';
import React, {Component} from 'react';
import mui from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import DataTable from './dataTable/table.jsx';

let ThemeManager = new mui.Styles.ThemeManager();

var colsNames = [
    'evt.num',
    'evt.cpu',
    'evt.dir',
    'evt.info',
    'evt.reltime',
    'evt.type',
    'fd.num',
    'proc.name',
    'proc.pid',
    'thread.pid'
];

// Column object creation
var columns = _.map(colsNames, (col, index) => {
    return new DataTable.Column({
        name: col
    });
});

// Column meta properties
// width null/custom
// initiallySorted true but only once
// align    left/right
// sortable true
// initialySortedAscending true
// sortASC
// visible
// minWidth
// removable

// Table properties
// sortBy
// height
// responsiveWidth auto resize on windows resize
// width if null 100%
// headerHeight
// bodyHeight height-headerHeight
// hasScrollbar

class Table extends Component {
    constructor() {
        super();
        this.state = { filter: '' };
        this.onChange = this.onChange.bind(this);
    }

    getChildContext() { 
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    }

    onChange(e) {
        this.setState({ filter: e.target.value });
    }

    render() {
        var filter = this.state.filter;
        var title = this.props.title;
        var data = this.props.data;
        return (
            <div>
                <div className="table-header">
                    <div className="title">
                        <h1>{title}</h1>
                    </div>
                    <div className="filter-bar">
                        <mui.TextField
                            type="text"
                            placeholder="Type a filter"
                            value={filter}
                            onChange={this.onChange} />
                    </div>
                </div>
                <DataTable
                    initialSort="evt.num"
                    data={data}
                    filter={filter}
                    columns={columns} />
            </div>
        );
    }
}

Table.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default Table;
