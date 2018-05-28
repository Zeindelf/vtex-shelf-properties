
import CONSTANTS from './vtex-shelf-properties.constants.js';
import Methods from './vtex-shelf-properties.methods.js';

/**
 * Create a VtexShelfProperties class
 * Main class
 */
class VtexShelfProperties {
    constructor(vtexUtils, vtexCatalog, fnProperties) {
        /**
         * Version
         * @type {String}
         */
        this.version = '0.3.0';

        /**
         * Package name
         * @type {String}
         */
        this.name = '@VtexShelfProperties';

        // Validate Vtex Libs
        if ( vtexUtils === undefined ) {
            throw new TypeError(CONSTANTS.MESSAGES.vtexUtils);
        }

        if ( vtexCatalog === undefined ) {
            throw new TypeError(CONSTANTS.MESSAGES.vtexCatalog);
        }

        /**
         * Vtex Catalog instance
         * @type {VtexCatalog}
         */
        this.vtexCatalog = vtexCatalog;

        if ( this.vtexCatalog.name !== '@VtexCatalog' ) {
            throw new TypeError(CONSTANTS.MESSAGES.vtexCatalog);
        }

        if ( this.vtexCatalog.version < CONSTANTS.MESSAGES.vtexCatalogVersion ) {
            throw new Error(CONSTANTS.MESSAGES.vtexCatalogVersionMessage);
        }

        if ( !vtexUtils.globalHelpers.isFunction(fnProperties) ) {
            throw new TypeError(CONSTANTS.MESSAGES.fnProperties);
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
         * Extend public methods
         */
        this.globalHelpers.extend(VtexShelfProperties.prototype, Methods);
    }
}

export default VtexShelfProperties;
