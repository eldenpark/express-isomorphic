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
const socket_io_1 = __importDefault(require("socket.io"));
const createExpress_1 = __importDefault(require("./createExpress"));
const getAvailablePort_1 = __importDefault(require("./utils/getAvailablePort"));
const log = logger_1.logger('[express-isomorphic]');
const localServer = ({ extend, makeHtmlPath, watchExt, watchPaths, }) => __awaiter(this, void 0, void 0, function* () {
    const htmlGeneratorPort = yield getAvailablePort_1.default(10021);
    const socketPath = `/${Date.now()}/socket.io`;
    return createExpress_1.default({
        bootstrap: (app, serverState) => __awaiter(this, void 0, void 0, function* () {
            const socketServer = http_1.default.createServer();
            const socketPort = yield getAvailablePort_1.default(20021);
            socketServer.listen(socketPort, () => {
                log(`createExpress(): socketServer is listening on port: ${chalk_1.default.yellow('%s')}`, socketPort);
            });
            const io = socket_io_1.default(socketServer, {
                path: socketPath,
            });
            serverState.update({
                io,
                socketPath,
                socketPort,
            });
            io.on('connection', (socket) => {
                const { clientsCount } = io.engine;
                log('createExpress(): socket is connected, handshake: %j, clientsCount: %s', socket.handshake, clientsCount);
                socket.emit('express-isomorphic', {
                    msg: `socket is connected, socketId: ${socket.id}`,
                });
            });
            setupNodemon({
                htmlGeneratorPort,
                makeHtmlPath,
                serverState,
                watchExt,
                watchPaths,
            });
        }),
        extend,
        htmlGenerator: ({ requestUrl, serverState, }) => __awaiter(this, void 0, void 0, function* () {
            const makeHtmlPayload = {
                requestUrl,
                serverState,
            };
            const { data } = yield axios_1.default.post(`http://localhost:${htmlGeneratorPort}/makeHtml`, makeHtmlPayload);
            return data;
        }),
    });
});
exports.default = localServer;
function setupNodemon({ htmlGeneratorPort, makeHtmlPath, serverState, watchExt, watchPaths, }) {
    const script = path_1.default.resolve(__dirname, 'htmlGeneratingServer.js');
    log('setupNodemon(): parent pid: %s, makeHtmlPath: %s, watchPaths: %s, htmlGeneratingServer: %s', process.pid, makeHtmlPath, watchPaths, script);
    nodemon_1.default({
        args: [
            '--port',
            htmlGeneratorPort,
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
        const { io } = serverState;
        if (io) {
            io.sockets.emit('express-isomorphic', {
                msg: 'Nodemon restarting. Refresh recommended',
            });
        }
    });
}
