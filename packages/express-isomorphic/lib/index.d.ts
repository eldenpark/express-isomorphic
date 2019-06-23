import { Extend, MakeHtml, ServerCreation, WebpackConfig } from './createExpress';
import { WebpackBuild } from './productionServer';
import ServerState from './ServerState';
declare const _default: {
    local: Local;
    production: Production;
};
export default _default;
export { addPath } from './eject';
export { Extend, Local, MakeHtml, Production, ServerState, };
interface Local {
    <State>(arg: {
        extend?: Extend<State>;
        makeHtmlPath: MakeHtmlPath;
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
