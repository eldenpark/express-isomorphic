import axios from 'axios';
import chalk from 'chalk';
import http from 'http';
import { logger } from '@nodekit/logger';
import nodemon from 'nodemon';
import path from 'path';
import socketIO, {
  Server,
} from 'socket.io';

import createExpress, {
  Extend,
  MakeHtmlPayload,
  ServerCreation,
} from './createExpress';
import getAvailablePort from './utils/getAvailablePort';
import ServerState from './ServerState';

const log = logger('[express-isomorphic]');

const localServer: LocalServer = async <State extends {}>({
  extend,
  makeHtmlPath,
  watchExt,
  watchPaths,
}) => {
  const htmlGeneratorPort = await getAvailablePort(10021);

  return createExpress<State>({
    bootstrap: async (app, serverState) => {
      const server = http.createServer();
      const socketPort: number = await getAvailablePort(20021);
      const io: Server = socketIO(server);
      server.listen(socketPort);
      serverState.update({
        socketPort,
      });

      io.on('connection', (socket) => {
        log('createExpress(): socket is connected');
        socket.emit('express-isomorphic', {
          msg: '[express-isomorphic] socket is connected',
        });
        serverState.update({
          socketId: socket.id,
        });
      });

      setupNodemon<State>({
        htmlGeneratorPort,
        io,
        makeHtmlPath,
        serverState,
        watchExt,
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
      const { data } = await axios.post(`http://localhost:${htmlGeneratorPort}/makeHtml`, makeHtmlPayload);
      return data;
    },
  });
};

export default localServer;

function setupNodemon<State>({
  htmlGeneratorPort,
  io,
  makeHtmlPath,
  serverState,
  watchExt,
  watchPaths,
}: SetupNodemonArgs<State>) {
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
      htmlGeneratorPort,
      '--makeHtmlPath',
      makeHtmlPath,
    ],
    ext: watchExt || 'js,json,jsx,ts,tsx,html,css,scss',
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

      if (serverState.socketId) {
        io.to(serverState.socketId).emit('express-isomorphic', {
          msg: 'Nodemon restarting. Refresh recommended',
        });
      }
    });
}

interface LocalServer {
  <State>(arg: {
    extend?: Extend<State>;
    makeHtmlPath: any;
    watchExt?: string;
    watchPaths?: string[];
  }): Promise<ServerCreation<State>>;
}

interface SetupNodemonArgs<State> {
  htmlGeneratorPort: number;
  io: Server;
  makeHtmlPath: string;
  serverState: ServerState<State>;
  watchExt: string;
  watchPaths: string[],
}
