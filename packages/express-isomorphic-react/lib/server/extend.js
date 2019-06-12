"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extend = (app, serverState) => {
    app.use((req, res, next) => {
        const time = new Date().toISOString();
        console.log(`${time} [express-isomorphic-react] extend(): requestUrl: ${req.url}`);
        next();
    });
};
exports.default = extend;
