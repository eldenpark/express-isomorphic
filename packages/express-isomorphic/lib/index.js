"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const localServer_1 = __importDefault(require("./localServer"));
const productionServer_1 = __importDefault(require("./productionServer"));
const ServerState_1 = __importDefault(require("./ServerState"));
exports.ServerState = ServerState_1.default;
const local = (arg) => localServer_1.default(arg);
const production = (arg) => productionServer_1.default(arg);
exports.default = {
    local,
    production,
};
var eject_1 = require("./eject");
exports.addPath = eject_1.addPath;
