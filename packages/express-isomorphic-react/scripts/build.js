const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const { buildLogger } = require('@nodekit/logger');
const path = require('path');
const ts = require('gulp-typescript');
const webpack = require('webpack');

const tsConfig = require('../tsconfig.json');

const log = buildLogger('[express-isomorphic-react]');
const paths = {
  dist: path.resolve(__dirname, '../dist'),
  exampleDist: path.resolve(__dirname, '../example/dist'),
  exampleSrc: path.resolve(__dirname, '../example/src'),
  lib: path.resolve(__dirname, '../lib'),
  src: path.resolve(__dirname, '../src'),
};

function writeWebpackBuildJson(buildInfo) {
  const buildJsonPath = path.resolve(paths.exampleDist, 'build.json');
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

gulp.task('tsc', () => {
  const srcPath = `${paths.src}/**/*.{js,jsx,ts,tsx}`;
  log('tsc', 'src: %s', srcPath);

  return gulp.src([srcPath])
    .pipe(ts(tsConfig.compilerOptions))
    .pipe(gulp.dest(paths.lib));
});

gulp.task('webpack', (done) => {
  log('webpack');

  try {
    const webpackConfig = require(path.resolve(paths.exampleSrc, 'webpack/webpack.config.client.prod.web.js'));
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

gulp.task('build-example', gulp.parallel('webpack', 'tsc'), () => {
  const exampleSrcPath = `${paths.exampleSrc}/**/*.{js,jsx,ts,tsx}`;
  log('build-example');

  return gulp.src([exampleSrcPath])
    .pipe(ts(tsConfig.compilerOptions))
    .pipe(gulp.dest(paths.exampleDist));
});

gulp.task('build', gulp.series('clean', gulp.parallel('webpack', 'tsc')));

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
