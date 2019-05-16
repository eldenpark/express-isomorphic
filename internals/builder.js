const argv = require('yargs').argv;
const childProcess = require('child_process');
const path = require('path');

const { requirePackageArg } = require('./internalUtils');
const cwd = process.cwd();

try {
  requirePackageArg(argv);
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
