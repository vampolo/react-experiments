var _ = require('underscore');

class SysdigData {
    constructor(data) {
        this.data = data;
    }

    get events() {
        return this.data.events;
    }

    countOccurrence(eventName) {
        return _.chain(this.events)
                    .countBy(eventName)
                    .pairs()
                    .map(e => ({label: e[0], value: e[1]}))
                    .value();
    }
};


export default SysdigData;