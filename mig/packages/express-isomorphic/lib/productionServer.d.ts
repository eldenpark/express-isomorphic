import { Extend, ServerCreation } from './createExpress';
declare const productionServer: ProductionServer;
export interface WebpackBuild {
    assets: any[];
    builtAt: number;
    entrypoints: {
        [key: string]: {
            assets: string[];
        };
    };
    errors: any[];
}
interface ProductionServer {
    (arg: {
        extend?: Extend;
        makeHtmlPath: string;
        webpackBuild: WebpackBuild;
    }): ServerCreation;
}
export default productionServer;
