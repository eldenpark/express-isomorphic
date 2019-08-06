// import chalk from 'chalk';
import { logger } from 'jege/server';

import { Server } from 'socket.io';

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

  update(updater: Updater<ServerStateObject<State>>) {
    const { serverStateObject } = this;
    const nextServerState = updater(serverStateObject);
    this.serverStateObject = nextServerState;
    log('update(): state is updated into: %s', this.toString());
    return this;
  }

  getState() {
    return this.serverStateObject;
  }

  toString() {
    let object = '';
    Object.entries(this.serverStateObject)
      .forEach(([key, value]) => {
        try {
          let stringifiedValue = JSON.stringify(value);
          stringifiedValue = stringifiedValue.length > 80
            ? `${stringifiedValue.slice(0, 80)}...[length: ${stringifiedValue.length}]`
            : stringifiedValue;
          object += ` ${key}: ${stringifiedValue}`;
        } catch (err) {
          object += `[circular]`;
        }
      });
    return object;
  }

  get io() {
    return this.serverStateObject[IO] as Server;
  }

  set io(io: Server) {
    this.serverStateObject[IO] = io;
  }
}

export default ServerState;

export {
  IO,
};

export function stringify(serverStateObject) {
  let result = '';
  Object.entries(serverStateObject)
    .forEach(([key, value]) => {
      if (key === 'latestHtmlGenerated') {
        try {
          let stringifiedValue = JSON.stringify(value);
          stringifiedValue = stringifiedValue.length > 80
            ? `${stringifiedValue.slice(0, 80)}...[length: ${stringifiedValue.length}]`
            : stringifiedValue;
          result += ` ${key}: ${stringifiedValue}`;
        } catch (err) {
          result += ` ${key}: [circular]`;
        }
      } else {
        try {
          result += ` ${key}: ${JSON.stringify(value)}`;
        } catch (err) {
          result += ` ${key}: [circular]`;
        }
      }
    });
  return result;
}

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
