
const babel = require('rollup-plugin-babel');
const pkg = require('./package');

const now = new Date();
const banner = `
/*!!
 * VtexShelfProperties.js v${pkg.version}
 * https://github.com/${pkg.repository}
 *
 * Copyright (c) 2018-${now.getFullYear()} ${pkg.author.name}
 * Released under the ${pkg.license} license
 *
 * Date: ${now.toISOString()}
 */
`;

module.exports = {
    // Export banner
    banner,
    input: 'src/vtex-shelf-properties.js',
    output: [
        {
            banner: banner,
            file: 'dist/vtex-shelf-properties.js',
            format: 'umd',
            name: 'VTEX.VtexShelfProperties',
        },
        {
            banner: banner,
            file: 'dist/vtex-shelf-properties.common.js',
            format: 'cjs',
        },
        {
            banner: banner,
            file: 'dist/vtex-shelf-properties.esm.js',
            format: 'es',
        },
    ],
    plugins: [
        babel({
            exclude: 'node_modules/**',
            plugins: ['external-helpers'],
        }),
    ],
};
