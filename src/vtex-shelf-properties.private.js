
import CONSTANTS from './vtex-shelf-properties.constants.js';

class Private {
    _requestEndEvent(eventName) {
        setTimeout(() => $(document).trigger(`${eventName}.vtexShelfProperties`), this._eventTime);
    }

    _validateShelfClass(shelfClass, globalHelpers) {
        if ( globalHelpers.isUndefined(shelfClass) || ! globalHelpers.isString(shelfClass) ) {
            throw new Error(CONSTANTS.MESSAGES.shelfClass);
        }
    }
}

export default Private;
