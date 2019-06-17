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
const React = __importStar(require("react"));
const ReactDOM = __importStar(require("react-dom"));
const ClientApp_1 = __importDefault(require("./ClientApp"));
(function setBabelPolyfill() {
    if ((typeof window !== 'undefined' && !window['_babelPolyfill'])
        || (typeof global !== 'undefined' && !global['_babelPolyfill'])) {
        console.info(`[client] babel-polyfill is imported, since it wasn't imported yet`);
        require('babel-polyfill');
    }
})();
console.info('[client] Running in NODE_ENV: %s', process.env.NODE_ENV);
const appRoot = document.getElementById('app-root');
const universalState = window['universalState'];
ReactDOM.hydrate(React.createElement(ClientApp_1.default, { universalState: universalState }), appRoot);
