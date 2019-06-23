const { argv } = require('yargs');
const childProcess = require('child_process');

const { requireNonNull } = require('./scriptUtils');
const { logger } = require('./log');

const log = logger('[express-isomorphic]');

function launcher() {
  try {
    log('launcher(): argv: %j', argv);

    requireNonNull(argv.p, 'You should provide "-p" with package name');
    childProcess.spawn(
      'node',
      [
        './scripts/launch.js',
        ...argv._,
      ],
      {
        cwd: `./packages/${argv.p}`,
        stdio: 'inherit',
      },
    );
  } catch (err) {
    log('launcher(): Error reading file', err);
  }
}

module.exports = launcher;

if (require.main === module) {
  launcher();
}
