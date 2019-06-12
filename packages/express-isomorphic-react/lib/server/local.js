"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_isomorphic2_1 = __importDefault(require("@nodekit/express-isomorphic2"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const extend_1 = __importDefault(require("./extend"));
const webpack_config_client_local_web_1 = __importDefault(require("../webpack/webpack.config.client.local.web"));
const { localServer } = express_isomorphic2_1.default.create({
    extend: extend_1.default,
    makeHtmlPath: path_1.default.resolve(__dirname, './makeHtmlLaunch.js'),
    webpackBuild: {},
    webpackConfig: webpack_config_client_local_web_1.default,
});
const port = 6001;
const httpServer = http_1.default.createServer(localServer().app);
httpServer.listen(port, () => {
    const time = new Date().toISOString();
    console.log(`${time} [express-isomorphic-react] LocalServer listening on ${port}`);
});
