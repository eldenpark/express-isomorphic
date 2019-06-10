export declare const parseWebpackBuildInfo: ParseWebpackBuildInfo;
export declare function attachAssets(assets?: string[]): string;
export interface WebpackBuildInfo {
    chunks: any[];
    entrypoints: any;
    errors: string[];
}
interface ParseWebpackBuildInfo {
    (buildInfo: WebpackBuildInfo): {
        assets: string[];
        error?: string;
    };
}
export {};
