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
        this.state = state;
    }
    update(obj) {
        log(`serverState: state will ${chalk_1.default.green('update')} with:\n%j`, obj);
        Object.keys(obj)
            .forEach((key) => {
            this[key] = obj[key];
        });
    }
}
exports.default = ServerState;
