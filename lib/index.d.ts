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
        ejectPath?: string;
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
        eject: any;
        localServer: () => ServerCreation;
        server: () => ServerCreation;
    };
}
//# sourceMappingURL=index.d.ts.map