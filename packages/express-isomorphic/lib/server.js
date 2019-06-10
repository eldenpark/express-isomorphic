"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const createExpress_1 = __importDefault(require("./createExpress"));
const serverUtils_1 = require("./utils/serverUtils");
const log_1 = require("./utils/log");
const tag = 'server';
const server = function ({ extend, makeHtml, publicPath, universalAppPath, webpackBuildJsonPath, webpackConfig, }) {
    return createExpress_1.default({
        bootstrap: (state) => {
            const bundleBuildJson = fs.readFileSync(webpackBuildJsonPath, 'utf-8');
            const buildInfo = JSON.parse(bundleBuildJson);
            log_1.log(`%s enhance(), build.json:\n%o`, tag, buildInfo);
            const { error, assets } = serverUtils_1.parseWebpackBuildInfo(buildInfo);
            state.update(Object.assign({ assets }, error && {
                error: {
                    type: "BUILD_ERROR" /* BUILD_ERROR */,
                    errorObj: error,
                },
            }, { isLaunched: true, universalAppPath }));
            return [];
        },
        extend,
        makeHtml,
        webpackConfig,
    });
};
exports.default = server;
