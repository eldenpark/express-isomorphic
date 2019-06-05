"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const localServer_1 = __importDefault(require("./localServer"));
const server_1 = __importDefault(require("./server"));
const create = function ({ extend, makeHtml, publicPath, serverDistPath, universalAppPath, webpackBuildJsonPath, webpackConfig, webpackConfigClientLocalPath, webpackConfigUniversalLocalPath, webpackStats = defaultWebpackStats, }) {
    return {
        eject: ({ ejectPath, }) => localServer_1.default({
            ejectPath,
            extend,
            makeHtml,
            publicPath,
            serverDistPath,
            universalAppPath,
            webpackConfig,
            webpackConfigClientLocalPath,
            webpackConfigUniversalLocalPath,
            webpackStats,
        }),
        localServer: () => localServer_1.default({
            extend,
            makeHtml,
            publicPath,
            serverDistPath,
            universalAppPath,
            webpackConfig,
            webpackConfigClientLocalPath,
            webpackConfigUniversalLocalPath,
            webpackStats,
        }),
        server: () => server_1.default({
            extend,
            makeHtml,
            publicPath,
            universalAppPath,
            webpackBuildJsonPath,
            webpackConfig,
        }),
    };
};
const ExpressIsomorphic = {
    create,
};
const defaultWebpackStats = {
    all: false,
    assets: true,
    builtAt: true,
    chunks: true,
    color: true,
    entrypoints: true,
    errors: true,
};
exports.webpackStats = defaultWebpackStats;
exports.default = ExpressIsomorphic;
var eject_1 = require("./eject");
exports.addPath = eject_1.addPath;
var serverUtils_1 = require("./utils/serverUtils");
exports.attachAssets = serverUtils_1.attachAssets;
exports.requireUniversalComponent = serverUtils_1.requireUniversalComponent;
