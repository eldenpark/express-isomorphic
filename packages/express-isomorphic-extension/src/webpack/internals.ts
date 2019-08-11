import { logger } from 'jege/server';

import { Stats } from 'webpack';

const log = logger('[express-isomorphic-extension]');

export const defaultWebpackStats = {
  all: false,
  assets: true,
  builtAt: true,
  chunks: true,
  color: true,
  entrypoints: true,
  errors: true,
};

export function parseWebpackBuild({
  entrypoints,
}: Stats.ToJsonOutput): ParsedWebpackBuild {
  log('parseWebpackBuildInfo(): entrypoints: %j', entrypoints);

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
}

interface ParsedWebpackBuild {
  assets: string[];
  error?: string;
}
