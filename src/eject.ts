import * as fs from 'fs';

import createExpress, { 
  MakeHtml,
  Server,
} from './createExpress';
import { log } from './utils/log';
import { 
  parseWebpackBuildInfo,
} from './utils/serverUtils';

const logTag = 'eject';

const eject: Eject = async function ({
  bundlePath,
  ejectPath,
  makeHtml,
  publicPath,
  universalAppPath,
}) {
  log('eject():\n%o', arguments[0]);

  const bundleBuildJson = fs.readFileSync(`${bundlePath}/build.json`, 'utf-8');
  const buildInfo = JSON.parse(bundleBuildJson);
  log(`${logTag} enhance(), build.json:\n%o`, buildInfo);

  const { error, assets } = parseWebpackBuildInfo(buildInfo);

  const html = await makeHtml({
    assets,
    requestUrl: '/',
    universalAppPath,
  });

  fs.writeFileSync(ejectPath, html);
};

export default eject;

interface Eject {
  (args: {
    bundlePath: string;
    ejectPath: string;
    makeHtml: MakeHtml;
    publicPath: string;
    universalAppPath: string;
  }): void;
}
