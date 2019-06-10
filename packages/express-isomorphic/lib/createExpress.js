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
const chalk_1 = __importDefault(require("chalk"));
const express_1 = __importDefault(require("express"));
const log_1 = require("./utils/log");
const state_1 = __importDefault(require("./state"));
const createExpress = function ({ bootstrap = (state) => [], extend, makeHtml, webpackConfig, }) {
    log_1.log('createExpress(): NODE_ENV: %s', process.env.NODE_ENV);
    const _publicPath = webpackConfig && webpackConfig.output.publicPath;
    const app = express_1.default();
    extend && extend(app, state_1.default);
    const middlewares = bootstrap(state_1.default);
    app.use([
        ...middlewares,
        express_1.default.static(_publicPath),
    ]);
    app.get('*', [
        serveHtml(state_1.default, makeHtml),
    ]);
    return {
        app,
        state: state_1.default,
    };
};
const serveHtml = (state, makeHtml) => ((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    res.writeHead(200, { "Content-Type": "text/html" });
    try {
        const html = yield makeHtml({
            assets: state.assets,
            requestUrl: req.url,
        });
        res.end(html);
    }
    catch (err) {
        log_1.log(`serveHtml(): ${chalk_1.default.red('failed')} to create html: %o`, err);
        res.end('Failed to create html');
    }
}));
exports.default = createExpress;
