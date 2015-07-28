var React = require('react');
var Griddle = require('griddle-react');
var dataEvents = require('../data/sysdig.json');

import Table from './table.jsx';
import SysdigChart from './chart.jsx';
import Data from './data.jsx';

var SysdigData = new Data(dataEvents);

React.render(
     <Table.SysdigTable data={SysdigData.events}/>,
    document.getElementById('content-table')
);

React.render(
    <SysdigChart.Treemap data={SysdigData.countOccurrence('proc.name')}/>,
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