import express from "express";
import { ServerState, State } from './ServerState';
declare const createExpress: CreateExpress;
export default createExpress;
export interface ServerCreation {
    app: express.Application;
    serverState: ServerState;
}
export interface MakeHtml {
    (arg: {
        assets: string[] | undefined;
        requestUrl: string;
        state: State;
    }): Promise<string>;
}
export interface WebpackStats {
    chunks: boolean;
    entrypoints: boolean;
    [key: string]: boolean;
}
export interface Extend {
    (app: express.Application, serverState: ServerState): void;
}
export interface WebpackConfig {
    output: {
        [key: string]: any;
    };
    [key: string]: any;
}
interface CreateExpress {
    (arg: {
        bootstrap: (app: express.Application, serverState: ServerState) => void;
        extend?: Extend;
        htmlGenerator: HtmlGenerator;
    }): ServerCreation;
}
interface HtmlGenerator {
    (arg: {
        requestUrl: string;
        serverState: ServerState;
    }): Promise<string> | string;
}
