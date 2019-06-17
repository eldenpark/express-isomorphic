"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const tag = chalk_1.default.cyan('[express-isomorphic]');
exports.log = function (msg, ...args) {
    const time = new Date().toISOString();
    console.log(`${time} ${tag} ${msg}`, ...args);
};
