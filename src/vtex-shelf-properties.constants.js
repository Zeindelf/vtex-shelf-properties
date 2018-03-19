
const vtexCatalogVersion = '0.7.0';

export default {
    EVENT_TIME: 150, // Miliseconds
    MESSAGES: {
        vtexCatalog: 'VtexCatalog.js is required and must be an instance. Download it from https://www.npmjs.com/package/vtex-catalog',
        vtexCatalogVersion: vtexCatalogVersion,
        vtexCatalogVersionMessage: `VtexCatalog version must be higher than ${vtexCatalogVersion}. Download last version on https://www.npmjs.com/package/vtex-catalog`,
        fnProperties: 'Callback must be a function',
        shelfClass: `shelfClass is required and must be a string, eg. '.js--shelf-class'`,
    },
};
