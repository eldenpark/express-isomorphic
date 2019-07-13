const { argv } = require('yargs');
const { logger } = require('@nodekit/logger');

const babelRc = require('./.babelRc');
const { gulp } = require('./build');

const log = logger('[express-isomorphic-react]');

function launch() {
  log('launch(): argv: %j', argv);

  if (argv._.includes('production')) {
    const buildTask = gulp.task('build');

    buildTask(() => {
      require('../dist/server/production.js');
    });
  } else {
    require('@babel/register')({
      ...babelRc,
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    });

    const buildDevTask = gulp.task('build-dev');
    buildDevTask(() => {
      require('../src/server/local.ts');
    });
  }
}

if (require.main === module) {
  launch();
}
