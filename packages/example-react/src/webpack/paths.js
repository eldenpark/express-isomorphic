const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '../..');

module.exports = {
  build: path.resolve(ROOT_PATH, 'build'),
  dist: path.resolve(ROOT_PATH, 'dist'),
  distPublic: path.resolve(ROOT_PATH, 'dist/public'),
  src: path.resolve(ROOT_PATH, 'src'),
};
