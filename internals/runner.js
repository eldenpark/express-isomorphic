const argv = require('yargs').argv;
const childProcess = require('child_process');

const { requireNonNull } = require('./internalUtils');

try {
  requireNonNull(argv.p, `You should provide '-p' with package name`);
  childProcess.spawn(
    'node',
    [
      `./src/launch.js`,
    ],
    {
      cwd: `./packages/${argv.p}`,
      stdio: 'inherit',
    },
  );
} catch (err) {
  console.log('Error reading file', err);
}
