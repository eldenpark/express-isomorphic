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
