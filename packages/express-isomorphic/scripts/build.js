const gulp = require('./gulpfile.js');


console.log('cwd', process.cwd())
const build = gulp.task('build');
build();
