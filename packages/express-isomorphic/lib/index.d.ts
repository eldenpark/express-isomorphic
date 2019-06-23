import { Extend, MakeHtml, ServerCreation, WebpackConfig, WebpackStats } from './createExpress';
import { WebpackBuild } from './productionServer';
declare const _default: {
    local: Local;
    production: Production;
};
export default _default;
export { addPath } from './eject';
export { attachAssets } from './utils/serverUtils';
export { Extend, Local, MakeHtml, Production, };
interface Local {
    <State>(arg: {
        extend?: Extend<State>;
        makeHtmlPath: MakeHtmlPath;
        webpackConfig: WebpackConfig;
        webpackStats?: WebpackStats;
    }): ServerCreation<State>;
}
interface Production {
    <State>(arg: {
        extend?: Extend<State>;
        makeHtmlPath: MakeHtmlPath;
        webpackBuild: WebpackBuild;
        webpackConfig: WebpackConfig;
    }): ServerCreation<State>;
}
/**
 * makeHtmlPath should be given as the full path to the makeHtml file.
 * express-isomorphic does take the path to the file, not the module, in order that
 * in local devlelopment, relevant files are to be watched.
 */
declare type MakeHtmlPath = string;
