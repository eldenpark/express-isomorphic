import { Extend, ServerCreation } from './createExpress';
declare const productionServer: ProductionServer;
interface ProductionServer {
    (arg: {
        extend?: Extend;
        makeHtmlPath: string;
        webpackBuild: any;
        webpackConfig: any;
    }): ServerCreation;
}
export default productionServer;
