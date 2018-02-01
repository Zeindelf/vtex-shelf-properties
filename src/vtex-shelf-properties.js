
import CONSTANTS from './vtex-shelf-properties.constants.js';
import Methods from './vtex-shelf-properties.methods.js';

/**
 * Create a VtexMasterdata class
 * Main class
 */
class VtexShelfProperties {
    constructor(vtexUtils) {
        /**
         * Version
         * @type {String}
         */
        this.version = '0.0.1';

        /**
         * Package name
         * @type {String}
         */
        this.name = '@VtexShelfProperties';

        // Validate Vtex Utils
        if ( vtexUtils === undefined ) {
            throw new TypeError(CONSTANTS.messages.vtexUtils);
        }

        if ( vtexUtils.name !== '@VtexUtils' ) {
            throw new TypeError(CONSTANTS.messages.vtexUtils);
        }

        if ( vtexUtils.version < CONSTANTS.messages.vtexUtilsVersion ) {
            throw new Error(CONSTANTS.messages.vtexUtilsVersionMessage);
        }

        /**
         * Global Helpers instance
         * @type {GlobalHelpers}
         */
        this.globalHelpers = vtexUtils.globalHelpers;

        /**
         * Vtex Helpers instance
         * @type {VtexHelpers}
         */
        this.vtexHelpers = vtexUtils.vtexHelpers;

        /**
         * Extend public methods
         */
        this.globalHelpers.extend(VtexShelfProperties.prototype, Methods);

        /**
         * Init Helpers / Methods
         */
        this.setHelpers();
        this.init();
    }
}

export default VtexShelfProperties;
