import chalk from 'chalk';
import * as fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import { Request } from 'express';

import {
  MakeHtml,
} from './createExpress';
import { log } from './utils/log';
import { State } from './state';

const tag = 'eject';

class EjectServer {
  paths: string[] = [];

  addPath(path: string) {
    this.paths.push(path);
  }
}

const ejectServerInstance = new EjectServer();

const eject: Eject = async function ({
  assets,
  ejectPath,
  makeHtml,
  state,
}) {
  log('eject():\n%o', arguments[0]);

  if (!ejectPath) {
    throw new Error('eject() cannot operate without valid ejectPath');
  }

  mkdirp.sync(ejectPath);

  log('%s, assets:\n%o', tag, assets);
  log('eject route paths: %o', ejectServerInstance.paths);

  const html = await makeHtml({
    assets,
    requestUrl: '',
    resLocals: {},
  });

  try {
    fs.writeFileSync(path.resolve(ejectPath, 'power.html'), html);
    log(`eject ${chalk.green('success')}`);
  } catch (err) {
    log('%s error: %o', tag, err);
  }

  // Terminate the program after ejecting.
  process.exit(0);
};

export default eject;

export const addPath = ejectServerInstance.addPath.bind(ejectServerInstance);

export interface Eject {
  (args: {
    assets?: string[];
    ejectPath: string;
    makeHtml: MakeHtml;
    request?: Request;
    state: State;
  }): void;
}
