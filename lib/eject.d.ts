import { MakeHtml } from './createExpress';
import { State } from './state';
declare const eject: Eject;
export default eject;
export interface Eject {
    (args: {
        assets?: string[];
        ejectPath: string;
        makeHtml: MakeHtml;
        state: State;
    }): void;
}
