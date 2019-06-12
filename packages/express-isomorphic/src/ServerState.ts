import chalk from 'chalk';

import { log } from './utils/log';

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

    for (let key in obj) {
      if (this.hasOwnProperty(key)) {
        this[key] = obj[key];
      }
    }
    this.updatedAt = time;
  }
}

export default ServerState;

interface Error {
  type: string;
  errorObj: any;
}

export interface State {
  [key: string]: any;
}
