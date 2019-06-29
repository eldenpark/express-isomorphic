"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const logger_1 = require("@nodekit/logger");
const log = logger_1.logger('[express-isomorphic]');
class ServerState {
    constructor(state) {
        this.error = undefined;
        this.isLaunched = false;
        this.unstringifiedProperties = new Map();
        this.state = state;
    }
    get io() {
        const io = this.unstringifiedProperties.get('io');
        return io;
    }
    set io(io) {
        log('set io()');
        this.unstringifiedProperties.set('io', io);
    }
    update(obj) {
        const stringifiedObj = stringify(obj);
        log(`serverState: state will ${chalk_1.default.green('update')} with: %s`, stringifiedObj);
        Object.keys(obj)
            .forEach((key) => {
            switch (key) {
                case 'state':
                    this.state = Object.assign({}, this.state, obj[key]);
                    break;
                default:
                    this[key] = obj[key];
            }
        });
    }
}
exports.default = ServerState;
function stringify(obj) {
    try {
        const objString = JSON.stringify(obj);
        return objString.length > 100
            ? `${objString.slice(0, 180)}...[length: ${objString.length}]`
            : objString;
    }
    catch (err) {
        log('stringify(): error in strinifying the obj');
        return '[obj] not stringifiable';
    }
}
