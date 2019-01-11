import ErrorType from './ErrorType';
export declare class State {
    assets?: string[];
    buildHash: number | undefined;
    error?: Error;
    isLaunched: boolean;
    universalAppPath: string | undefined;
    updatedAt: Date | undefined;
    update(obj?: Partial<State>): void;
}
declare const _default: State;
export default _default;
interface Error {
    type: ErrorType;
    errorObj: any;
}
//# sourceMappingURL=state.d.ts.map