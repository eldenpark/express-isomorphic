import { MakeHtml, Server, WebpackStats } from './createExpress';
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
        bundlePath: string;
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
        localServer: () => Server;
        productionServer: () => Server;
    };
}
//# sourceMappingURL=index.d.ts.map