import chalk from 'chalk';

import { log } from './utils/log';

export class State {
  assets: string[] | undefined = undefined;
  buildHash: number | undefined = undefined;
  error: string | undefined = undefined;
  isLaunched: boolean = false;
  universalAppPath: string | undefined = undefined;
  updatedAt: Date | undefined = undefined;

  update(obj: Partial<State> = {}): void {
    const time = new Date();
    log(`[state] state will ${chalk.yellow('update')} at %s with:\n%o`, time, obj);

    for (let key in obj) {
      if (this.hasOwnProperty(key)) {
        this[key] = obj[key];
      }
    }
    this.updatedAt = time;
  }
}

export default new State();
