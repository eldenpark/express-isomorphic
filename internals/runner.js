const argv = require('yargs').argv;
const childProcess = require('child_process');

const { requireNonNull } = require('./internalUtils');

try {
  requireNonNull(argv.p, `You should provide '-p' with package name`);
  childProcess.spawn(
    'node',
    [
      `./packages/${argv.p}/src/launch.js`,
    ],
    {
      stdio: 'inherit',
    },
  );
} catch (err) {
  console.log('Error reading file', err);
}
