const { argv } = require('yargs');
const { createLauncher, proc } = require('process-launch');
const { logger } = require('jege/server');

const cwd = process.cwd();
const log = logger('[monorepo-express-isomorphic]');

const buildOrder = [
  'express-isomorphic',
  'express-isomorphic-extension',
];

const processDefinitions = {
  'express-isomorphic': proc(
    'node',
    [
      './scripts/build.js',
    ],
    {
      cwd: `./packages/express-isomorphic`,
      stdio: 'inherit',
    },
  ),
  'express-isomorphic-extension': proc(
    'node',
    [
      './scripts/build.js',
    ],
    {
      cwd: `./packages/express-isomorphic-extension`,
      stdio: 'inherit',
    },
  ),
};

async function builder() {
  log('builder(): start building, cwd: %s, argv: %j', cwd, argv);

  try {
    const Launcher = createLauncher({
      processDefinitions,
    });

    Launcher.runInSequence({
      order: buildOrder,
    });
  } catch (err) {
    log('builder(): error', err);
  }
}
module.exports = builder;

if (require.main === module) {
  builder();
}
