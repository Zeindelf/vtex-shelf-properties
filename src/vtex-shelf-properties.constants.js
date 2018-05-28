
const vtexCatalogVersion = '1.0.0';

export default {
    MESSAGES: {
        vtexUtils: 'VtexUtils.js is required and must be an instance. Download it from https://www.npmjs.com/package/vtex-utils',
        vtexCatalog: 'VtexCatalog.js is required and must be an instance. Download it from https://www.npmjs.com/package/vtex-catalog',
        vtexCatalogVersion: vtexCatalogVersion,
        vtexCatalogVersionMessage: `VtexCatalog version must be higher than ${vtexCatalogVersion}. Download last version on https://www.npmjs.com/package/vtex-catalog`,
        fnProperties: 'Callback must be a function',
        shelfClass: `shelfClass is required and must be a string, e.g. '.js--shelf-class'`,
    },
};
