"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_isomorphic2_1 = __importDefault(require("@nodekit/express-isomorphic2"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const extend_1 = __importDefault(require("./extend"));
const webpack_config_client_prod_web_1 = __importDefault(require("../webpack/webpack.config.client.prod.web"));
const webpackBuild = require('../../dist/build.json');
const { server } = express_isomorphic2_1.default.create({
    extend: extend_1.default,
    makeHtmlPath: path_1.default.resolve(__dirname, './makeHtml.js'),
    webpackBuild,
    webpackConfig: webpack_config_client_prod_web_1.default,
});
const port = 6001;
const httpServer = http_1.default.createServer(server().app);
httpServer.listen(port, () => {
    const time = new Date().toISOString();
    console.log(`${time} [express-isomorphic-react] ProductionServer listening on ${port}`);
});
