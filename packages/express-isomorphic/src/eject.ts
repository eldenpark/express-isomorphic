import chalk from 'chalk';
import * as fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';

import createExpress, { 
  MakeHtml,
} from './createExpress';
import { log } from './utils/log';
import { 
  parseWebpackBuildInfo,
} from './utils/serverUtils';

const tag = 'eject';

const eject: Eject = async function ({
  ejectPath,
  makeHtml,
  publicPath,
  universalAppPath,
  webpackBuildJsonPath,
}) {
  log('eject():\n%o', arguments[0]);

  if (!ejectPath) {
    throw new Error('eject() cannot operate without valid ejectPath');
  }
  
  mkdirp.sync(ejectPath);

  try {
    const bundleBuildJson = fs.readFileSync(webpackBuildJsonPath, 'utf-8');
    const buildInfo = JSON.parse(bundleBuildJson);
    log('%s, build.json:\n%o', tag, buildInfo);

    const { error, assets } = parseWebpackBuildInfo(buildInfo);

    const html = await makeHtml({
      assets,
      requestUrl: '/',
      universalAppPath,
    });

    fs.writeFileSync(path.resolve(ejectPath, 'power.html'), html);
    log(`eject ${chalk.green('success')}`);

  } catch (err) {
    log('%s error: %o', tag, err);
  }
};

export default eject;

export interface Eject {
  (args: {
    ejectPath: string;
    makeHtml: MakeHtml;
    publicPath: string;
    universalAppPath: string;
    webpackBuildJsonPath: string;
  }): void;
}
