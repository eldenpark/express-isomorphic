export declare class ServerState {
    assets?: string[];
    buildHash: number | undefined;
    error?: Error;
    isLaunched: boolean;
    makeHtml?: Function;
    state: State;
    updatedAt: Date | undefined;
    update(obj?: Partial<ServerState>): void;
}
export default ServerState;
interface Error {
    type: string;
    errorObj: any;
}
export interface State {
    [key: string]: any;
}
