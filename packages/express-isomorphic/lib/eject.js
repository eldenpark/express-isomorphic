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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const fs = __importStar(require("fs"));
const mkdirp_1 = __importDefault(require("mkdirp"));
const path_1 = __importDefault(require("path"));
const log_1 = require("./utils/log");
const tag = 'eject';
class EjectServer {
    constructor() {
        this.paths = [];
    }
    addPath(path) {
        this.paths.push(path);
    }
}
const ejectServerInstance = new EjectServer();
const eject = function ({ assets, ejectPath, makeHtml, state, }) {
    return __awaiter(this, arguments, void 0, function* () {
        log_1.log('eject():\n%o', arguments[0]);
        if (!ejectPath) {
            throw new Error('eject() cannot operate without valid ejectPath');
        }
        mkdirp_1.default.sync(ejectPath);
        log_1.log('%s, assets:\n%o', tag, assets);
        log_1.log('eject route paths: %o', ejectServerInstance.paths);
        const html = yield makeHtml({
            assets,
            requestUrl: '',
            resLocals: {},
        });
        try {
            fs.writeFileSync(path_1.default.resolve(ejectPath, 'power.html'), html);
            log_1.log(`eject ${chalk_1.default.green('success')}`);
        }
        catch (err) {
            log_1.log('%s error: %o', tag, err);
        }
        // Terminate the program after ejecting.
        process.exit(0);
    });
};
exports.default = eject;
exports.addPath = ejectServerInstance.addPath.bind(ejectServerInstance);
