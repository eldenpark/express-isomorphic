"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("./log");
exports.parseWebpackBuildInfo = function ({ entrypoints, errors, }) {
    log_1.log('parseWebpackBuildInfo() with entrypoints:\n%o', entrypoints);
    const assets = [];
    try {
        if (!entrypoints) {
            return {
                assets,
                error: 'entrypoints undefined',
            };
        }
        Object.keys(entrypoints)
            .map((entrypoint) => {
            entrypoints[entrypoint].assets.map((asset) => {
                asset.match(/^.*\.(js|css)$/) && assets.push(asset);
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
