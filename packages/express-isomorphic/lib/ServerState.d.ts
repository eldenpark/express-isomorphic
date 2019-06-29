import { Server } from 'socket.io';
export default class ServerState<State> {
    error?: Error;
    isLaunched: boolean;
    socketPath: string;
    socketPort: number;
    state: State;
    unstringifiedProperties: Map<String, any>;
    constructor(state: State);
    io: Server | undefined;
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
