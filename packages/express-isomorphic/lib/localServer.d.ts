import { Extend, MakeHtml, ServerCreation } from './createExpress';
declare const localServer: LocalServer;
export default localServer;
interface LocalServer {
    (arg: {
        extend?: Extend;
        makeHtml: MakeHtml;
        publicPath: string;
        serverDistPath: string;
        webpackConfigClientLocalPath: string;
        webpackConfigUniversalLocalPath: string;
        webpackStats: any;
    }): ServerCreation;
}
//# sourceMappingURL=localServer.d.ts.map