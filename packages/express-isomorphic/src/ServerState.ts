import chalk from 'chalk';
import { logger } from '@nodekit/logger';

const log = logger('[express-isomorphic]');

export default class ServerState<State> {
  error?: Error = undefined;
  isLaunched: boolean = false;
  state: State;

  update(obj): void {
    log(`serverState: state will ${chalk.green('update')} with:\n%j`, obj);

    Object.keys(obj)
      .forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(this, key)) {
          this[key] = obj[key];
        }
      });
  }
}

interface Error {
  errorObj: any;
  type: string;
}
