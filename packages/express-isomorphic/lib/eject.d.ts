import { Request } from 'express';
import { MakeHtml } from './createExpress';
import ServerState from './ServerState';
declare const eject: Eject;
export default eject;
export declare const addPath: any;
export interface Eject {
    <State>(args: {
        assets?: string[];
        ejectPath: string;
        makeHtml: MakeHtml<State>;
        request?: Request;
        serverState: ServerState<State>;
    }): void;
}
