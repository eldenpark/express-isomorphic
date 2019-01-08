import { Extend, MakeHtml, ServerCreation } from './createExpress';
declare const server: Server;
interface Server {
    (arg: {
        extend?: Extend;
        makeHtml: MakeHtml;
        publicPath: string;
        universalAppPath: string;
        webpackBuildJsonPath: string;
    }): ServerCreation;
}
export default server;
//# sourceMappingURL=server.d.ts.map