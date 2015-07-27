var _ = require('underscore');

var SysdigData = require('../data/sysdig.json');

function createDataObj(event) {
    return { label: event[0], value: event[1] };
}

SysdigData.proc_name = _.chain(SysdigData.events).countBy('proc.name').pairs().map(createDataObj).value();

export default SysdigData;