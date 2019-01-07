import { Extend, MakeHtml, ServerCreation } from './createExpress';
declare const server: Server;
interface Server {
    (arg: {
        bundlePath: string;
        extend?: Extend;
        makeHtml: MakeHtml;
        publicPath: string;
        universalAppPath: string;
    }): ServerCreation;
}
export default server;
//# sourceMappingURL=server.d.ts.map