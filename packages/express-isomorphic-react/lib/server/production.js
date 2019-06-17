"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_isomorphic2_1 = __importDefault(require("@nodekit/express-isomorphic2"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const webpack_config_client_prod_web_1 = __importDefault(require("../webpack/webpack.config.client.prod.web"));
const webpackBuild = require('../../dist/build.json');
const extend = (app, serverState) => {
    app.use((req, res, next) => {
        const time = new Date().toISOString();
        console.log(`${time} [express-isomorphic-react] extend(): requestUrl: ${req.url}`);
        next();
    });
    const { path, publicPath } = webpack_config_client_prod_web_1.default.output;
    app.use(publicPath, express_1.default.static(path));
};
const { app } = express_isomorphic2_1.default.production({
    extend,
    makeHtmlPath: path_1.default.resolve(__dirname, './makeHtml.js'),
    webpackBuild,
    webpackConfig: webpack_config_client_prod_web_1.default,
});
const port = 6001;
const httpServer = http_1.default.createServer(app);
httpServer.listen(port, () => {
    const time = new Date().toISOString();
    console.log(`${time} [express-isomorphic-react] ProductionServer listening on ${port}`);
});
