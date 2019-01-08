"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const localServer_1 = __importDefault(require("./localServer"));
const eject_1 = __importDefault(require("./eject"));
const server_1 = __importDefault(require("./server"));
const create = function ({ extend, makeHtml, publicPath, serverDistPath, universalAppPath, webpackBuildJsonPath, webpackConfigClientLocalPath, webpackConfigUniversalLocalPath, webpackStats = defaultWebpackStats, }) {
    return {
        eject: ({ ejectPath, }) => eject_1.default({
            ejectPath,
            makeHtml,
            publicPath,
            universalAppPath,
            webpackBuildJsonPath,
        }),
        localServer: () => localServer_1.default({
            extend,
            makeHtml,
            publicPath,
            serverDistPath,
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
};
exports.webpackStats = defaultWebpackStats;
exports.default = ExpressIsomorphic;
var serverUtils_1 = require("./utils/serverUtils");
exports.attachAssets = serverUtils_1.attachAssets;
