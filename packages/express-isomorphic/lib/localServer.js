"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const del_1 = __importDefault(require("del"));
const path = __importStar(require("path"));
const webpack_1 = __importDefault(require("webpack"));
const webpack_dev_middleware_1 = __importDefault(require("webpack-dev-middleware"));
const webpack_hot_middleware_1 = __importDefault(require("webpack-hot-middleware"));
const createExpress_1 = __importDefault(require("./createExpress"));
const serverUtils_1 = require("./utils/serverUtils");
const log_1 = require("./utils/log");
const localServer = function ({ makeHtml, publicPath, serverDistPath, webpackConfigClientLocalPath, webpackConfigUniversalLocalPath, webpackStats, }) {
    return createExpress_1.default({
        enhance: (app, state) => {
            log_1.log(`localServer()
serverDistPath: %s
webpackConfigClientLocalPath: %s
webpackConfigUniversalLocal: %s
webpackStats: %o`, serverDistPath, webpackConfigClientLocalPath, webpackConfigUniversalLocalPath, webpackStats);
            setupWatchingWebpackUniversalCompiler({
                serverDistPath,
                state,
                webpackConfigUniversalLocalPath,
                webpackStats,
            });
            const webpackConfigClientLocalWeb = require(webpackConfigClientLocalPath);
            log_1.log('[server-local] webpack-client-local will be compiled with config:\n%o', webpackConfigClientLocalWeb);
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
                if (!state.assets) {
                    const info = res.locals.webpackStats.toJson(webpackStats);
                    const { error, assets } = serverUtils_1.parseWebpackBuildInfo(info);
                    state.update(Object.assign({}, error && { error }, { assets }));
                }
                next();
            });
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
    log_1.log('[server-local] webpack-universal-local will be compiled with config:\n%o', webpackConfig);
    const serverWebpackCompiler = webpack_1.default(webpackConfig);
    const watchOptions = {
        aggregateTimeout: 2000,
        poll: undefined,
    };
    serverWebpackCompiler.watch(watchOptions, (err, stats) => {
        if (err || stats.hasErrors()) {
            const errorJson = stats.toString('errors-only');
            log_1.log('[server-local] [error] webpack-universal-local watch() fails:\n%s', errorJson);
        }
        else {
            const info = stats.toJson(webpackStats);
            log_1.log('[server-local] webpack-universal-local watch() success: at: %s,\n%o', new Date(), info);
            // fs.writeFileSync(`${paths.distServer}/build.json`, JSON.stringify(info, null, 2));
            delete require.cache[state.universalAppPath];
            log_1.log('[server-local] require cache after deleting universalAppPath (%s):\n%o', state.universalAppPath, serverUtils_1.getProperRequireCache());
            const universalAppPath = path.resolve(serverDistPath, 'universal.local.rootContainer.js');
            state.update({
                isLaunched: true,
                universalAppPath,
            });
        }
    });
}
