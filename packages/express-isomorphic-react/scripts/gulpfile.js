const chalk = require('chalk');
const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const path = require('path');
const ts = require('gulp-typescript');
const util = require('util');
const webpack = require('webpack');

const tsConfig = require('../tsconfig.json');

const paths = {
  dist: path.resolve(__dirname, '../dist'),
  lib: path.resolve(__dirname, '../lib'),
  src: path.resolve(__dirname, '../src'),
};

const log = (tag, ...args) => {
  const time = new Date().toISOString();
  const name = chalk.cyan('[express-isomorphic-react]');
  const _tag = chalk.magenta(`[gulp>${tag}]`);
  const msg = util.format(...args);
  console.log(`${time} ${name} ${_tag} ${msg}`); // eslint-disable-line
};

function writeWebpackBuildJson(build) {
  const buildJsonPath = path.resolve(paths.dist, 'build.json');
  log('webpack', 'writeWebpackBuildJson(): buildJsonPath: %s, build: %j', buildJsonPath, build);
  fs.writeFileSync(buildJsonPath, JSON.stringify(build, null, 2));
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

  const webpackConfig = require(path.resolve(paths.src, 'webpack/webpack.config.client.prod.web.js')); // eslint-disable-line
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
      log('webpack(): error', err, result);
      writeWebpackBuildJson(stats.toJson(webpackStats));
      done('error');
    } else {
      writeWebpackBuildJson(stats.toJson(webpackStats));
      done();
    }
  });
});

gulp.task('build', gulp.series('clean', gulp.parallel('webpack', 'tsc')));

module.exports = gulp;
