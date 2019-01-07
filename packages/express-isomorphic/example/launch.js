const babelRc = require('../internals/gulp/.babelrc');

require('@babel/register')({
  ...babelRc,
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
});

require('./src/server/server.ts');
