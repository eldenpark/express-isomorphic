import express from 'express';
import ServerState from './ServerState';
declare const createExpress: CreateExpress;
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
export interface Extend<State> {
    (app: express.Application, serverState: ServerState<State>): void;
}
export interface WebpackConfig {
    output: {
        [key: string]: any;
    };
    [key: string]: any;
}
interface CreateExpress {
    <State>(arg: {
        bootstrap: (app: express.Application, serverState: ServerState<State>) => void;
        extend?: Extend<State>;
        htmlGenerator: HtmlGenerator<State>;
    }): ServerCreation<State>;
}
interface HtmlGenerator<State> {
    (arg: {
        requestUrl: string;
        serverState: ServerState<State>;
    }): Promise<string>;
}
