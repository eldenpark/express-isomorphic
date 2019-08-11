const babel = require('gulp-babel');
const chalk = require('chalk');
const { compile } = require('express-isomorphic-extension/webpack');
const del = require('del');
const gulp = require('gulp');
const { buildLogger } = require('jege/server');
const path = require('path');

const babelRc = require('./.babelRc');
const webpackConfigClient = require('../src/webpack/webpack.config.client.prod.web');
const webpackConfigServer = require('../src/webpack/webpack.config.server.prod');

const buildLog = buildLogger('[example-react]');

const paths = {
  build: path.resolve(__dirname, '../build'),
  dist: path.resolve(__dirname, '../dist'),
  lib: path.resolve(__dirname, '../lib'),
  src: path.resolve(__dirname, '../src'),
};

gulp.task('clean', () => {
  const targetPaths = [
    `${paths.build}/**/*`,
    `${paths.dist}/**/*`,
    `${paths.lib}/**/*`,
  ];
  buildLog('clean', 'targetPaths: %s', targetPaths);

  return del(targetPaths);
});

gulp.task('webpack-client', () => {
  const buildJsonPath = path.resolve(paths.dist, 'build.json');
  buildLog('webpack-client', 'buildJsonPath: %s', buildJsonPath);

  return compile({
    buildJsonPath,
    webpackConfig: webpackConfigClient,
  })
    .then((result) => {
      buildLog('webpack-client', 'success: %j', result);
    })
    .catch((err) => {
      buildLog('webpack-client', 'error: %o', err);
      throw err;
    });
});

gulp.task('webpack-makeHtml', () => {
  buildLog('webpack-makeHtml', 'start comilling');

  return compile({
    webpackConfig: webpackConfigServer,
  })
    .then((result) => {
      buildLog(`webpack-makehtml`, `${chalk.green('success')}: %j`, result);
    })
    .catch((err) => {
      buildLog('webpack-makehtml', `${chalk.red('error')}: %o`, err);
      throw err;
    });
});

gulp.task('copy-public', () => {
  const publicPath = path.resolve(paths.src, 'server/public');
  const destPath = path.resolve(paths.dist, 'public');
  buildLog('copy-public', 'publicPath: %s, destPath: %s', publicPath, destPath);

  return gulp.src(`${publicPath}/**/*`)
    .pipe(gulp.dest(destPath));
});

gulp.task('babel', (done) => {
  const srcPath = `${paths.src}/**/*.{js,jsx,ts,tsx}`;
  buildLog('build-example', 'srcPath: %s, destPath: %j, babelRc: %j', srcPath, paths.dist, babelRc);

  return gulp.src([srcPath], {
    dot: true,
  })
    .pipe(babel(babelRc))
    .pipe(gulp.dest(paths.build))
    .on('end', done);
});

gulp.task('build-dev', gulp.series('clean', 'copy-public'));

gulp.task('build', gulp.series('clean', 'webpack-client', 'webpack-makeHtml', 'babel'));

function build(callback) {
  const buildTask = gulp.task('build');
  buildTask(callback);
}

module.exports = {
  build,
  gulp,
};

if (require.main === module) {
  build();
}
