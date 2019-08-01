const babel = require('gulp-babel');
const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const { buildLogger, logger } = require('jege/server');
const path = require('path');
const webpack = require('webpack');

const babelRc = require('./.babelRc');

const buildLog = buildLogger('[example-react]');
const log = logger('[example-react]');

const paths = {
  build: path.resolve(__dirname, '../build'),
  dist: path.resolve(__dirname, '../dist'),
  lib: path.resolve(__dirname, '../lib'),
  src: path.resolve(__dirname, '../src'),
};

function writeWebpackBuildJson(buildInfo) {
  const buildJsonPath = path.resolve(paths.dist, 'build.json');
  fs.writeFileSync(buildJsonPath, JSON.stringify(buildInfo, null, 2));
  log('writeWebpackBuildJson(): buildJsonPath: %s, buildInfo: %j', buildJsonPath, buildInfo);
}

gulp.task('clean', () => {
  const targetPaths = [
    `${paths.build}/**/*`,
    `${paths.dist}/**/*`,
    `${paths.lib}/**/*`,
  ];
  buildLog('clean', 'targetPaths: %s', targetPaths);

  return del(targetPaths);
});

gulp.task('webpack-bundle', (done) => {
  const webpackConfigPath = path.resolve(paths.src, 'webpack/webpack.config.client.prod.web.js');
  buildLog('webpack-bundle', 'configPath: %s', webpackConfigPath);

  try {
    const webpackConfig = require(webpackConfigPath);
    const webpackStats = {
      all: false,
      assets: true,
      builtAt: true,
      chunks: true,
      color: true,
      entrypoints: true,
      errors: true,
    };

    webpack(webpackConfig, (err, stats) => {
      const result = stats.toJson('minimal');
      if (err || stats.hasErrors()) {
        buildLog('webpack-bundle', 'webpack(): error: %o, result: %j', err, result);
        writeWebpackBuildJson(stats.toJson(webpackStats));
        done('error');
      } else {
        writeWebpackBuildJson(stats.toJson(webpackStats));
        done();
      }
    });
  } catch (err) {
    buildLog('webpack-bundle', 'webpack(): error: %o', err);
    done('error');
  }
});

gulp.task('webpack-makeHtml', (done) => {
  const webpackConfigPath = path.resolve(paths.src, 'webpack/webpack.config.server.prod.js');
  buildLog('webpack-makeHtml', 'configPath: %s', webpackConfigPath);

  try {
    const webpackConfig = require(webpackConfigPath);

    webpack(webpackConfig, (err, stats) => {
      const result = stats.toJson('minimal');
      if (err || stats.hasErrors()) {
        buildLog('webpack-makeHtml', 'webpack(): error: %o, result: %j', err, result);
        done('error');
      } else {
        done();
      }
    });
  } catch (err) {
    buildLog('webpack-makeHtml', 'webpack(): error: %o', err);
    done('error');
  }
});

gulp.task('copy-public', () => {
  const publicPath = path.resolve(paths.src, 'server/public');
  const destPath = path.resolve(paths.dist, 'public');
  buildLog('copy-public', 'publicPath: %s, destPath: %s', publicPath, destPath);

  return gulp.src(`${publicPath}/**/*`)
    .pipe(gulp.dest(destPath));
});

gulp.task('build-example', (done) => {
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
gulp.task('build', gulp.series('clean', 'webpack-bundle', 'webpack-makeHtml', 'build-example'));

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
