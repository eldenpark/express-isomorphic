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
const http_1 = __importDefault(require("http"));
const logger_1 = require("@nodekit/logger");
const log = logger_1.logger('[express-isomorphic]');
function getAvailablePort(initialPort) {
    return __awaiter(this, void 0, void 0, function* () {
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
exports.default = getAvailablePort;
