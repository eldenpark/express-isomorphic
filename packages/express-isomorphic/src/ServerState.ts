import chalk from 'chalk';
import { logger } from '@nodekit/logger';

const log = logger('[express-isomorphic]');

export default class ServerState<State> {
  error?: Error = undefined;
  isLaunched: boolean = false;
  socketId: string;
  socketPort: number;
  state: State;

  constructor(state: State) {
    this.state = state;
  }

  update(obj: UpdateArgs): void {
    const objString = JSON.stringify(obj);
    const strToPrint = objString.length > 100
      ? `${objString.slice(0, 180)}...[length: ${objString.length}]`
      : objString;

    log(`serverState: state will ${chalk.green('update')} with: %s`, strToPrint);

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
