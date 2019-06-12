"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createExpress_1 = __importDefault(require("./createExpress"));
const serverUtils_1 = require("./utils/serverUtils");
const log_1 = require("./utils/log");
const productionServer = function ({ extend, makeHtmlPath, webpackBuild, webpackConfig, }) {
    return createExpress_1.default({
        bootstrap: (app, serverState, webpackConfig) => {
            const buildInfo = webpackBuild;
            log_1.log(`bootstrap(): build.json:\n%j`, buildInfo);
            const { error, assets } = serverUtils_1.parseWebpackBuildInfo(buildInfo);
            const makeHtml = require(makeHtmlPath).default || require(makeHtmlPath);
            const { path, publicPath } = webpackConfig.output;
            app.use(publicPath, express_1.default.static(path));
            serverState.update(Object.assign({ assets }, error && {
                error: {
                    type: 'WEBPACK_BUILD_ERROR',
                    errorObj: error,
                },
            }, { isLaunched: true, makeHtml }));
        },
        extend,
        htmlGenerator: ({ requestUrl, serverState, }) => __awaiter(this, void 0, void 0, function* () {
            const { assets, makeHtml = () => 'makeHtml not loaded', state } = serverState;
            return yield makeHtml({
                assets,
                requestUrl,
                state,
            });
        }),
        webpackConfig,
    });
};
exports.default = productionServer;
