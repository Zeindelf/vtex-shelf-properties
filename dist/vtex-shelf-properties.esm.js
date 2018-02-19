
/*!!
 * VtexShelfProperties.js v0.1.5
 * https://github.com/zeindelf/vtex-shelf-properties
 *
 * Copyright (c) 2018-2018 Zeindelf
 * Released under the MIT license
 *
 * Date: 2018-02-19T01:19:50.014Z
 */

var vtexCatalogVersion = '0.5.0';

var CONSTANTS = {
    messages: {
        vtexCatalog: 'VtexCatalog.js is required and must be an instance. Download it from https://www.npmjs.com/package/vtex-catalog',
        vtexCatalogVersion: vtexCatalogVersion,
        vtexCatalogVersionMessage: 'VtexCatalog version must be higher than ' + vtexCatalogVersion + '. Download last version on https://www.npmjs.com/package/vtex-catalog',
        fnProperties: 'Callback must be a function',
        shelfClass: 'shelfClass is required and must be a string, eg. \'.js--shelf-class\''
    }
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var Private = function () {
    function Private() {
        classCallCheck(this, Private);
    }

    createClass(Private, [{
        key: '_requestEndEvent',
        value: function _requestEndEvent(eventName) {
            /* eslint-disable */
            var ev = new $.Event(eventName + '.vtexShelfProperties');
            /* eslint-enable */

            setTimeout(function () {
                $(document).trigger(ev);
            }, 0);
        }
    }, {
        key: '_validateShelfClass',
        value: function _validateShelfClass(shelfClass, globalHelpers) {
            if (globalHelpers.isUndefined(shelfClass) || !globalHelpers.isString(shelfClass)) {
                throw new Error(CONSTANTS.messages.shelfClass);
            }
        }
    }]);
    return Private;
}();

var _private = new Private();

var Methods = {
    setEventName: function setEventName(eventName) {
        this.eventName = eventName;
    },
    setShelfContainer: function setShelfContainer(shelfClass) {
        _private._validateShelfClass(shelfClass, this.globalHelpers);

        this.eventName = this.globalHelpers.isUndefined(this.eventName) ? 'requestEnd' : this.eventName;
        this.shelfClass = shelfClass;

        var $shelf = $(shelfClass + ':not(.is--loaded)');

        if ($shelf.length < 1) {
            return false;
        }

        var productsId = $shelf.map(function (index, product) {
            return $(product).data('productId');
        }).get();

        return this._getProducts(productsId, $shelf);
    },
    update: function update() {
        _private._validateShelfClass(this.shelfClass, this.globalHelpers);
        this.setShelfContainer(this.shelfClass);
    },
    _getProducts: function _getProducts(productsId, $shelf) {
        var _this = this;

        return this.vtexCatalog.searchProductArray(productsId).then(function (productResponse) {
            $shelf.map(function (index, product) {
                var $this = $(product);
                var productId = $this.data('productId');

                for (var productResponseId in productResponse) {
                    if ({}.hasOwnProperty.call(productResponse, productResponseId)) {
                        if (parseInt(productId) === parseInt(productResponseId)) {
                            _this.fnProperties.apply(_this, [$this, productResponse[productResponseId]]);
                            $this.addClass('is--loaded');
                        }
                    }
                }
            });
        }).always(function () {
            return _private._requestEndEvent(_this.eventName);
        });
    }
};

var VtexShelfProperties = function VtexShelfProperties(vtexUtils, VtexCatalog, fnProperties) {
  var catalogCache = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  classCallCheck(this, VtexShelfProperties);

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
  if (vtexUtils === undefined) {
    throw new TypeError(CONSTANTS.messages.vtexUtils);
  }

  if (vtexUtils.name !== '@VtexUtils') {
    throw new TypeError(CONSTANTS.messages.vtexUtils);
  }

  if (vtexUtils.version < CONSTANTS.messages.vtexUtilsVersion) {
    throw new Error(CONSTANTS.messages.vtexUtilsVersionMessage);
  }

  if (!vtexUtils.globalHelpers.isFunction(fnProperties)) {
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
};

export default VtexShelfProperties;
