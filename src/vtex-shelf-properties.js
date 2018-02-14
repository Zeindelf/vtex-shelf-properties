
import CONSTANTS from './vtex-shelf-properties.constants.js';
import Methods from './vtex-shelf-properties.methods.js';

/**
 * Create a VtexMasterdata class
 * Main class
 */
class VtexShelfProperties {
    constructor(vtexUtils, fnProperties, catalogCache = false) {
        /**
         * Version
         * @type {String}
         */
        this.version = '0.1.2';

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
         * Shelf container class
         * @type {String}
         */
        this.shelfClass = '';

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
         * Vtex Helpers instance
         * @type {VtexHelpers}
         */
        this.vtexHelpers = vtexUtils.vtexHelpers;

        /**
         * Vtex Catalog instance
         * @type {VtexCatalog}
         */
        this.vtexCatalog = new vtexUtils.VtexCatalog(catalogCache);

        /**
         * Extend public methods
         */
        this.globalHelpers.extend(VtexShelfProperties.prototype, Methods);

        /**
         * Init Helpers / Methods
         */
        this.setHelpers();
    }
}

export default VtexShelfProperties;
