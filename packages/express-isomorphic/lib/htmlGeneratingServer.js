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
const yargs_1 = require("yargs");
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const log_1 = require("./utils/log");
log_1.log('htmlGeneratingServer(): command line arguments: %o', yargs_1.argv);
const app = express_1.default();
const port = yargs_1.argv.port || 10021;
const makeHtmlPath = requireNonEmpty(yargs_1.argv.makeHtmlPath, 'makeHtmlPath should be provided');
const makeHtml = require(makeHtmlPath).default || require(makeHtmlPath);
app.use(body_parser_1.default.json());
app.post('/makeHtml', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { assets } = req.body;
    const html = yield makeHtml({
        assets,
    });
    res.send(html);
}));
app.listen(port, () => {
    log_1.log('htmlGeneratingServer(): listening on port: %s', port);
});
function requireNonEmpty(obj, msg) {
    if (!obj || obj === '') {
        throw new Error(`requireNonEmpty(): ${msg}`);
    }
    else {
        return obj;
    }
}
