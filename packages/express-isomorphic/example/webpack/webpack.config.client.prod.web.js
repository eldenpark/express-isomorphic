const path = require('path');
const webpack = require('webpack');

const paths = require('../paths');
const webpackConfigClientWeb  = require('./webpack.config.client.web');

const config = {
  entry: {
    client: path.resolve(paths.src, 'client/client.tsx'),
    react: [ 'react', 'react-dom', 'redux', 'react-redux' ],
  },
  mode: 'production',
  optimization: {
    minimize: true,
    runtimeChunk: false,
    splitChunks: {
      chunks: 'all',
    },
  },
  output: {
    path: paths.distPublicBundle,
    filename: '[name].[chunkhash].js',
    chunkFilename: 'chunk.[chunkhash].js',
    publicPath: '/bundle/',
  },
};

module.exports = Object.assign({}, webpackConfigClientWeb, config);
