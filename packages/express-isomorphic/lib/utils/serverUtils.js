"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("@nodekit/logger");
const log = logger_1.logger('[express-isomorphic]');
exports.parseWebpackBuild = function parseWebpackBuild({ entrypoints, }) {
    log('parseWebpackBuildInfo(): entrypoints:\n%j', entrypoints);
    const assets = [];
    try {
        if (!entrypoints) {
            return {
                assets,
                error: 'entrypoints undefined',
            };
        }
        Object.values(entrypoints)
            .forEach((entrypoint) => {
            entrypoint.assets.forEach((asset) => {
                if (asset.match(/^.*\.(js|css)$/)) {
                    assets.push(asset);
                }
            });
        });
        return {
            assets,
        };
    }
    catch (err) {
        return {
            assets,
            error: 'error parsing webpack build info',
        };
    }
};
function attachAssets(assets = []) {
    return assets.map((asset) => {
        if (asset.endsWith('.js')) {
            return `<script src="/bundle/${asset}"></script>`;
        }
        if (asset.endsWith('.css')) {
            return `<link rel="stylesheet" type="text/css" href="/bundle/${asset}">`;
        }
        console.warn('The type of asset is not handled: %s', asset); // eslint-disable-line
        return undefined;
    })
        .join('');
}
exports.attachAssets = attachAssets;
function requireNonNull(obj, msg) {
    if (!obj) {
        throw new Error(msg);
    }
    else {
        return obj;
    }
}
exports.requireNonNull = requireNonNull;
