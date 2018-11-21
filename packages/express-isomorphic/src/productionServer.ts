import * as fs from 'fs';
import * as express from "express";

import createExpress, { 
  MakeHtml,
  Server,
} from './createExpress';
import { 
  parseWebpackBuildInfo,
} from './utils/serverUtils';
import { log } from './utils/log';

const productionServer: ProductionServer = function ({
  bundlePath,
  makeHtml,
  publicPath,
  universalAppPath,
}) {
  return createExpress({
    enhance: (app, state) => {
      const bundleBuildJson = fs.readFileSync(`${bundlePath}/build.json`, 'utf-8');
      const buildInfo = JSON.parse(bundleBuildJson);
      log('[server-prod] enhance(), build.json:\n%o', buildInfo);
  
      const { error, assets } = parseWebpackBuildInfo(buildInfo);
          
      state.update({
        assets,
        ...error && { error },
        isLaunched: true,
        universalAppPath,
      });
    },
    makeHtml,
    publicPath,
  });
};

interface ProductionServer {
  (arg: {
    bundlePath: string;
    makeHtml: MakeHtml;
    publicPath: string;
    universalAppPath: string;
  }): Server;
} 

export default productionServer;
