const isProduction = process.env.NODE_ENV === 'production';
const r = require.resolve;

const babelRc = {
  plugins: [
    r('react-hot-loader/babel'),
    [
      r('babel-plugin-module-resolver'), {
        alias: {
          '@@universal': './src/universal',
        },
      },
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
    [r('@babel/plugin-proposal-class-properties'), { loose: false }],
    // "@babel/plugin-proposal-json-strings",
    // 'dynamic-import-node',

    [r('babel-plugin-styled-components'), {
      displayName: !isProduction,
      minify: !!isProduction,
      ssr: true,
    }],
  ],
  presets: [
    [r('@babel/preset-env'), {
      targets: {
        node: '8.11',
      },
    }],
    r('@babel/preset-react'),
    r('@babel/preset-typescript'),
  ],
};

module.exports = babelRc;
