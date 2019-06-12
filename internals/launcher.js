const argv = require('yargs').argv;
const childProcess = require('child_process');

const { requireNonNull } = require('./internalUtils');

try {
  console.log('%s [express-isomorphic2] launcher: argv: %j', new Date().toISOString(), argv);

  requireNonNull(argv.p, `You should provide '-p' with package name`);
  childProcess.spawn(
    'node',
    [
      `./scripts/launch.js`,
      ...argv._,
    ],
    {
      cwd: `./packages/${argv.p}`,
      stdio: 'inherit',
    },
  );
} catch (err) {
  console.log('Error reading file', err);
}
