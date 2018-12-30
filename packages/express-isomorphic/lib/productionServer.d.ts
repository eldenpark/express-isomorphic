import { Extend, MakeHtml, Server } from './createExpress';
declare const productionServer: ProductionServer;
interface ProductionServer {
    (arg: {
        bundlePath: string;
        extend?: Extend;
        makeHtml: MakeHtml;
        publicPath: string;
        universalAppPath: string;
    }): Server;
}
export default productionServer;
//# sourceMappingURL=productionServer.d.ts.map