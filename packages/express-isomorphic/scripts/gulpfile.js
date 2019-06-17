const chalk = require('chalk');
const del = require('del');
const gulp = require('gulp');
const path = require('path');
const ts = require('gulp-typescript');
const util = require('util');

const tsConfig = require('../tsconfig.json');

const paths = {
  lib: path.resolve(__dirname, '..', 'lib'),
  src: path.resolve(__dirname, '..', 'src'),
};

const log = (tag, ...args) => {
  const time = new Date().toISOString();
  const name = chalk.cyan('[express-isomorphic]');
  const _tag = chalk.magenta(`[gulp>${tag}]`);
  console.log(`${time} ${name} ${_tag} ${util.format(...args)}`);
};

gulp.task('clean', () => {
  log('clean', 'LIB_PATH: %s', paths.lib);

  return del([
    `${paths.lib}/**/*`,
  ]);
});

gulp.task('tsc', () => {
  log('tsc', 'config: %j, src: %s', tsConfig.compilerOptions, paths.src);

  return gulp.src([`${paths.src}/**/*.{ts,tsx}`])
    .pipe(ts(tsConfig.compilerOptions))
    .pipe(gulp.dest(paths.lib));
});

gulp.task('build', gulp.series('clean', 'tsc'));

module.exports = gulp;
