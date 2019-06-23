const del = require('del');
const gulp = require('gulp');
const { buildLogger } = require('@nodekit/logger');
const path = require('path');
const ts = require('gulp-typescript');

const tsConfig = require('../tsconfig.json');

const log = buildLogger('[express-isomorphic]');
const paths = {
  lib: path.resolve(__dirname, '..', 'lib'),
  src: path.resolve(__dirname, '..', 'src'),
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

function build(callback) {
  const buildTask = gulp.task('build');
  buildTask(callback);
}

module.exports = build;

if (require.main === module) {
  build();
}
