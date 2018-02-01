
const vtexUtilsVersion = '0.5.0';

export default {
    API_URL: '/api/catalog_system/pub/products/search?fq=productId:',
    messages: {
        vtexUtils: 'VtexUtils.js is required and must be an instance. Download it from https://www.npmjs.com/package/vtex-utils and use "new VtexMasterdata(new VtexUtils())"',
        vtexUtilsVersion: vtexUtilsVersion,
        vtexUtilsVersionMessage: `VtexUtils version must be higher than ${vtexUtilsVersion}. Download last version on https://www.npmjs.com/package/vtex-utils`,
    },
};
