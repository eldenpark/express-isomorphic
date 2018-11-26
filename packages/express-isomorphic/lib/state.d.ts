declare const state: State;
export default state;
export interface State {
    assets: string[] | undefined;
    clientBuildInfo: any;
    error: string | undefined;
    isLaunched: boolean;
    universalAppPath: string | undefined;
    update: (arg: Partial<State>) => void;
    updatedAt: Date | undefined;
    webpackStats: any;
}
//# sourceMappingURL=state.d.ts.map