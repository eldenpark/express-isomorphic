const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '..');

module.exports = {
  dist: path.resolve(ROOT_PATH, 'dist'),
  distEject: path.resolve(ROOT_PATH, 'dist/eject'),
  distPublicBundle: path.resolve(ROOT_PATH, 'dist/bundle'),
  distUniversal: path.resolve(ROOT_PATH, 'dist/universal'),
  src: path.resolve(ROOT_PATH, 'src'),
  webpackConfigClientLocalWeb: path.resolve(ROOT_PATH, 'src/webpack/webpack.config.client.local.web'),
  webpackConfigClientProdWeb: path.resolve(ROOT_PATH, 'src/webpack/webpack.config.client.prod.web'),
  webpackConfigUniversalLocal: path.resolve(ROOT_PATH, 'src/webpack/webpack.config.universal.local'),
  webpackConfigUniversalProd: path.resolve(ROOT_PATH, 'src/webpack/webpack.config.universal.prod'),
};

// module.exports = {
//   dist: path.resolve(EXAMPLE_PATH, 'dist'),
//   distEject: path.resolve(EXAMPLE_PATH, 'dist/eject'),
//   distPublicBundle: path.resolve(EXAMPLE_PATH, 'dist/bundle'),
//   distUniversal: path.resolve(EXAMPLE_PATH, 'dist/universal'),
//   src: path.resolve(EXAMPLE_PATH, 'src'),
//   webpackConfigClientLocalWeb: path.resolve(EXAMPLE_PATH, 'webpack/webpack.config.client.local.web'),
//   webpackConfigClientProdWeb: path.resolve(EXAMPLE_PATH, 'webpack/webpack.config.client.prod.web'),
//   webpackConfigUniversalLocal: path.resolve(EXAMPLE_PATH, 'webpack/webpack.config.universal.local'),
//   webpackConfigUniversalProd: path.resolve(EXAMPLE_PATH, 'webpack/webpack.config.universal.prod'),
// };
