export declare const parseWebpackBuildInfo: ParseWebpackBuildInfo;
export declare function attachAssets(assets?: string[]): string;
export declare function requireNonNull(obj: any, msg: string): any;
export interface WebpackBuildInfo {
    chunks: any[];
    entrypoints: {
        [entryPoint: string]: {
            assets: string[];
        };
    };
    errors: string[];
}
interface ParseWebpackBuildInfo {
    (buildInfo: WebpackBuildInfo): {
        assets: string[];
        error?: string;
    };
}
export {};
