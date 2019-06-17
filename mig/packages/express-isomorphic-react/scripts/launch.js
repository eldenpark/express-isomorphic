const argv = require('yargs').argv;

console.log(
  '%s [express-isomorphic-react] launch: argv: %j',
  new Date().toISOString(),
  argv,
);

if (argv._.includes('production')) {
  const gulp = require('./gulpfile.js');
  const build = gulp.task('build');
  build(() => {
    require('../lib/server/production.js');
  });
} else {
  const babelRc = {
    "plugins": [
      [
        "module-resolver", {
          "alias": {
          },
        }
      ],
      // Stage 2
      // ["@babel/plugin-proposal-decorators", { "legacy": true }],
      // "@babel/plugin-proposal-function-sent",
      // "@babel/plugin-proposal-export-namespace-from",
      // "@babel/plugin-proposal-numeric-separator",
      // "@babel/plugin-proposal-throw-expressions",

      // Stage 3
      // "@babel/plugin-syntax-dynamic-import",
      // "@babel/plugin-syntax-import-meta",
      // ["@babel/plugin-proposal-class-properties", { "loose": false }],
      // "@babel/plugin-proposal-json-strings",
      'dynamic-import-node',
    ],
    "presets": [
      ["@babel/preset-env", {
        targets: {
          node: '8.11',
        },
      }],
      "@babel/preset-react",
      "@babel/preset-typescript",
    ],
  };

  require('@babel/register')({
    ...babelRc,
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  });

  require('../src/server/local.ts');
}
