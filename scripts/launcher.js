const { argv } = require('yargs');
const { createLauncher, proc } = require('process-launch');
const { logger } = require('jege/server');

const log = logger('[monorepo-express-isomorphic]');

const processDefinitions = {
  exampleReact: proc(
    'node',
    [
      './scripts/launch.js',
      ...argv._,
    ],
    {
      cwd: `./packages/example-react`,
      stdio: 'inherit',
    },
  ),
  exampleReactDuplicate: proc(
    'node',
    [
      './scripts/launch.js',
      ...argv._,
    ],
    {
      cwd: `./packages/example-react`,
      env: {
        PORT: 11391,
      },
      stdio: 'inherit',
    },
  ),
};

const processGroupDefinitions = {
  default: ['exampleReact'],
  duplicate: ['exampleReact', 'exampleReactDuplicate'],
};

function launcher() {
  try {
    log('launcher(): argv: %j', argv);

    const Launcher = createLauncher({
      processDefinitions,
      processGroupDefinitions,
    });

    Launcher.run({
      process: argv.process,
      processGroup: argv.processGroup,
    });
  } catch (err) {
    log('launcher(): Error reading file', err);
  }
}

module.exports = launcher;

if (require.main === module) {
  launcher();
}
