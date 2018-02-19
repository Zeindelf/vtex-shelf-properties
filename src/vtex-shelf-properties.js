
import CONSTANTS from './vtex-shelf-properties.constants.js';
import Methods from './vtex-shelf-properties.methods.js';

/**
 * Create a VtexMasterdata class
 * Main class
 */
class VtexShelfProperties {
    constructor(vtexUtils, VtexCatalog, fnProperties, catalogCache = false) {
        /**
         * Version
         * @type {String}
         */
        this.version = '0.1.5';

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

        if ( ! vtexUtils.globalHelpers.isFunction(fnProperties) ) {
            throw new TypeError(CONSTANTS.messages.fnProperties);
        }

        /**
         * Callback function to set properties
         * Accepts two params: Current Element and current product object properties
         * @type {Function}
         */
        this.fnProperties = fnProperties;

        /**
         * Global Helpers instance
         * @type {GlobalHelpers}
         */
        this.globalHelpers = vtexUtils.globalHelpers;

        /**
         * Vtex Catalog instance
         * @type {VtexCatalog}
         */
        this.vtexCatalog = new VtexCatalog(vtexUtils, catalogCache);

        /**
         * Extend public methods
         */
        this.globalHelpers.extend(VtexShelfProperties.prototype, Methods);
    }
}

export default VtexShelfProperties;
