import { Extend, ServerCreation } from './createExpress';
declare const localServer: LocalServer;
export default localServer;
interface LocalServer {
    (arg: {
        extend?: Extend;
        makeHtmlPath: any;
        webpackConfig: any;
        webpackStats?: any;
    }): ServerCreation;
}
