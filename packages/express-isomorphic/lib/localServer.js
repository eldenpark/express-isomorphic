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
const axios_1 = __importDefault(require("axios"));
const chalk_1 = __importDefault(require("chalk"));
const http_1 = __importDefault(require("http"));
const logger_1 = require("@nodekit/logger");
const nodemon_1 = __importDefault(require("nodemon"));
const path_1 = __importDefault(require("path"));
const createExpress_1 = __importDefault(require("./createExpress"));
const log = logger_1.logger('[express-isomorphic]');
const localServer = ({ extend, makeHtmlPath, watchExt, watchPaths, }) => __awaiter(this, void 0, void 0, function* () {
    const port = yield getAvailablePort();
    return createExpress_1.default({
        bootstrap: () => {
            setupNodemon({
                makeHtmlPath,
                port,
                watchExt,
                watchPaths,
            });
        },
        extend,
        htmlGenerator: ({ requestUrl, serverState, }) => __awaiter(this, void 0, void 0, function* () {
            const makeHtmlPayload = {
                requestUrl,
                serverState,
            };
            const { data } = yield axios_1.default.post(`http://localhost:${port}/makeHtml`, makeHtmlPayload);
            return data;
        }),
    });
});
exports.default = localServer;
function setupNodemon({ makeHtmlPath, port, watchExt, watchPaths, }) {
    log('setupNodemon(): parent pid: %s, makeHtmlPath: %s, watchPaths: %s', process.pid, makeHtmlPath, watchPaths);
    const script = path_1.default.resolve(__dirname, 'htmlGeneratingServer.js');
    nodemon_1.default({
        args: [
            '--port',
            port,
            '--makeHtmlPath',
            makeHtmlPath,
        ],
        ext: watchExt || 'js,json,jsx,ts,tsx,html,css,scss',
        script,
        watch: [
            makeHtmlPath,
            ...watchPaths,
        ],
    })
        .on('quit', () => {
        log('setupNodemon(): quit');
        process.exit();
    })
        .on('restart', (files) => {
        log(`setupNodemon(): ${chalk_1.default.green('restarted')} by: %s`, files);
    });
}
function getAvailablePort() {
    return __awaiter(this, void 0, void 0, function* () {
        const initialPort = 10021;
        function openAndCheckConnection(port) {
            return new Promise((resolve, reject) => {
                const server = http_1.default.createServer(() => { });
                server.listen(port, () => {
                    log('openAndCheckConnection(): connect success: %s', port);
                    server.close(() => {
                        log(`openAndCheckConnection(): ${chalk_1.default.green('successfully')} closed examining server: %s`, port);
                        resolve(port);
                    });
                })
                    .on('error', (err) => {
                    log('openAndCheckConnection(): error: %s, port: %s', err, port);
                    reject();
                });
            });
        }
        for (let port = initialPort; port < initialPort + 10; port += 1) {
            try {
                const _port = yield openAndCheckConnection(port);
                log('getAvailablePort(): port is available: %s', port);
                return _port;
            }
            catch (err) {
                log('getAvailablePort(): port not availble: %s', port);
            }
        }
        throw new Error('getAvailablePort(): no port availble');
    });
}
