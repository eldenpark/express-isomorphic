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
    <State>(arg: {
        extend?: Extend<State>;
        makeHtmlPath: string;
    }): ServerCreation<State>;
}
export default productionServer;
