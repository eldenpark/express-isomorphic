import axios from 'axios';
import chalk from 'chalk';
import { logger } from '@nodekit/logger';
import nodemon from 'nodemon';
import path from 'path';

import createExpress, {
  Extend,
  MakeHtmlPayload,
  ServerCreation,
} from './createExpress';

const log = logger('[express-isomorphic]');

const localServer: LocalServer = <State extends {}>({
  extend,
  makeHtmlPath,
}) => {
  return createExpress<State>({
    bootstrap: () => {
      setupNodemon(makeHtmlPath);
    },
    extend,
    htmlGenerator: async <State>({
      requestUrl,
      serverState,
    }) => {
      const makeHtmlPayload: MakeHtmlPayload<State> = {
        requestUrl,
        serverState,
      };
      const { data } = await axios.post('http://localhost:10021/makeHtml', makeHtmlPayload);
      return data;
    },
  });
};

export default localServer;

function setupNodemon(makeHtmlPath) {
  log('setupNodemon(): parent pid: %s, makeHtmlPath: %s', process.pid, makeHtmlPath);
  const script = path.resolve(__dirname, 'htmlGeneratingServer.js');

  nodemon({
    args: [
      '--port',
      10021,
      '--makeHtmlPath',
      makeHtmlPath,
    ],
    ext: 'js json jsx ts tsx',
    script,
  })
    .on('quit', () => {
      log('setupNodemon(): quit');
      process.exit();
    })
    .on('restart', (files: string[]) => {
      log(`setupNodemon(): ${chalk.green('restarted')} by: %s`, files);
    });
}

interface LocalServer {
  <State>(arg: {
    extend?: Extend<State>;
    makeHtmlPath: any;
  }): ServerCreation<State>;
}
