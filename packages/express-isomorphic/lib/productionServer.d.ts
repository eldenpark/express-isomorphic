import { Extend, ServerCreation, WebpackConfig } from './createExpress';
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
        webpackConfig: WebpackConfig;
    }): ServerCreation;
}
export default productionServer;
