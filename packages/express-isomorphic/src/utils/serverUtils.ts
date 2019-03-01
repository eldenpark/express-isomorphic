import { log } from './log';

export const parseWebpackBuildInfo: ParseWebpackBuildInfo = function ({
  entrypoints,
  errors,
}) {
  log('parseWebpackBuildInfo() with entrypoints:\n%o', entrypoints);

  const assets: string[] = [];
  try {
    if (!entrypoints) {
      return {
        assets,
        error: 'entrypoints undefined',
      };
    } else if (errors.length > 0) {
      return {
        assets,
        error: 'webpack build failed. Original error messages: ' + errors,
      };
    }

    Object.keys(entrypoints)
      .map((entrypoint) => {
        entrypoints[entrypoint].assets.map((asset: string) => {
          asset.match(/^.*\.(js|css)$/) && assets.push(asset);
        });
      });
    
    return {
      assets,
    };
  } catch (err) {
    return {
      assets,
      error: 'error parsing webpack build info',
    };
  }
}

export function getProperRequireCache() {
  return Object.keys(require.cache)
    .filter((key) => {
      return !key.includes('/node_modules/');
    });
}

export function attachAssets(assets: string[] = []): string {
  return assets.map((asset) => {
    if (asset.endsWith('.js')) {
      return `<script src="/bundle/${asset}"></script>`;
    } else if (asset.endsWith('.css')) {
      return `<link rel="stylesheet" type="text/css" href="/bundle/${asset}">`
    } else {
      console.warn('The type of asset is not handled: %s', asset);
    }
  })
    .join('');
}

export function requireUniversalComponent(universalAppPath: string): object {
  let Universal;
  try {
    Universal = require(universalAppPath).default;
  } catch (err) {
    console.error('Error loading UniversalApp at path: %s\nOriginal Error: %o', universalAppPath, err);
    Universal = 'Universal Component not found';
  }
  return Universal;
}

export interface WebpackBuildInfo {
  chunks: any[];
  entrypoints: any;
  errors: string[];
}

interface ParseWebpackBuildInfo {
  (buildInfo: WebpackBuildInfo): {
    assets: string[];
    error?: string;
  };
}
