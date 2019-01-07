"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const createExpress_1 = __importDefault(require("./createExpress"));
const serverUtils_1 = require("./utils/serverUtils");
const log_1 = require("./utils/log");
const tag = 'server';
const server = function ({ bundlePath, extend, makeHtml, publicPath, universalAppPath, }) {
    return createExpress_1.default({
        _extend: (app, state) => {
            const bundleBuildJson = fs.readFileSync(`${bundlePath}/build.json`, 'utf-8');
            const buildInfo = JSON.parse(bundleBuildJson);
            log_1.log(`${tag} enhance(), build.json:\n%o`, buildInfo);
            const { error, assets } = serverUtils_1.parseWebpackBuildInfo(buildInfo);
            state.update(Object.assign({ assets }, error && { error }, { isLaunched: true, universalAppPath }));
            extend && extend(app, state);
        },
        makeHtml,
        publicPath,
    });
};
exports.default = server;
