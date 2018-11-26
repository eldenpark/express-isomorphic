"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const log_1 = require("./utils/log");
const state = {
    assets: undefined,
    clientBuildInfo: undefined,
    error: undefined,
    isLaunched: false,
    updatedAt: undefined,
    universalAppPath: undefined,
    update(obj = {}) {
        const time = new Date();
        log_1.log(`[state] state will ${chalk_1.default.yellow('update')} at %s with:\n%o`, time, obj);
        for (let key in obj) {
            if (this.hasOwnProperty(key)) {
                this[key] = obj[key];
            }
        }
        this.updatedAt = time;
    },
    webpackStats: undefined,
};
exports.default = state;
