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

```js
// First, initialize VtexUtils.js
var vtexUtils = new VTEX.VtexUtils();

// Initialize constructor passing VtexUtils.js as a param
var vtexShelfProperties = new VTEX.VtexShelfProperties(vtexUtils);
```

## Methods


## License
vtexShelfProperties.js is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Dependencies

jQuery 1.8.3+

VtexUtils.js

## Todo

- Docs
- Lib