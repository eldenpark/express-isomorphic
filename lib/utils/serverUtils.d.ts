export declare const parseWebpackBuildInfo: ParseWebpackBuildInfo;
export declare function getProperRequireCache(): string[];
export declare function attachAssets(assets?: string[]): string;
interface ParseWebpackBuildInfo {
    (buildInfo: WebpackBuildInfo): {
        assets: string[];
        error?: string;
    };
}
interface WebpackBuildInfo {
    chunks: any[];
    entrypoints: any;
    errors: string[];
}
export {};
//# sourceMappingURL=serverUtils.d.ts.map