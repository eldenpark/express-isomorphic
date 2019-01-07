import _localServer from './localServer';
import _eject from './eject';
import { 
  Extend,
  MakeHtml,
  ServerCreation,
  WebpackStats,
} from './createExpress';
import _server from './server';

const create: Create = function ({
  bundlePath,
  ejectPath = '',
  extend,
  makeHtml,
  publicPath,
  serverDistPath,
  universalAppPath,
  webpackConfigClientLocalPath,
  webpackConfigUniversalLocalPath,
  webpackStats = defaultWebpackStats,
}) {
  return {
    eject: () => _eject({
      bundlePath,
      ejectPath,
      makeHtml,
      publicPath,
      universalAppPath,
    }),
    localServer: () => _localServer({
      extend,
      makeHtml,
      publicPath,
      serverDistPath,
      webpackConfigClientLocalPath,
      webpackConfigUniversalLocalPath,
      webpackStats,
    }),
    server: () => _server({
      bundlePath,
      extend,
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

export { defaultWebpackStats as webpackStats }

interface ExpressIsomorphicType {
  create: Create,
}

interface Create {
  (arg: {
    bundlePath: string;
    extend?: Extend;
    ejectPath?: string;
    makeHtml: MakeHtml;
    publicPath: string;
    serverDistPath: string;
    universalAppPath: string;
    webpackConfigClientLocalPath: string;
    webpackConfigUniversalLocalPath: string;
    webpackStats?: WebpackStats;
  }): {
    eject: any;
    localServer: () => ServerCreation;
    server: () => ServerCreation;
  };
}
