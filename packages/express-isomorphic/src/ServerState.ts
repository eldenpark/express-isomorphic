import chalk from 'chalk';
import { logger } from '@nodekit/logger';

const log = logger('[express-isomorphic]');

export default class ServerState<State> {
  error?: Error = undefined;
  isLaunched: boolean = false;
  state: State;

  constructor(state) {
    this.state = state;
  }

  update(obj: UpdateArgs): void {
    const stringifiedObj = JSON.stringify(obj);
    log(`serverState: state will ${chalk.green('update')} with: %s`, stringifiedObj.slice(0, 30));

    Object.keys(obj)
      .forEach((key) => {
        if (key === 'state') {
          this.state = {
            ...this.state,
            ...obj[key],
          };
        } else {
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
  state: any;
}
