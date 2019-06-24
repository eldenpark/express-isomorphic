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
const fs_1 = __importDefault(require("fs"));
const logger_1 = require("@nodekit/logger");
const mkdirp_1 = __importDefault(require("mkdirp"));
const path_1 = __importDefault(require("path"));
const log = logger_1.logger('[express-isomorphic]');
class EjectServer {
    constructor() {
        this.paths = [];
    }
    addPath(_path) {
        this.paths.push(_path);
    }
}
const ejectServerInstance = new EjectServer();
const eject = function eject({ assets, ejectPath, makeHtml, serverState, }) {
    return __awaiter(this, arguments, void 0, function* () {
        log('eject():\n%o', arguments[0]); // eslint-disable-line
        if (!ejectPath) {
            throw new Error('eject() cannot operate without valid ejectPath');
        }
        mkdirp_1.default.sync(ejectPath);
        log('eject(): assets:\n%o', assets);
        log('eject(): route paths: %o', ejectServerInstance.paths);
        const html = yield makeHtml({
            requestUrl: '',
            serverState,
        });
        try {
            fs_1.default.writeFileSync(path_1.default.resolve(ejectPath, 'power.html'), html);
            log(`eject(): ${chalk_1.default.green('success')}`);
        }
        catch (err) {
            log('eject(): error: %o', err);
        }
        // Terminate the program after ejecting.
        process.exit(0);
    });
};
exports.default = eject;
exports.addPath = ejectServerInstance.addPath.bind(ejectServerInstance);
