const { argv } = require('yargs');
const { logger } = require('jege/server');

const babelRc = require('./.babelRc');
const { gulp } = require('./build');

const log = logger('[example-react]');

function launch() {
  log('launch(): argv: %j', argv);

  if (argv._.includes('production')) {
    const buildTask = gulp.task('build');

    buildTask(() => {
      log('launch(): build complete, launching...');
      require('../build/server/index.production.js');
    });
  } else {
    require('@babel/register')({
      ...babelRc,
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    });

    const buildDevTask = gulp.task('build-dev');
    buildDevTask(() => {
      require('../src/server/index.local.ts');
    });
  }
}

if (require.main === module) {
  launch();
}
