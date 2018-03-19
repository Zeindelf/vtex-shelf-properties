
/*!!
 * VtexShelfProperties.js v0.3.0
 * https://github.com/zeindelf/vtex-shelf-properties
 *
 * Copyright (c) 2018-2018 Zeindelf
 * Released under the MIT license
 *
 * Date: 2018-03-19T18:21:04.896Z
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VTEX = global.VTEX || {}, global.VTEX.VtexShelfProperties = factory());
}(this, (function () { 'use strict';

var vtexCatalogVersion = '0.7.0';

var CONSTANTS$1 = {
    EVENT_TIME: 150, // Miliseconds
    MESSAGES: {
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
            setTimeout(function () {
                return $(document).trigger(eventName + '.vtexShelfProperties');
            }, this._eventTime);
        }
    }, {
        key: '_validateShelfClass',
        value: function _validateShelfClass(shelfClass, globalHelpers) {
            if (globalHelpers.isUndefined(shelfClass) || !globalHelpers.isString(shelfClass)) {
                throw new Error(CONSTANTS$1.MESSAGES.shelfClass);
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
    setEventTime: function setEventTime(time) {
        _private._eventTime = this.globalHelpers.isNumber(time) ? time : CONSTANTS.EVENT_TIME;
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

/**
 * Create a VtexShelfProperties class
 * Main class
 */

var VtexShelfProperties = function VtexShelfProperties(vtexUtils, VtexCatalog, fnProperties) {
  var catalogCache = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  classCallCheck(this, VtexShelfProperties);

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

  // Validate Vtex Utils
  if (vtexUtils === undefined) {
    throw new TypeError(CONSTANTS$1.MESSAGES.vtexUtils);
  }

  if (vtexUtils.name !== '@VtexUtils') {
    throw new TypeError(CONSTANTS$1.MESSAGES.vtexUtils);
  }

  if (vtexUtils.version < CONSTANTS$1.MESSAGES.vtexUtilsVersion) {
    throw new Error(CONSTANTS$1.MESSAGES.vtexUtilsVersionMessage);
  }

  if (!vtexUtils.globalHelpers.isFunction(fnProperties)) {
    throw new TypeError(CONSTANTS$1.MESSAGES.fnProperties);
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

return VtexShelfProperties;

})));
