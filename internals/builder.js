const argv = require('yargs').argv;
const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

const cwd = process.cwd();

(async () => {
  try {
    if (argv.p !== undefined) {
      const buildFilePath = path.resolve(cwd, 'packages', argv.p, 'scripts', 'build.js');
      console.log('buildFilePath: %s', buildFilePath);

      if (fs.existsSync(buildFilePath)) {
        executeBuild(buildFilePath);
      } else {
        console.error('buildFilePath does not exist: %s', buildFilePath);
      }
    } else {
      const packagesPath = path.resolve(cwd, 'packages');
      const packages = fs.readdirSync(packagesPath);
      for (let i = 0; i < packages.length; i++) {
        const stat = fs.lstatSync(path.resolve(packagesPath, packages[i]));
        if (stat.isDirectory()) {
          const buildFilePath = path.resolve(
            packagesPath,
            packages[i],
            'scripts',
            'build.js',
          );
          if (fs.existsSync(buildFilePath)) {
            console.log('buildFile found: %s, running "build"', buildFilePath);
            await executeBuild(buildFilePath);
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
})();

function executeBuild(buildFilePath) {
  return new Promise((resolve, reject) => {
    const child = childProcess.spawn(
      'node',
      [
        buildFilePath,
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
