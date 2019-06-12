import { WebpackBuild } from '../productionServer';
export declare const parseWebpackBuild: ParseWebpackBuild;
export declare function attachAssets(assets?: string[]): string;
export declare function requireNonNull(obj: any, msg: string): any;
interface ParseWebpackBuild {
    (buildInfo: WebpackBuild): {
        assets: string[];
        error?: string;
    };
}
export {};
