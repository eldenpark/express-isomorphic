"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const log_1 = require("./utils/log");
class ServerState {
    constructor() {
        this.assets = [];
        this.buildHash = undefined;
        this.error = undefined;
        this.isLaunched = false;
        this.makeHtml = undefined;
        this.state = {};
        this.updatedAt = undefined;
    }
    update(obj = {}) {
        const time = new Date();
        log_1.log(`[state] state will ${chalk_1.default.green('update')} at %s with:\n%j`, time, obj);
        Object.keys(obj)
            .forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                this[key] = obj[key];
            }
        });
        this.updatedAt = time;
    }
}
exports.ServerState = ServerState;
exports.default = ServerState;
