import chalk from 'chalk';

import { log } from './utils/log';

const state: State = {
  assets: undefined,
  clientBuildInfo: undefined,
  error: undefined,
  isLaunched: false,
  updatedAt: undefined,
  universalAppPath: undefined,
  update(obj = {}) {
    const time = new Date();
    log(`[state] state will ${chalk.yellow('update')} at %s with:\n%o`, time, obj);
    for (let key in obj) {
      if (this.hasOwnProperty(key)) {
        this[key] = obj[key];
      }
    }
    this.updatedAt = time;
  },
  webpackStats: undefined,
};

export default state;

export interface State {
  assets: string[] | undefined;
  clientBuildInfo: any;
  error: string | undefined;
  isLaunched: boolean;
  universalAppPath: string | undefined;
  update: (arg: Partial<State>) => void;
  updatedAt: Date | undefined;
  webpackStats: any;
}