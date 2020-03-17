import axios from 'axios';
import chalk from 'chalk';
import http from 'http';
import { logger } from 'jege/server';
import nodemon from 'nodemon';
import path from 'path';
import socketIO, {
  Server,
} from 'socket.io';

import createExpress, {
  Extend,
  ServerCreation,
} from './createExpress';
import getAvailablePort from './utils/getAvailablePort';
import ServerState from './ServerState';

const log = logger('[express-isomorphic]');

async function createDev<State>({
  extend,
  makeHtmlPath,
  watchExt,
  watchPaths,
}: CreateDevArgs<State>): Promise<ServerCreation<State>> {
  const normalizedPid: number = process.pid % 10;
  const htmlGeneratorPort = await getAvailablePort(10021 + normalizedPid);
  const socketPath = `/${Date.now()}/socket.io`;
  let latestHtmlGenerated = 'html has not been generated';

  return createExpress<State>({
    bootstrap: async (app, serverState) => {
      const socketServer = http.createServer();
      const socketPort: number = await getAvailablePort(20021 + normalizedPid);
      log(
        `createExpress(): pid: %s, Calculated socketPort: %s Calculated htmlGeneratorPort: %s`,
        process.pid,
        socketPort,
        htmlGeneratorPort,
      );

      socketServer.listen(socketPort, () => {
        log(
          `createExpress(): socketServer is listening on port: ${chalk.yellow('%s')}`,
          socketPort,
        );
      });

      const io: Server = socketIO(socketServer, {
        path: socketPath,
      });

      serverState.socketPath = socketPath;
      serverState.socketPort = socketPort;
      serverState.io = io;

      io.on('connection', (socket) => {
        const { clientsCount } = (io.engine as any);
        log(
          'createExpress(): socket is connected, Handshake: %j, Total socket client count: %s',
          socket.handshake,
          clientsCount,
        );

        socket.emit('express-isomorphic', {
          msg: `socket is connected, socketId: ${socket.id}`,
        });
      });

      setupNodemon<State>({
        htmlGeneratorPort,
        makeHtmlPath,
        serverState,
        watchExt,
        watchPaths,
      });
    },
    extend,
    htmlGenerator: async ({
      requestUrl,
      serverState,
    }) => {
      try {
        const { data } = await axios.post(`http://localhost:${htmlGeneratorPort}/makeHtml`, {
          requestUrl,
          serverState,
        });

        latestHtmlGenerated = data;

        return data;
      } catch (err) {
        log(
          `htmlGenerator(): ${chalk.red('error')} generating html. Most likely htmlGeneratorServer is reloading`,
        );
        return createHtmlGeneratorErrorHtml(latestHtmlGenerated);
      }
    },
  });
}

export default createDev;

function setupNodemon<State>({
  htmlGeneratorPort,
  makeHtmlPath,
  serverState,
  watchExt,
  watchPaths,
}: SetupNodemonArgs<State>) {
  const script = path.resolve(__dirname, 'htmlGeneratingServer.js');

  log(
    'setupNodemon(): parent pid: %s, makeHtmlPath: %s, watchPaths: %s, htmlGeneratingServer: %s',
    process.pid,
    makeHtmlPath,
    watchPaths,
    script,
  );

  nodemon({
    args: [
      '--port',
      htmlGeneratorPort,
      '--makeHtmlPath',
      makeHtmlPath,
    ],
    ext: watchExt || 'js,json,jsx,ts,tsx,html,css,scss',
    script,
    watch: [
      makeHtmlPath,
      ...(watchPaths || []),
    ],
  })
    .on('quit', () => {
      log('setupNodemon(): quit');
      process.exit();
    })
    .on('restart', (files: string[]) => {
      log(`setupNodemon(): ${chalk.green('restarted')} by: %s`, files);

      const { io } = serverState;
      if (io) {
        io.sockets.emit('express-isomorphic', {
          msg: 'Nodemon restarting. Refresh recommended',
        });
      }

      serverState.eventHandlers.change.forEach((handler) => {
        handler(files);
      });
    });
}

function createHtmlGeneratorErrorHtml(latestHtmlGenerated) {
  return 'htmlGenerator(): error occurred. Most likely htmlGeneratorServer is reloading <br />'
    + latestHtmlGenerated;
}

interface CreateDevArgs<State> {
  extend?: Extend<State>;
  makeHtmlPath: any;
  watchExt?: string;
  watchPaths?: string[];
}

interface SetupNodemonArgs<State> {
  htmlGeneratorPort: number;
  makeHtmlPath: string;
  serverState: ServerState<State>;
  watchExt?: string;
  watchPaths?: string[],
}
