import _localServer from './localServer';
import {
  Extend,
  MakeHtml,
  ServerCreation,
  WebpackStats,
} from './createExpress';
import _server from './server';

const create: Create = function ({
  extend,
  makeHtml,
  makeHtmlPath,
  publicPath,
  universalAppPath,
  webpackBuildJsonPath,
  webpackConfig,
  webpackStats = defaultWebpackStats,
}) {
  return {
    eject: ({
      ejectPath,
    }) => _localServer({
      ejectPath,
      extend,
      makeHtmlPath,
      publicPath,
      webpackConfig,
      webpackStats,
    }),
    localServer: () => _localServer({
      extend,
      makeHtmlPath,
      publicPath,
      webpackConfig,
      webpackStats,
    }),
    server: () => _server({
      extend,
      makeHtml,
      publicPath,
      universalAppPath,
      webpackBuildJsonPath,
      webpackConfig,
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
  errors: true,
};

export default ExpressIsomorphic;

export { addPath } from './eject';

export { attachAssets } from './utils/serverUtils';

export {
  Extend,
  MakeHtml,
  defaultWebpackStats as webpackStats,
}

interface ExpressIsomorphicType {
  create: Create,
}

interface Create {
  (arg: {
    /**
     * Function to use if you want to extend Express application.
     */
    extend?: Extend;
    /**
     * On server side rendering, makeHtml() is called to serve static html.
     */
    makeHtml: MakeHtml;
    makeHtmlPath: any;
    /**
     * express public path
     */
    publicPath: string;
    serverDistPath: string;
    /**
     * The path to universal app entry. It is dynamically generated with localServer.
     * If you use server, then it should be predetermined.
     */
    universalAppPath: string;
    /**
     * The path of webpack build object.
     */
    webpackBuildJsonPath: string;
    webpackConfig: any;
    webpackConfigClientLocalPath: string;
    webpackConfigUniversalLocalPath: string;
    webpackStats?: WebpackStats;
  }): {
    eject: (arg: {
      ejectPath: string;
    }) => void;
    /**
     * Express application. localServer has built-in HMR functionality and dynamically
     * compiles files. This does not use pre-built bundle.
     */
    localServer: () => ServerCreation;
    /**
     * Express application. server uses pre-built bundle.
     */
    server: () => ServerCreation;
  };
}
