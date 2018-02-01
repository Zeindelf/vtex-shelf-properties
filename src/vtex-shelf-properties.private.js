
import CONSTANTS from './vtex-shelf-properties.constants.js';

class Private {
    constructor() {
        this._globalHelpers = null;
        this._vtexHelpers = null;
    }

    _setHelpers(globalHelpers, vtexHelpers) {
        this._globalHelpers = globalHelpers;
        this._vtexHelpers = vtexHelpers;
    }

    _call(productId) {
        return $.ajax({
            url: `${CONSTANTS.API_URL}${productId}`,
            type: 'get',
        });
    }
}

export default Private;
