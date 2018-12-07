"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const localServer_1 = __importDefault(require("./localServer"));
const productionServer_1 = __importDefault(require("./productionServer"));
const eject_1 = __importDefault(require("./eject"));
const create = function ({ bundlePath, ejectPath = '', makeHtml, publicPath, serverDistPath, universalAppPath, webpackConfigClientLocalPath, webpackConfigUniversalLocalPath, webpackStats = defaultWebpackStats, }) {
    return {
        eject: () => eject_1.default({
            bundlePath,
            ejectPath,
            makeHtml,
            publicPath,
            universalAppPath,
        }),
        localServer: () => localServer_1.default({
            makeHtml,
            publicPath,
            serverDistPath,
            webpackConfigClientLocalPath,
            webpackConfigUniversalLocalPath,
            webpackStats,
        }),
        productionServer: () => productionServer_1.default({
            bundlePath,
            makeHtml,
            publicPath,
            universalAppPath,
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
