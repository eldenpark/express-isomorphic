import { MakeHtml } from './createExpress';
import { State } from './state';
declare const eject: Eject;
export default eject;
export declare const addPath: any;
export interface Eject {
    (args: {
        assets?: string[];
        ejectPath: string;
        makeHtml: MakeHtml;
        state: State;
    }): void;
}
