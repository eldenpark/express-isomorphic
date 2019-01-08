import { MakeHtml } from './createExpress';
declare const eject: Eject;
export default eject;
interface Eject {
    (args: {
        ejectPath: string;
        makeHtml: MakeHtml;
        publicPath: string;
        universalAppPath: string;
        webpackBuildJsonPath: string;
    }): void;
}
//# sourceMappingURL=eject.d.ts.map