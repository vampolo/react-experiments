let dataEvents = require('../json/sysdig.json');

import React, {Component} from 'react';
import GriddleTable from '../components/table/griddleTable.jsx';
import DataTable from '../components/table/dataTable.jsx';
import BaseData from '../data/baseData.js';

let SysdigData = new BaseData(dataEvents);

export default class Table extends Component {
    render() {
        return (
            <div>
                <GriddleTable data={SysdigData.events}/>
                <DataTable data={SysdigData.events}/>
            </div>
        );
    }
}
