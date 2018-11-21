(function changeCurrentWorkingDirectoryToResolveNodeModulesPath() {
  process.chdir('../../');
  console.info('Current working directory %s', process.cwd());
})();

const babel = require('gulp-babel');
const chalk = require('chalk');
const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const path = require('path');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const util = require('util');

const babelRc = require('./.babelrc');
const tsConfig = require('../../tsconfig.json');

const ROOT_PATH = (function(currentWorkingDirectory) {
  const rootPath = fs.realpathSync(currentWorkingDirectory);
  const pJson = fs.existsSync(`${rootPath}/package.json`);
  if (!pJson) {
    console.error(
`Current working directory might not be the project root directory.
Did you call process.chdir() properly?`);
    process.exit(0);
  }
  return rootPath;
})(process.cwd());

const paths = {
  lib: path.resolve(ROOT_PATH, 'lib'),
  src: path.resolve(ROOT_PATH, 'src'),
};

const buildLog = (tag, ...args) => {
  console.info(chalk.cyan(`[build - ${tag}]`), util.format(...args));
};

const Task = {
  BABEL: 'babel',
  BUILD: 'build',
  CLEAN: 'clean',
  TSC: 'tsc',
};

gulp.task(Task.CLEAN, () => {
  buildLog(Task.CLEAN, 'LIB_PATH: %s', paths.lib);

  return del([
    `${paths.lib}/**/*`,
  ]);
});

gulp.task(Task.TSC, gulp.series(Task.CLEAN, function _tsc(done) {
  buildLog('tsc', 'tsc config: %o', tsConfig.compilerOptions);
  const tsProject = ts.createProject('tsconfig.json');

  return gulp.src([`${paths.src}/**/*.{ts,tsx}`])
    .pipe(tsProject())
    .pipe(gulp.dest(paths.lib));
}));

gulp.task(Task.BUILD, gulp.series(Task.CLEAN, Task.TSC));
