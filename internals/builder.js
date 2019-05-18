const argv = require('yargs').argv;
const childProcess = require('child_process');
const path = require('path');

const { requireNonNull } = require('./internalUtils');
const cwd = process.cwd();

try {
  requireNonNull(argv.p, `You should provide '-p' with package name`);
  const gulpFilePath = path.resolve(cwd, 'packages', argv.p, 'gulpfile.js');
  console.log('gulpFilePath: %s', gulpFilePath);

  childProcess.spawn(
    'node',
    [
      './node_modules/.bin/gulp',
      '--gulpfile',
      gulpFilePath,
      'build'
    ],
    {
      stdio: 'inherit',
    },
  );
} catch (err) {
  console.log(err);
}
