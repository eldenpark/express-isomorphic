"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_isomorphic_1 = __importDefault(require("@nodekit/express-isomorphic"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const log_1 = require("./log");
const webpack_config_client_local_web_1 = __importDefault(require("../webpack/webpack.config.client.local.web"));
const log = log_1.logger('[express-isomorphic-react]');
const extend = (app) => {
    app.use((req, res, next) => {
        const time = new Date().toISOString();
        log(`${time} [express-isomorphic-react] extend(): requestUrl: ${req.url}`);
        next();
    });
};
const { app } = express_isomorphic_1.default.local({
    extend,
    makeHtmlPath: path_1.default.resolve(__dirname, './makeHtmlLaunch.js'),
    webpackConfig: webpack_config_client_local_web_1.default,
});
const port = 6001;
const httpServer = http_1.default.createServer(app);
httpServer.listen(port, () => {
    log('LocalServer listening on: %s', port);
});
