import _ from 'underscore';

class Column {
    constructor(options) {
        if (! _.isObject(options)) {
            options = {};
        }

        this.name =             options.name || '';
        this.width =            options.width || null;
        this.minWidth =         options.minWidth || null;
        this.visible =          options.visible || true;
        this.sortable =         options.sortable || true;
        this.removable =        options.removable || true;
        this.sortAsc =          options.sortAsc || true;
        this.aling =            options.align || null;

    }

    toggleSort() {
        this.sortAsc = this.sortAsc === false;
    }
}

export default Column;