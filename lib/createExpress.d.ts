import express from "express";
import { State } from './state';
declare const createExpress: CreateExpress;
export default createExpress;
export interface Server {
    app: express.Application;
    state: State;
}
export interface MakeHtml {
    (arg: {
        assets: string[] | undefined;
        requestUrl: string;
        universalAppPath: string | undefined;
    }): Promise<string>;
}
export interface WebpackStats {
    chunks: boolean;
    entrypoints: boolean;
    [x: string]: boolean;
}
interface CreateExpress {
    (arg: {
        enhance: (app: express.Application, state: State) => any;
        makeHtml: MakeHtml;
        publicPath: string;
    }): Server;
}
//# sourceMappingURL=createExpress.d.ts.map