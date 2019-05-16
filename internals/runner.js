const argv = require('yargs').argv;
const childProcess = require('child_process');

const { requirePackageArg } = require('./internalUtils');

try {
  requirePackageArg(argv);
  childProcess.spawn('node', [ `packages/${argv.p}/launch.js` ], {
    stdio: 'inherit',
  });
} catch (err) {
  console.log('Error reading file', err);
}
