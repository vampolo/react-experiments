import React, {Component} from 'react';
import {Treemap, BarChart} from '../components/charts/D3Charts';
import BaseData from '../data/baseData.js';

let dataEvents = require('../json/sysdig.json');
let SysdigData = new BaseData(dataEvents);


export default class Charts extends Component {
    render() {
        return (
            <div>
                <Treemap data={SysdigData.countOccurrence('proc.name')} name="Process Name" />
                <BarChart data={SysdigData.countOccurrenceFirst('proc.name', 10)} name="Top 10 Processes" />
            </div>
        );
    }
}