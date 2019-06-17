"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("./log");
exports.parseWebpackBuild = function ({ entrypoints, errors, }) {
    log_1.log('parseWebpackBuildInfo(): entrypoints:\n%j', entrypoints);
    const assets = [];
    try {
        if (!entrypoints) {
            return {
                assets,
                error: 'entrypoints undefined',
            };
        }
        Object.values(entrypoints)
            .map((entrypoint) => {
            entrypoint.assets.map((asset) => {
                if (asset.match(/^.*\.(js|css)$/)) {
                    assets[asset] = true;
                }
            });
        });
        return {
            assets: Object.keys(assets),
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
        else if (asset.endsWith('.css')) {
            return `<link rel="stylesheet" type="text/css" href="/bundle/${asset}">`;
        }
        else {
            console.warn('The type of asset is not handled: %s', asset);
        }
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
