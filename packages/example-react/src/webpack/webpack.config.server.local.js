const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const paths = require('./paths');
const webpackConfigClientWeb = require('./webpack.config.client.web');

const config = {
  devtool: 'source-map',
  entry: path.resolve(paths.src, 'server/makeHtml.tsx'),
  externals: [
    nodeExternals(),
  ],
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
  target: 'node',
};

module.exports = merge(webpackConfigClientWeb, config);
