import chalk from 'chalk';
import fs from 'fs';
import { logger } from '@nodekit/logger';
import mkdirp from 'mkdirp';
import path from 'path';
import { Request } from 'express';

import {
  MakeHtml,
} from './createExpress';
import { State } from './ServerState';

const log = logger('[express-isomorphic]');

class EjectServer {
  paths: string[] = [];

  addPath(_path: string) {
    this.paths.push(_path);
  }
}

const ejectServerInstance = new EjectServer();

const eject: Eject = async function eject({
  assets,
  ejectPath,
  makeHtml,
  state,
}) {
  log('eject():\n%o', arguments[0]); // eslint-disable-line

  if (!ejectPath) {
    throw new Error('eject() cannot operate without valid ejectPath');
  }

  mkdirp.sync(ejectPath);

  log('eject(): assets:\n%o', assets);
  log('eject(): route paths: %o', ejectServerInstance.paths);

  const html = await makeHtml({
    assets,
    requestUrl: '',
    state: state.public,
  });

  try {
    fs.writeFileSync(path.resolve(ejectPath, 'power.html'), html);
    log(`eject(): ${chalk.green('success')}`);
  } catch (err) {
    log('eject(): error: %o', err);
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
