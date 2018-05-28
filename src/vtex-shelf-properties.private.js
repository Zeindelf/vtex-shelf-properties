
import CONSTANTS from './vtex-shelf-properties.constants.js';

class Private {
    _validateShelfClass(shelfClass, globalHelpers) {
        if ( globalHelpers.isUndefined(shelfClass) || ! globalHelpers.isString(shelfClass) ) {
            throw new Error(CONSTANTS.MESSAGES.shelfClass);
        }
    }

    _requestEndEvent(eventName) {
        /* eslint-disable */
        const ev = $.Event(`${eventName}.vtexShelfProperties`);
        /* eslint-enable */

        $(document).trigger(ev);
    }
}

export default Private;
