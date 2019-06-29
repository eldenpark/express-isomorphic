import chalk from 'chalk';
import { logger } from '@nodekit/logger';

import { Server } from 'socket.io';

const log = logger('[express-isomorphic]');

export default class ServerState<State> {
  error?: Error = undefined;
  isLaunched: boolean = false;
  socketPath: string;
  socketPort: number;
  state: State;
  unstringifiedProperties = new Map<String, any>();

  constructor(state: State) {
    this.state = state;
  }

  get io() {
    const io: Server | undefined = this.unstringifiedProperties.get('io');
    return io;
  }

  set io(io) {
    log('set io()');
    this.unstringifiedProperties.set('io', io);
  }

  update(obj: UpdateArgs): void {
    const stringifiedObj = stringify(obj);
    log(`serverState: state will ${chalk.green('update')} with: %s`, stringifiedObj);

    Object.keys(obj)
      .forEach((key) => {
        switch (key) {
          case 'state':
            this.state = {
              ...this.state,
              ...obj[key],
            };
            break;
          default:
            this[key] = obj[key];
        }
      });
  }
}

interface Error {
  errorObj: any;
  type: string;
}

type UpdateArgs = Partial<ServerState<any>> & {
  state?: any;
}

function stringify(obj: object): string {
  try {
    const objString = JSON.stringify(obj);
    return objString.length > 100
      ? `${objString.slice(0, 180)}...[length: ${objString.length}]`
      : objString;
  } catch (err) {
    log('stringify(): error in strinifying the obj');
    return '[obj] not stringifiable';
  }
}
