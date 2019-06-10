import { Extend, ServerCreation } from './createExpress';
declare const localServer: LocalServer;
export default localServer;
interface LocalServer {
    (arg: {
        ejectPath?: string;
        extend?: Extend;
        makeHtmlPath: any;
        publicPath: string;
        webpackConfig: any;
        webpackStats: any;
    }): ServerCreation;
}
