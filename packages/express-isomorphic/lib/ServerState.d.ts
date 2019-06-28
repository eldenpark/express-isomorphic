export default class ServerState<State> {
    error?: Error;
    isLaunched: boolean;
    socketId: string;
    socketPort: number;
    state: State;
    constructor(state: State);
    update(obj: UpdateArgs): void;
}
interface Error {
    errorObj: any;
    type: string;
}
declare type UpdateArgs = Partial<ServerState<any>> & {
    state?: any;
};
export {};
