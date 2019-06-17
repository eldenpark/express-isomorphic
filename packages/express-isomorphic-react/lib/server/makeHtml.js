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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const server_1 = require("react-dom/server");
const express_isomorphic2_1 = require("@nodekit/express-isomorphic2");
const ServerApp_1 = __importDefault(require("./ServerApp"));
const makeHtml = function ({ assets, requestUrl, state, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const time = new Date().toISOString();
        console.log(`${time} [express-isomorphic-react] makeHtml(): assets: %s, requestUrl: %s`, assets, requestUrl);
        const universalState = {
            foo: '13131',
        };
        const element = (React.createElement(ServerApp_1.default, { universalState: universalState }));
        const appRootInString = server_1.renderToString(element);
        return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1">
  <title>express-isomorphic-example</title>
  <script>window['universalState']=${JSON.stringify(universalState)}</script>
</head>
<body>
  <div id="app-root">${appRootInString}</div>
  ${express_isomorphic2_1.attachAssets(assets)}
</body>
</html>
`;
    });
};
exports.default = makeHtml;
