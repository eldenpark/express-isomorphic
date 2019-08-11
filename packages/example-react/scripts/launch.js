const { argv } = require('yargs');
const chalk = require('chalk');
const { logger } = require('jege/server');

const babelRc = require('./.babelRc');
const { gulp } = require('./build');

const log = logger('[example-react]');
const { NODE_ENV } = process.env;

function launch() {
  log(`launch(): argv: %j, NODE_ENV: ${chalk.yellow('%s')}`, argv, NODE_ENV);

  if (NODE_ENV === 'production') {
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
