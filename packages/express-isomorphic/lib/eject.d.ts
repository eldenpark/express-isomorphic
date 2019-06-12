import { Request } from 'express';
import { MakeHtml } from './createExpress';
import { State } from './ServerState';
declare const eject: Eject;
export default eject;
export declare const addPath: any;
export interface Eject {
    (args: {
        assets?: string[];
        ejectPath: string;
        makeHtml: MakeHtml;
        request?: Request;
        state: State;
    }): void;
}
