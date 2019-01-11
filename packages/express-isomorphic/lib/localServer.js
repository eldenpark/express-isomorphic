"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const del_1 = __importDefault(require("del"));
const webpack_1 = __importDefault(require("webpack"));
const webpack_dev_middleware_1 = __importDefault(require("webpack-dev-middleware"));
const webpack_hot_middleware_1 = __importDefault(require("webpack-hot-middleware"));
const createExpress_1 = __importDefault(require("./createExpress"));
const eject_1 = __importDefault(require("./eject"));
const serverUtils_1 = require("./utils/serverUtils");
const log_1 = require("./utils/log");
const tag = '[localServer]';
const localServer = function ({ ejectPath, extend, makeHtml, publicPath, serverDistPath, universalAppPath, webpackConfigClientLocalPath, webpackConfigUniversalLocalPath, webpackStats, }) {
    return createExpress_1.default({
        _extend: (app, state) => {
            log_1.log('%s serverDistPath: %s webpackConfigClientLocalPath: %s webpackConfigUniversalLocal: %s webpackStats: %o', tag, serverDistPath, webpackConfigClientLocalPath, webpackConfigUniversalLocalPath, webpackStats);
            setupWatchingWebpackUniversalCompiler({
                serverDistPath,
                state,
                webpackConfigUniversalLocalPath,
                webpackStats,
            }).then(() => {
                ejectPath && eject_1.default({
                    assets: state.assets,
                    ejectPath,
                    makeHtml,
                    universalAppPath,
                });
            });
            const webpackConfigClientLocalWeb = require(webpackConfigClientLocalPath);
            log_1.log('%s webpack-client-local will be compiled with config:\n%o', tag, webpackConfigClientLocalWeb);
            const clientWebpackCompiler = webpack_1.default(webpackConfigClientLocalWeb);
            const devMiddleware = webpack_dev_middleware_1.default(clientWebpackCompiler, {
                publicPath: webpackConfigClientLocalWeb.output.publicPath,
                serverSideRender: true,
                stats: webpackStats,
            });
            const hotMiddleware = webpack_hot_middleware_1.default(clientWebpackCompiler, {
                heartbeat: 2000,
                reload: true,
            });
            app.use(devMiddleware);
            app.use(hotMiddleware);
            app.use((req, res, next) => {
                if (state.buildHash !== res.locals.webpackStats.hash) {
                    const info = res.locals.webpackStats.toJson(webpackStats);
                    const { error, assets } = serverUtils_1.parseWebpackBuildInfo(info);
                    state.update(Object.assign({ assets, buildHash: res.locals.webpackStats.hash }, error && {
                        error: {
                            errorObj: error,
                            type: "WATCH_UNIVERSAL_ERROR" /* WATCH_UNIVERSAL_ERROR */,
                        },
                    }, { isLaunched: true }));
                }
                next();
            });
            extend && extend(app, state);
        },
        makeHtml,
        publicPath,
    });
};
exports.default = localServer;
function setupWatchingWebpackUniversalCompiler({ serverDistPath, state, webpackConfigUniversalLocalPath, webpackStats, }) {
    const webpackConfig = require(webpackConfigUniversalLocalPath);
    del_1.default.sync([
        serverDistPath,
    ]);
    log_1.log('%s [watch] webpack-universal-local will be compiled with config:\n%o', tag, webpackConfig);
    const serverWebpackCompiler = webpack_1.default(webpackConfig);
    const watchOptions = {
        aggregateTimeout: 2000,
        poll: undefined,
    };
    return new Promise((resolve, reject) => {
        serverWebpackCompiler.watch(watchOptions, (err, stats) => {
            if (err || stats.hasErrors()) {
                const error = stats.toString('errors-only');
                log_1.log(`%s [watch] [error] webpack-universal-local watch() ${chalk_1.default.red('fails')}:\n%s`, tag, error);
                state.update({
                    error: {
                        type: "WATCH_UNIVERSAL_ERROR" /* WATCH_UNIVERSAL_ERROR */,
                        errorObj: error,
                    },
                });
                reject(error);
            }
            else {
                const info = stats.toJson(webpackStats);
                log_1.log(`%s [watch] webpack-universal-local watch() ${chalk_1.default.green('success')}: at: %s,\n%o`, tag, new Date(), info);
                delete require.cache[state.universalAppPath];
                log_1.log('%s [watch] require cache after deleting universalAppPath (at %s):\n%o', tag, state.universalAppPath, serverUtils_1.getProperRequireCache());
                state.update({
                    error: undefined,
                });
                resolve();
            }
        });
    });
}
