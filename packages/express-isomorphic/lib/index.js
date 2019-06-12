"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const localServer_1 = __importDefault(require("./localServer"));
const productionServer_1 = __importDefault(require("./productionServer"));
const create = function ({ extend, makeHtmlPath, webpackBuild, webpackConfig, webpackStats = defaultWebpackStats, }) {
    return {
        eject: ({ ejectPath, }) => localServer_1.default({
            ejectPath,
            extend,
            makeHtmlPath,
            webpackConfig,
            webpackStats,
        }),
        localServer: () => localServer_1.default({
            extend,
            makeHtmlPath,
            webpackConfig,
            webpackStats,
        }),
        server: () => productionServer_1.default({
            extend,
            makeHtmlPath,
            webpackBuild,
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
