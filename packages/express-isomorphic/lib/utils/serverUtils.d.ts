export declare const parseWebpackBuild: ParseWebpackBuild;
export declare function attachAssets(assets?: string[]): string;
export declare function requireNonNull(obj: any, msg: string): any;
interface ParseWebpackBuild {
    (buildInfo: WebpackBuild): {
        assets: string[];
        error?: string;
    };
}
interface WebpackBuild {
    assets: any[];
    builtAt: number;
    entrypoints: {
        [key: string]: {
            assets: string[];
        };
    };
    errors: any[];
}
export {};
