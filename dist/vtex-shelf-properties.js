
/*!!
 * VtexShelfProperties.js v0.0.1
 * https://github.com/zeindelf/vtex-shelf-properties
 *
 * Copyright (c) 2018-2018 Zeindelf
 * Released under the MIT license
 *
 * Date: 2018-02-01T20:19:59.437Z
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VTEX = global.VTEX || {}, global.VTEX.VtexShelfProperties = factory());
}(this, (function () { 'use strict';

var vtexUtilsVersion = '0.5.0';

var CONSTANTS = {
    API_URL: '/api/catalog_system/pub/products/search?fq=productId:',
    messages: {
        vtexUtils: 'VtexUtils.js is required and must be an instance. Download it from https://www.npmjs.com/package/vtex-utils and use "new VtexMasterdata(new VtexUtils())"',
        vtexUtilsVersion: vtexUtilsVersion,
        vtexUtilsVersionMessage: 'VtexUtils version must be higher than ' + vtexUtilsVersion + '. Download last version on https://www.npmjs.com/package/vtex-utils'
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

        this._globalHelpers = null;
        this._vtexHelpers = null;
    }

    createClass(Private, [{
        key: '_setHelpers',
        value: function _setHelpers(globalHelpers, vtexHelpers) {
            this._globalHelpers = globalHelpers;
            this._vtexHelpers = vtexHelpers;
        }
    }, {
        key: '_call',
        value: function _call(productId) {
            return $.ajax({
                url: '' + CONSTANTS.API_URL + productId,
                type: 'get'
            });
        }
    }]);
    return Private;
}();

var _private = new Private();

var Methods = {
    init: function init() {},
    setHelpers: function setHelpers() {
        _private._setHelpers(this.globalHelpers, this.vtexHelpers);
    }
};

/**
 * Create a VtexMasterdata class
 * Main class
 */

var VtexShelfProperties = function VtexShelfProperties(vtexUtils) {
  classCallCheck(this, VtexShelfProperties);

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
  if (vtexUtils === undefined) {
    throw new TypeError(CONSTANTS.messages.vtexUtils);
  }

  if (vtexUtils.name !== '@VtexUtils') {
    throw new TypeError(CONSTANTS.messages.vtexUtils);
  }

  if (vtexUtils.version < CONSTANTS.messages.vtexUtilsVersion) {
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
};

return VtexShelfProperties;

})));
