import chalk from 'chalk';
import { logger } from '@nodekit/logger';

const log = logger('[express-isomorphic]');

export class ServerState {
  assets?: string[] = [];
  buildHash: number | undefined = undefined;
  error?: Error = undefined;
  isLaunched: boolean = false;
  makeHtml?: Function = undefined;
  state: State = {};
  updatedAt: Date | undefined = undefined;

  update(obj: Partial<ServerState> = {}): void {
    const time = new Date();
    log(`[state] state will ${chalk.green('update')} at %s with:\n%j`, time, obj);

    Object.keys(obj)
      .forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(this, key)) {
          this[key] = obj[key];
        }
      });
    this.updatedAt = time;
  }
}

export default ServerState;

interface Error {
  errorObj: any;
  type: string;
}

export interface State {
  [key: string]: any;
}
