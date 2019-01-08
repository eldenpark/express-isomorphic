const path = require('path');

const ROOT_PATH = process.cwd();
const EXAMPLE_PATH = path.resolve(ROOT_PATH, 'example');

module.exports = {
  dist: path.resolve(EXAMPLE_PATH, 'dist'),
  distEject: path.resolve(EXAMPLE_PATH, 'dist/eject'),
  distPublicBundle: path.resolve(EXAMPLE_PATH, 'dist/bundle'),
  distUniversal: path.resolve(EXAMPLE_PATH, 'dist/universal'),
  src: path.resolve(EXAMPLE_PATH, 'src'),
  universalApp: path.resolve(EXAMPLE_PATH, 'dist/universal/universal.local.rootContainer'),
  webpackConfigClientLocalWeb: path.resolve(EXAMPLE_PATH, 'webpack/webpack.config.client.local.web'),
  webpackConfigClientProdWeb: path.resolve(EXAMPLE_PATH, 'webpack/webpack.config.client.prod.web'),
  webpackConfigUniversalLocal: path.resolve(EXAMPLE_PATH, 'webpack/webpack.config.universal.local'),
  webpackConfigUniversalProd: path.resolve(EXAMPLE_PATH, 'webpack/webpack.config.universal.prod'),
};
