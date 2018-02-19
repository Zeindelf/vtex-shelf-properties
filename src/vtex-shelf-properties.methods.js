
import Private from './vtex-shelf-properties.private.js';

const _private = new Private();

export default {
    setEventName(eventName) {
        this.eventName = eventName;
    },

    setShelfContainer(shelfClass) {
        _private._validateShelfClass(shelfClass, this.globalHelpers);

        this.eventName = ( this.globalHelpers.isUndefined(this.eventName) ) ? 'requestEnd' : this.eventName;
        this.shelfClass = shelfClass;

        const $shelf = $(`${shelfClass}:not(.is--loaded)`);

        if ( $shelf.length < 1 ) {
            return false;
        }

        const productsId = $shelf.map((index, product) => $(product).data('productId')).get();

        return this._getProducts(productsId, $shelf);
    },

    update() {
        _private._validateShelfClass(this.shelfClass, this.globalHelpers);
        this.setShelfContainer(this.shelfClass);
    },

    _getProducts(productsId, $shelf) {
        return this.vtexCatalog.searchProductArray(productsId).then((productResponse) => {
            $shelf.map((index, product) => {
                const $this = $(product);
                const productId = $this.data('productId');

                for ( let productResponseId in productResponse ) {
                    if ( {}.hasOwnProperty.call(productResponse, productResponseId) ) {
                        if ( parseInt(productId) === parseInt(productResponseId) ) {
                            this.fnProperties.apply(this, [$this, productResponse[productResponseId]]);
                            $this.addClass('is--loaded');
                        }
                    }
                }
            });
        })
        .always(() => _private._requestEndEvent(this.eventName));
    },
};
