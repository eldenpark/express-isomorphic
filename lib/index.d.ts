import { Extend, MakeHtml, ServerCreation, WebpackStats } from './createExpress';
declare const ExpressIsomorphic: ExpressIsomorphicType;
declare const defaultWebpackStats: {
    all: boolean;
    assets: boolean;
    builtAt: boolean;
    chunks: boolean;
    color: boolean;
    entrypoints: boolean;
};
export default ExpressIsomorphic;
export { attachAssets } from './utils/serverUtils';
export { defaultWebpackStats as webpackStats };
interface ExpressIsomorphicType {
    create: Create;
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
        webpackConfigClientLocalPath: string;
        webpackConfigUniversalLocalPath: string;
        webpackStats?: WebpackStats;
    }): {
        eject: (arg: {
            ejectPath: string;
        }) => void;
        /**
         * Express application. localServer has built-in HMR functionality and dynamically
         * compiles files. This does not use pre-built bundle. It
         */
        localServer: () => ServerCreation;
        /**
         * Express application. server uses pre-built bundle.
         */
        server: () => ServerCreation;
    };
}
//# sourceMappingURL=index.d.ts.map