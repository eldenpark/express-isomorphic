import axios from 'axios';
import chalk from 'chalk';
import http from 'http';
import { logger } from '@nodekit/logger';
import nodemon from 'nodemon';
import path from 'path';

import createExpress, {
  Extend,
  MakeHtmlPayload,
  ServerCreation,
} from './createExpress';

const log = logger('[express-isomorphic]');

const localServer: LocalServer = async <State extends {}>({
  extend,
  makeHtmlPath,
  watchPaths,
}) => {
  const port = await getAvailablePort();

  return createExpress<State>({
    bootstrap: () => {
      setupNodemon({
        makeHtmlPath,
        port,
        watchPaths,
      });
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
      const { data } = await axios.post(`http://localhost:${port}/makeHtml`, makeHtmlPayload);
      return data;
    },
  });
};

export default localServer;

function setupNodemon({
  makeHtmlPath,
  port,
  watchPaths,
}) {
  log(
    'setupNodemon(): parent pid: %s, makeHtmlPath: %s, watchPaths: %s',
    process.pid,
    makeHtmlPath,
    watchPaths,
  );
  const script = path.resolve(__dirname, 'htmlGeneratingServer.js');

  nodemon({
    args: [
      '--port',
      port,
      '--makeHtmlPath',
      makeHtmlPath,
    ],
    ext: 'js json jsx ts tsx',
    script,
    watch: [
      makeHtmlPath,
      ...watchPaths,
    ],
  })
    .on('quit', () => {
      log('setupNodemon(): quit');
      process.exit();
    })
    .on('restart', (files: string[]) => {
      log(`setupNodemon(): ${chalk.green('restarted')} by: %s`, files);
    });
}

async function getAvailablePort() {
  const initialPort = 10021;

  function openAndCheckConnection(port) {
    return new Promise((resolve, reject) => {
      const server = http.createServer(() => {});
      server.listen(port, () => {
        log('openAndCheckConnection(): connect success: %s', port);
        server.close(() => {
          log(`openAndCheckConnection(): ${chalk.green('successfully')} closed examining server: %s`, port);
          resolve(port);
        });
      })
        .on('error', (err) => {
          log('openAndCheckConnection(): error: %s, port: %s', err, port);
          reject();
        });
    });
  }

  for (let port = initialPort; port < initialPort + 10; port += 1) {
    try {
      const _port = await openAndCheckConnection(port);
      log('getAvailablePort(): port is available: %s', port);
      return _port;
    } catch (err) {
      log('getAvailablePort(): port not availble: %s', port);
    }
  }
  throw new Error('getAvailablePort(): no port availble');
}

interface LocalServer {
  <State>(arg: {
    extend?: Extend<State>;
    makeHtmlPath: any;
    watchPaths?: string[];
  }): Promise<ServerCreation<State>>;
}
