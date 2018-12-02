import createLocalServer from './localServer';
import createProductionServer from './productionServer';
import { 
  MakeHtml,
  Server,
  WebpackStats,
} from './createExpress';

const create: Create = function ({
  bundlePath,
  makeHtml,
  publicPath,
  serverDistPath,
  universalAppPath,
  webpackConfigClientLocalPath,
  webpackConfigUniversalLocalPath,
  webpackStats = defaultWebpackStats,
}) {
  return {
    localServer: () => createLocalServer({
      makeHtml,
      publicPath,
      serverDistPath,
      webpackConfigClientLocalPath,
      webpackConfigUniversalLocalPath,
      webpackStats,
    }),
    productionServer: () => createProductionServer({
      bundlePath,
      makeHtml,
      publicPath,
      universalAppPath,
    }),
  };
};

const ExpressIsomorphic: ExpressIsomorphicType = {
  create,
};

const defaultWebpackStats = {
  all: false,
  assets: true,
  builtAt: true,
  chunks: true,
  color: true,
  entrypoints: true,
};

export default ExpressIsomorphic;

export { attachAssets } from './utils/serverUtils';

interface ExpressIsomorphicType {
  create: Create,
}

interface Create {
  (arg: {
    bundlePath: string;
    makeHtml: MakeHtml;
    publicPath: string;
    serverDistPath: string;
    universalAppPath: string;
    webpackConfigClientLocalPath: string;
    webpackConfigUniversalLocalPath: string;
    webpackStats?: WebpackStats;
  }): {
    localServer: () => Server;
    productionServer: () => Server;
  };
}
