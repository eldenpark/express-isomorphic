import express from "express";
declare const createExpress: CreateExpress;
export default createExpress;
export interface State {
    assets: string[] | undefined;
    clientBuildInfo: any;
    error: string | undefined;
    isLaunched: boolean;
    universalAppPath: string | undefined;
    update: (arg: Partial<State>) => void;
    webpackStats: any;
}
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
interface CreateExpress {
    (arg: {
        enhance: (app: express.Application, state: State) => any;
        makeHtml: MakeHtml;
        publicPath: string;
    }): Server;
}
//# sourceMappingURL=createExpress.d.ts.map