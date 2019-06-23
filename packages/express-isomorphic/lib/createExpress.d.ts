import express from 'express';
import ServerState from './ServerState';
declare function createExpress<State>({ bootstrap, extend, htmlGenerator, }: {
    bootstrap: any;
    extend: any;
    htmlGenerator: any;
}): {
    app: import("express-serve-static-core").Express;
    serverState: ServerState<State>;
};
export default createExpress;
export interface ServerCreation<State> {
    app: express.Application;
    serverState: ServerState<State>;
}
export interface MakeHtml<State> {
    (arg: MakeHtmlPayload<State>): Promise<string> | string;
}
export interface MakeHtmlPayload<State> {
    requestUrl: string;
    serverState: ServerState<State>;
}
export interface WebpackStats {
    chunks: boolean;
    entrypoints: boolean;
    [key: string]: boolean;
}
export interface Extend<State> {
    (app: express.Application, serverState: ServerState<State>): void;
}
export interface WebpackConfig {
    output: {
        [key: string]: any;
    };
    [key: string]: any;
}
