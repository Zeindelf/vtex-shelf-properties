
class Private {
    constructor() {
        this._globalHelpers = null;
        this._vtexHelpers = null;
        this._vtexCatalog = null;
    }

    _setHelpers(globalHelpers, vtexHelpers, vtexCatalog) {
        this._globalHelpers = globalHelpers;
        this._vtexHelpers = vtexHelpers;
        this._vtexCatalog = vtexCatalog;
    }

    _setInstance(instance) {
        this._shelfProperties = instance;
    }

    _getProducts(productsId, $shelf) {
            return this._vtexCatalog.searchProductArray(productsId).then((productResponse) => {
                $shelf.map((index, product) => {
                    const $this = $(product);
                    const productId = $this.data('productId');

                    for ( let productResponseId in productResponse ) {
                        if ( {}.hasOwnProperty.call(productResponse, productResponseId) ) {
                            if ( parseInt(productId) === parseInt(productResponseId) ) {
                                this._shelfProperties.fnProperties.apply(this._shelfProperties, [$this, productResponse[productResponseId]]);
                                $this.addClass('is--loaded');
                            }
                        }
                    }
                });
            })
            .then(() => this._requestEndEvent(this._shelfProperties.eventName));
    }

    _requestEndEvent(eventName) {
        /* eslint-disable */
        const ev = $.Event(`${eventName}.vtexShelfProperties`);
        /* eslint-enable */

        setTimeout(() => {
            $(document).trigger(ev);
        }, 0);
    }
}

export default Private;
