export default class ServerState<State> {
    error?: Error;
    isLaunched: boolean;
    state: State;
    update(obj: any): void;
}
interface Error {
    errorObj: any;
    type: string;
}
export {};
