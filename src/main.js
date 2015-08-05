var React = require('react');
var Griddle = require('griddle-react');
var dataEvents = require('../data/sysdig.json');
var _ = require('underscore');

import SysdigChart from './scripts/chart.jsx';
import Data from './scripts/data.jsx';
import HeatMap from './scripts/map.jsx';
import Table from './scripts/table.jsx';

var SysdigData = new Data(dataEvents);

// React.render(
//     <SysdigChart.Treemap data={SysdigData.countOccurrence('proc.name')} name="Process Name"/>,
//     document.getElementById('treemap-chart')
// );

React.render(
    <Table 
        title="Sysdig Table"
        data={_.first(SysdigData.events, 500)} />,
    document.getElementById('data-table')
);

// React.render(
//     <Griddle
//         results={SysdigData.events}
//         showFilter={true}
//         showSettings={true}
//         enableInfiniteScroll={true}
//         useFixedHeader={true}
//         bodyHeight={400}/>,
//     document.getElementById('griddle-table')
// );

// React.render(
//     <HeatMap/>,
//     document.getElementById('pie-chart')
// );