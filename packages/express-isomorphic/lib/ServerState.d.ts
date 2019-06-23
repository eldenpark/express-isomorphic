export declare class ServerState {
    assets?: string[];
    buildHash: number | undefined;
    error?: Error;
    isLaunched: boolean;
    state: State;
    updatedAt: Date | undefined;
    update(obj?: Partial<ServerState>): void;
}
export default ServerState;
interface Error {
    errorObj: any;
    type: string;
}
export interface State {
    [key: string]: any;
}
