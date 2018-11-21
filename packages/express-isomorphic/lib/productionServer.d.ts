import { MakeHtml, Server } from './createExpress';
declare const productionServer: ProductionServer;
interface ProductionServer {
    (arg: {
        bundlePath: string;
        makeHtml: MakeHtml;
        publicPath: string;
        universalAppPath: string;
    }): Server;
}
export default productionServer;
//# sourceMappingURL=productionServer.d.ts.map