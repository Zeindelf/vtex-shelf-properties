
/*!!
 * VtexShelfProperties.js v0.1.5
 * https://github.com/zeindelf/vtex-shelf-properties
 *
 * Copyright (c) 2018-2018 Zeindelf
 * Released under the MIT license
 *
 * Date: 2018-02-14T06:12:22.122Z
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VTEX = global.VTEX || {}, global.VTEX.VtexShelfProperties = factory());
}(this, (function () { 'use strict';

var vtexUtilsVersion = '0.9.1';

var CONSTANTS = {
    messages: {
        vtexUtils: 'VtexUtils.js is required and must be an instance. Download it from https://www.npmjs.com/package/vtex-utils',
        vtexUtilsVersion: vtexUtilsVersion,
        vtexUtilsVersionMessage: 'VtexUtils version must be higher than ' + vtexUtilsVersion + '. Download last version on https://www.npmjs.com/package/vtex-utils',
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
        var productsId = [];

        if ($shelf.length < 1) {
            return false;
        }

        $shelf.map(function (index, product) {
            var $this = $(product);
            var productId = $this.data('productId');

            productsId.push(productId);
        });

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
        }).then(function () {
            return _private._requestEndEvent(_this.eventName);
        });
    }
};

/**
 * Create a VtexMasterdata class
 * Main class
 */

var VtexShelfProperties = function VtexShelfProperties(vtexUtils, fnProperties) {
  var catalogCache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
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
  this.vtexCatalog = new vtexUtils.VtexCatalog(catalogCache);

  /**
   * Extend public methods
   */
  this.globalHelpers.extend(VtexShelfProperties.prototype, Methods);
};

return VtexShelfProperties;

})));
