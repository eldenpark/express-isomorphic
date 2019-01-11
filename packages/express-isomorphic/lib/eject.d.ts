import { MakeHtml } from './createExpress';
declare const eject: Eject;
export default eject;
export interface Eject {
    (args: {
        assets?: string[];
        ejectPath: string;
        makeHtml: MakeHtml;
        universalAppPath: string;
    }): void;
}
//# sourceMappingURL=eject.d.ts.map