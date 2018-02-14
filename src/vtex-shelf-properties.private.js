
import CONSTANTS from './vtex-shelf-properties.constants.js';

class Private {
    _requestEndEvent(eventName) {
        /* eslint-disable */
        const ev = new $.Event(`${eventName}.vtexShelfProperties`);
        /* eslint-enable */

        setTimeout(() => {
            $(document).trigger(ev);
        }, 0);
    }

    _validateShelfClass(shelfClass, globalHelpers) {
        if ( globalHelpers.isUndefined(shelfClass) || ! globalHelpers.isString(shelfClass) ) {
            throw new Error(CONSTANTS.messages.shelfClass);
        }
    }
}

export default Private;
