const argv = require('yargs').argv;
const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

const cwd = process.cwd();

(async () => {
  try {
    if (argv.p !== undefined) {
      const gulpFilePath = path.resolve(cwd, 'packages', argv.p, 'gulpfile.js');
      console.log('gulpFilePath: %s', gulpFilePath);

      executeGulpBuild(gulpFilePath);
    } else {
      const packagesPath = path.resolve(cwd, 'packages');
      const packages = fs.readdirSync(packagesPath);
      for (let i = 0; i < packages.length; i++) {
        const stat = fs.lstatSync(path.resolve(packagesPath, packages[i]));
        if (stat.isDirectory()) {
          const gulpFilePath = path.resolve(packagesPath, packages[i], 'gulpfile.js');
          if (fs.existsSync(gulpFilePath)) {
            console.log('gulpfile found: %s, running "build"', gulpFilePath);
            await executeGulpBuild(gulpFilePath);
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
})();

function executeGulpBuild(gulpFilePath) {
  return new Promise((resolve, reject) => {
    const child = childProcess.spawn(
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

    child.on('error', (err) => {
      reject(err);
    });

    child.on('exit', () => {
      resolve(true);
    });
  });
}
