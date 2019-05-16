const babelRc = {
  "plugins": [
    [
      "module-resolver", {
        "alias": {
        },
      }
    ],
    // Stage 2
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-throw-expressions",

    // Stage 3
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    ["@babel/plugin-proposal-class-properties", { "loose": false }],
    "@babel/plugin-proposal-json-strings"
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

require('@babel/register', {
  ...babelRc,
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
});

const expressIsomorphic = require('@nodekit/express-isomorphic');

console.log(123, expressIsomorphic);

setTimeout(() => {
  console.log(444);
}, 2000);

module.exports = 'power';
