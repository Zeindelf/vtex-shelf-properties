
import Private from './vtex-shelf-properties.private.js';

const _private = new Private();

export default {
    setHelpers() {
        _private._setHelpers(this.globalHelpers, this.vtexHelpers, this.vtexCatalog);
        _private._setInstance(this);
    },

    setEventName(eventName) {
        this.eventName = eventName;
    },

    setShelfContainer(shelfClass) {
        _private._validateShelfClass(shelfClass);

        this.eventName = ( this.globalHelpers.isUndefined(this.eventName) ) ? 'requestEnd' : this.eventName;
        this.shelfClass = shelfClass;

        const $shelf = $(`${shelfClass}:not(.is--loaded)`);
        let productsId = [];

        if ( $shelf.length < 1 ) {
            return false;
        }

        $shelf.map((index, product) => {
            const $this = $(product);
            const productId = $this.data('productId');

            productsId.push(productId);
        });

        return _private._getProducts(productsId, $shelf);
    },

    update() {
        _private._validateShelfClass(this.shelfClass);
        this.setShelfContainer(this.shelfClass);
    },
};
