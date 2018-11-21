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
const log_1 = require("./utils/log");
const createExpress = function ({ enhance = (app, state) => { }, makeHtml, publicPath, }) {
    const app = express_1.default();
    const state = {
        assets: undefined,
        clientBuildInfo: undefined,
        error: undefined,
        isLaunched: false,
        universalAppPath: undefined,
        update(obj = {}) {
            log_1.log('[state] state will update with:\n%o', obj);
            for (let key in this) {
                if (obj[key]) {
                    this[key] = obj[key];
                }
            }
        },
        webpackStats: undefined,
    };
    app.use(htmlLogger);
    enhance(app, state);
    app.use(express_1.default.static(publicPath));
    app.get("*", (req, res) => __awaiter(this, void 0, void 0, function* () {
        if (!state.isLaunched) {
            res.writeHead(500);
            res.end('server is not launched yet');
        }
        else if (state.error) {
            res.writeHead(500);
            res.end('Server is not successfully launched: %s', state.error);
        }
        else {
            res.writeHead(200, { "Content-Type": "text/html" });
            try {
                const html = yield makeHtml({
                    assets: state.assets,
                    requestUrl: req.url,
                    universalAppPath: state.universalAppPath,
                });
                res.end(html);
            }
            catch (err) {
                log_1.log('[express] failed to create html: %o', err);
                res.end('Failed to create html');
            }
        }
    }));
    return {
        app,
        state,
    };
};
exports.default = createExpress;
function htmlLogger(req, res, next) {
    log_1.log('[express] %s url: %s, user agent: %s', new Date(), req.url, req.get('User-Agent'));
    next();
}
