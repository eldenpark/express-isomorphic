"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const log_1 = require("./utils/log");
const serverUtils_1 = require("./utils/serverUtils");
const logTag = 'eject';
const eject = function ({ bundlePath, ejectPath, makeHtml, publicPath, universalAppPath, }) {
    return __awaiter(this, arguments, void 0, function* () {
        log_1.log('eject():\n%o', arguments[0]);
        const bundleBuildJson = fs.readFileSync(`${bundlePath}/build.json`, 'utf-8');
        const buildInfo = JSON.parse(bundleBuildJson);
        log_1.log(`${logTag} enhance(), build.json:\n%o`, buildInfo);
        const { error, assets } = serverUtils_1.parseWebpackBuildInfo(buildInfo);
        const html = yield makeHtml({
            assets,
            requestUrl: '/',
            universalAppPath,
        });
        fs.writeFileSync(ejectPath, html);
    });
};
exports.default = eject;
