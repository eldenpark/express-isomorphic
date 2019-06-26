export default class ServerState<State> {
    error?: Error;
    isLaunched: boolean;
    state: State;
    constructor(state: any);
    update(obj: UpdateArgs): void;
}
interface Error {
    errorObj: any;
    type: string;
}
declare type UpdateArgs = Partial<ServerState<any>> & {
    state: any;
};
export {};
