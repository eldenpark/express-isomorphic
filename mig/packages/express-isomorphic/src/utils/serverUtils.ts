import { log } from './log';
import { WebpackBuild } from '../productionServer';

export const parseWebpackBuild: ParseWebpackBuild = function ({
  entrypoints,
  errors,
}) {
  log('parseWebpackBuildInfo(): entrypoints:\n%j', entrypoints);

  const assets: string[] = [];
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

export function requireNonNull(obj: any, msg: string) {
  if (!obj) {
    throw new Error(msg);
  } else {
    return obj;
  }
}

interface ParseWebpackBuild {
  (buildInfo: WebpackBuild): {
    assets: string[];
    error?: string;
  };
}
