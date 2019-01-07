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
const util_1 = __importDefault(require("util"));
const env_1 = require("./env");
const log_1 = require("./utils/log");
const state_1 = __importDefault(require("./state"));
const createExpress = function ({ _extend = (app, state) => { }, makeHtml, publicPath, }) {
    log_1.log('NODE_ENV: %s', process.env.NODE_ENV);
    const app = express_1.default();
    app.use(htmlLogger);
    _extend(app, state_1.default);
    app.use(express_1.default.static(publicPath));
    app.get("*", (req, res) => __awaiter(this, void 0, void 0, function* () {
        log_1.log('server is last updated at: %o, assets: %s, buildHash: %s', state_1.default.updatedAt, state_1.default.assets, state_1.default.buildHash);
        if (!state_1.default.isLaunched) {
            res.writeHead(500);
            res.end('server is not launched yet');
        }
        else if (state_1.default.error) {
            const errorMsg = !env_1.isProduction
                ? util_1.default.format('Server is not successfully launched: %s', state_1.default.error)
                : 'Server is not successfully launched. Check out the log';
            res.writeHead(500);
            res.end(errorMsg);
        }
        else {
            res.writeHead(200, { "Content-Type": "text/html" });
            try {
                const html = yield makeHtml({
                    assets: state_1.default.assets,
                    requestUrl: req.url,
                    universalAppPath: state_1.default.universalAppPath,
                });
                res.end(html);
            }
            catch (err) {
                log_1.log(`[express] ${chalk_1.default.red('failed')} to create html: %o`, err);
                res.end('Failed to create html');
            }
        }
    }));
    return {
        app,
        state: state_1.default,
    };
};
exports.default = createExpress;
function htmlLogger(req, res, next) {
    log_1.log('[express] %s url: %s, user agent: %s', new Date(), req.url, req.get('User-Agent'));
    next();
}
