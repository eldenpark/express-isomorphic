const babelRc = {
  "plugins": [
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

module.exports = require('./makeHtml.tsx');
