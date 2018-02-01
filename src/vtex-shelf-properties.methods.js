
import Private from './vtex-shelf-properties.private.js';

const _private = new Private();

export default {
    init() {},

    setHelpers() {
        _private._setHelpers(this.globalHelpers, this.vtexHelpers);
    },
};
