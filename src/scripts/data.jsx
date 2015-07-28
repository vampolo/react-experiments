var _ = require('underscore');

class SysdigData {
    constructor(data) {
        this.data = data;
    }

    get events() {
        return this.data.events;
    }

    countOccurrence(eventName) {
        function createDataObj(event) {
            return { label: event[0], value: event[1] };
        }

        return _.chain(this.events).countBy(eventName).pairs().map(createDataObj).value();
    }
};


export default SysdigData;