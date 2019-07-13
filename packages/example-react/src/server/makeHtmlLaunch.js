const babelRc = require('../../scripts/.babelRc');

require('@babel/register')({
  ...babelRc,
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
});

module.exports = require('./makeHtml.tsx');
