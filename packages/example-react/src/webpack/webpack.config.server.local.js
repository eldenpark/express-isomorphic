const merge = require('webpack-merge');
const path = require('path');
// const webpack = require('webpack');

const paths = require('./paths');
const webpackConfigClientWeb = require('./webpack.config.client.web');

const config = {
  devtool: 'source-map',
  entry: path.resolve(paths.src, 'server/makeHtml.tsx'),
  mode: 'development',
  optimization: {
    minimize: false,
  },
  output: {
    filename: 'makeHtml.bundle.js',
    libraryTarget: 'commonjs2',
    path: paths.dist,
    publicPath: '/public/',
  },
  plugins: [
  ],
};

module.exports = merge(webpackConfigClientWeb, config);
