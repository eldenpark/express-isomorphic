import { logger } from '@nodekit/logger';

const log = logger('[express-isomorphic]');

export const parseWebpackBuild: ParseWebpackBuild = function parseWebpackBuild({
  entrypoints,
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
      .forEach((entrypoint: any) => {
        entrypoint.assets.forEach((asset) => {
          if (asset.match(/^.*\.(js|css)$/)) {
            assets.push(asset);
          }
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
};

export function attachAssets(assets: string[] = []): string {
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

interface WebpackBuild {
  assets: any[];
  builtAt: number;
  entrypoints: {
    [key: string]: {
      assets: string[];
    };
  };
  errors: any[];
}
