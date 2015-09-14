var React = require('react');
var Griddle = require('griddle-react');
var dataEvents = require('../data/sysdig.json');

import SysdigChart from './scripts/chart.jsx';
import Data from './scripts/data.jsx';

var SysdigData = new Data(dataEvents);


React.render(
    <SysdigChart.Treemap data={SysdigData.countOccurrence('proc.name')} name="Process Name"/>,
    document.getElementById('treemap-chart')
);

React.render(
    <Griddle
        results={SysdigData.events}
        showFilter={true}
        showSettings={true}
        enableInfiniteScroll={true}
        useFixedHeader={true}
        bodyHeight={400}/>,
    document.getElementById('griddle-table')
);
