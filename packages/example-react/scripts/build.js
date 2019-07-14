const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const { buildLogger } = require('jege/server');
const path = require('path');
const ts = require('gulp-typescript');
const webpack = require('webpack');

const tsConfig = require('../tsconfig.json');

const log = buildLogger('[express-isomorphic-react]');
const paths = {
  dist: path.resolve(__dirname, '../dist'),
  lib: path.resolve(__dirname, '../lib'),
  src: path.resolve(__dirname, '../src'),
};

function writeWebpackBuildJson(buildInfo) {
  const buildJsonPath = path.resolve(paths.dist, 'build.json');
  log('webpack', 'writeWebpackBuildJson(): buildJsonPath: %s, buildInfo: %j', buildJsonPath, buildInfo);
  fs.writeFileSync(buildJsonPath, JSON.stringify(buildInfo, null, 2));
}

gulp.task('clean', () => {
  const targetPaths = [
    `${paths.lib}/**/*`,
    `${paths.dist}/**/*`,
  ];
  log('clean', 'targetPaths: %s', targetPaths);

  return del(targetPaths);
});

gulp.task('webpack', (done) => {
  const webpackConfigPath = path.resolve(paths.src, 'webpack/webpack.config.client.prod.web.js');
  log('webpack', 'configPath: %s', webpackConfigPath);

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
        log('webpack', 'webpack(): error: %o, result: %j', err, result);
        writeWebpackBuildJson(stats.toJson(webpackStats));
        done('error');
      } else {
        writeWebpackBuildJson(stats.toJson(webpackStats));
        done();
      }
    });
  } catch (err) {
    log('webpack', 'webpack(): error: %o', err);
    done('error');
  }
});

gulp.task('copy-public', () => {
  const publicPath = path.resolve(paths.src, 'server/public');
  const destPath = path.resolve(paths.dist, 'public');
  log('copy-public', 'publicPath: %s, destPath: %s', publicPath, destPath);

  return gulp.src(`${publicPath}/**/*`)
    .pipe(gulp.dest(destPath));
});

gulp.task('build-example', (done) => {
  const srcPath = `${paths.src}/**/*.{js,jsx,ts,tsx}`;
  log('build-example', 'srcPath: %s', srcPath);

  return gulp.src([srcPath])
    .pipe(ts(tsConfig.compilerOptions))
    .pipe(gulp.dest(paths.dist))
    .on('end', done);
});

gulp.task('build-dev', gulp.series('clean', 'copy-public'));
gulp.task('build', gulp.series('clean', 'webpack', 'build-example'));

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
