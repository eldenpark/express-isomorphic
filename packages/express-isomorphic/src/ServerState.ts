import { logger } from 'jege/server';
import { Server } from 'socket.io';

import stringifyServerState from './utils/stringifyServerState';

const log = logger('[express-isomorphic]');
const IO = Symbol('io');

class ServerState<State> {
  private serverStateObject: ServerStateObject<State>;

  constructor(state: State) {
    const serverStateObject = {
      latestHtmlGenerated: 'html has yet generated',
      state,
    };
    this.serverStateObject = serverStateObject;
  }

  get io() {
    return this.serverStateObject[IO] as Server;
  }

  set io(io: Server) {
    this.serverStateObject[IO] = io;
  }

  getState() {
    return this.serverStateObject;
  }

  toString() {
    return stringifyServerState(this.serverStateObject);
  }

  update(updater: Updater<ServerStateObject<State>>) {
    const { serverStateObject } = this;
    const nextServerState = updater(serverStateObject);
    this.serverStateObject = nextServerState;
    log('update(): state is updated into: %s', this.toString());
    return this;
  }
}

export default ServerState;

export {
  IO,
};

export type ServerStateObject<State> = {
  error?: Error;
  [IO]?: Server;
  latestHtmlGenerated: string;
  socketPath?: string;
  socketPort?: number;
  state: State;
};

interface Error {
  errorObj: any;
  type: string;
}

type Updater<T> = (serverState: T) => T;
