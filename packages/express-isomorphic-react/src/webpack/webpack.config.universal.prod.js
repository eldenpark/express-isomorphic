const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const paths = require('../paths');
const webpackConfigClientWeb = require('./webpack.config.client.web');

const config = {
  devtool: 'source-map',
  entry: {
    rootContainer: path.join(paths.src, 'universal/Universal.tsx'),
  },
  externals: [
    nodeExternals({
      whitelist: /\.css$/,
    }),
  ],
  mode: 'production',
  node: {
    __dirname: false,
  },
  optimization: {
    minimize: false,
  },
  output: {
    filename: 'universal.[name].js',
    library: '',
    libraryTarget: 'commonjs',
    path: paths.distUniversal,
    publicPath: '/',
  },
  stats: {
    colors: true,
  },
  target: 'node',
};

module.exports = merge(webpackConfigClientWeb, config);
