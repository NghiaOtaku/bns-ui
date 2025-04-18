const { override, useBabelRc, addPostcssPlugins } = require('customize-cra');

module.exports = override(useBabelRc(), addPostcssPlugins([require('tailwindcss'), require('autoprefixer')]));
