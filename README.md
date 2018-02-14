# VtexShelfProperties.js

Set custom properties on shelves templates on Vtex stores.

## Table of contents

- [Main](#main)
- [Getting started](#getting-started)
- [Methods](#methods)
- [License](#license)
- [Dependencies](#dependencies)
- [Todo](#todo)

## Main

```text
dist/
├── vtex-shelf-properties.js        (UMD)
├── vtex-shelf-properties.min.js    (UMD, compressed)
├── vtex-shelf-properties.common.js (CommonJS, default)
└── vtex-shelf-properties.esm.js    (ES Module)
```

## Getting started

### Direct download

Download the script [here](https://github.com/Zeindelf/vtex-shelf-properties/blob/master/dist/vtex-shelf-properties.min.js) and include it.

You will need [VtexUtils.js](https://github.com/zeindelf/vtex-utils)

```html
<script type="text/javascript" src="/arquivos/vtex-utils.min.js"></script>
<script type="text/javascript" src="/arquivos/vtex-shelf-properties.min.js"></script>
```

### Package Managers

VtexShelfProperties.js supports [npm](https://www.npmjs.com/package/vtex-shelf-properties) under the name `vtex-shelf-properties`.

```shell
npm install vtex-shelf-properties --save
```

### Module Loaders

VtexShelfProperties.js can also be loaded as an CommonJS or ES6 module (recomended).

```js
// CommomJS
var VtexShelfProperties = require('vtex-shelf-properties');

// ES6 module
import VtexShelfProperties from 'vtex-shelf-properties';
```

### Usage

With UMD (Universal Module Definition), the package is available on `VTEX` namespace.

For every shelf type, you will need create a new instance of `VtexShelfProperties`

```js
// First, initialize VtexUtils.js
var vtexUtils = new VTEX.VtexUtils();

// Initialize constructor passing VtexUtils.js as a param
vtexShelfProperties = new VTEX.VtexShelfProperties(vtexUtils, handler);
```

### Instance Params
The handler param is a callback function. There are two params: current DOM element and related product object info.

This handle is used to set custom properties into DOM element (set on setShelfContainer method) inside a shelf.

#### Example

```js
function myCustomProp($el, product) {
    var markup =
        '<a href="' + product.link + '" title="' + product.productName + '">' +
            '<h2>' + product.productName + '</h2>' +
            '<small>' + product.productReference + '</small>' +
            '<p>' + product.description + '</p>' +
        '</a>';

    $el.append(markup);
}

vtexShelfProperties = new VTEX.VtexShelfProperties(vtexUtils, myCustomProp);
```

## Methods

### vtexShelfProperties.setEventName([eventName])

Create custom event name for actual instance.

Needs to call before `setShelfContainer` method.

- **eventName** (optional):
  - Type: `String`
  - Default: `'requestEnd'`
  - Name of custom event when triggered on request end.

#### Example

```js
// Set custom event name
vtexShelfProperties.setEventName('shelfBasic');
// And use like:
$(document).on('shelfBasic.vtexShelfProperties', function(ev) {
  window.console.log(ev);
});

// If not provide, the default event name is:
$(document).on('requestEnd.vtexShelfProperties', function(ev) {
  window.console.log(ev);
});
```

### vtexShelfProperties.setShelfContainer(shelfClass)

Any container inside your shelf to receive custom properties.

Your container needs have a data attribute with product id.

- **shelfClass**:
  - Type: `String`
  - Name of shelf container class

#### Example

```html
// Your container
<div class="js--shelf-basic" data-product-id"123"></div>

<script>
  vtexShelfProperties.setShelf('.js--shelf-basic');
</script>
```

## License
vtexShelfProperties.js is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Dependencies

jQuery 1.8.3+

VtexUtils.js

## Todo

- Docs