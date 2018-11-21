"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const tag = `[${chalk_1.default.yellow('isomorphic-react-server')}]`;
exports.log = function (msg, ...args) {
    console.log(`${tag} ${msg}`, ...args);
};
