
import CONSTANTS from './vtex-shelf-properties.constants.js';

class Private {
    _requestEndEvent(eventName) {
        /* eslint-disable */
        const ev = $.Event(`${eventName}.vtexShelfProperties`);
        /* eslint-enable */

        setTimeout(() => {
            $(document).trigger(ev);
        }, CONSTANTS.EVENT_TIME);
    }

    _validateShelfClass(shelfClass, globalHelpers) {
        if ( globalHelpers.isUndefined(shelfClass) || ! globalHelpers.isString(shelfClass) ) {
            throw new Error(CONSTANTS.MESSAGES.shelfClass);
        }
    }
}

export default Private;
