import { Extend, MakeHtml, ServerCreation } from './createExpress';
declare const localServer: LocalServer;
export default localServer;
interface LocalServer {
    (arg: {
        ejectPath?: string;
        extend?: Extend;
        makeHtml: MakeHtml;
        publicPath: string;
        serverDistPath: string;
        universalAppPath: string;
        webpackConfig: any;
        webpackConfigClientLocalPath: string;
        webpackConfigUniversalLocalPath: string;
        webpackStats: any;
    }): ServerCreation;
}
