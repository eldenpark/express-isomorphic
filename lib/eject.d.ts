import { MakeHtml } from './createExpress';
declare const eject: Eject;
export default eject;
interface Eject {
    (args: {
        bundlePath: string;
        ejectPath: string;
        makeHtml: MakeHtml;
        publicPath: string;
        universalAppPath: string;
    }): void;
}
//# sourceMappingURL=eject.d.ts.map