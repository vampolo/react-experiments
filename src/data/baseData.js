var _ = require('underscore');

export default class Data {
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

    countOccurrenceFirst(eventName, n) {
        return _.chain(this.events)
                    .countBy(eventName)
                    .pairs()
                    .map(e => ({label: e[0], value: e[1]}))
                    .sortBy(e => (e.value))
                    .reverse()
                    .first(n)
                    .value();
    }
}