import { Application } from 'express';
import { ServerState } from '@nodekit/express-isomorphic';
export declare function withReactLocal<State extends ReactServerState>({ serverState, webpackConfig, webpackStats, }: WithReactLocalArgs<State>): (app: Application) => Application;
export declare function withReactProd<State extends ReactServerState>({ serverState, webpackBuild, webpackConfig, }: WithReactProdArgs<State>): (app: Application) => Application;
export interface WebpackStats {
    chunks: boolean;
    entrypoints: boolean;
    [key: string]: boolean;
}
export interface WebpackConfig {
    output: {
        [key: string]: any;
    };
    [key: string]: any;
}
export interface ReactServerState {
    assets: string[];
    buildHash: string;
}
interface WebpackBuild {
    assets: any[];
    builtAt: number;
    entrypoints: {
        [key: string]: {
            assets: string[];
        };
    };
    errors: any[];
}
interface WithReactLocalArgs<State extends ReactServerState> {
    serverState: ServerState<State>;
    webpackConfig: WebpackConfig;
    webpackStats?: WebpackStats;
}
interface WithReactProdArgs<State extends ReactServerState> {
    serverState: ServerState<State>;
    webpackBuild: WebpackBuild;
    webpackConfig: WebpackConfig;
}
export {};
