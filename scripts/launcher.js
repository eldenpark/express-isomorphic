const { argv } = require('yargs');
const childProcess = require('child_process');
const fs = require('fs');
const { logger } = require('jege/server');
const path = require('path');

const { requireNonNull } = require('./scriptUtils');

const log = logger('[monorepo-express-isomorphic]');

function launcher() {
  try {
    log('launcher(): argv: %j', argv);

    requireNonNull(argv.p, 'You should provide "-p" with package name');

    const cwdForLaunch = path.resolve(__dirname, '../packages', argv.p);
    const launchFileRelativePath = './scripts/launch.js';
    const launchFilePath = path.resolve(cwdForLaunch, launchFileRelativePath);
    log('launcher(): launchFilePath: %s, cwdForLaunch: %s', launchFilePath, cwdForLaunch);

    if (!fs.existsSync(launchFilePath)) {
      throw new Error('launch file does not exist');
    }

    const launch = childProcess.spawn(
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

    launch.on('error', (err) => {
      log('launcher(): error in process: $s, error: $o', argv.p, err);
    });
  } catch (err) {
    log('launcher(): Error reading file', err);
  }
}

module.exports = launcher;

if (require.main === module) {
  launcher();
}
