import chalk from 'chalk';
import fs from 'fs';
import { logger } from 'jege/server';
import webpack, {
  Configuration,
  Options,
  Stats,
} from 'webpack';

const log = logger('[express-isomorphic-extension]');

const defaultWebpackStats = {
  all: false,
  assets: true,
  builtAt: true,
  chunks: true,
  color: true,
  entrypoints: true,
  errors: true,
};

export default async function compile({
  buildJsonPath,
  webpackConfig,
  webpackStats,
}: CompileArgs) {
  return new Promise((resolve, reject) => {
    log('compile(): config: %j', webpackConfig);
    const compiler = webpack(webpackConfig);
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        if (buildJsonPath) {
          writeBuildJson(buildJsonPath, err);
        }
        reject(err);
      } else {
        const result = stats.toJson(webpackStats || defaultWebpackStats);
        if (buildJsonPath) {
          writeBuildJson(buildJsonPath, result);
        }
        resolve(result);
      }
    });
  });
}

function writeBuildJson(path: string, obj: Stats.ToJsonOutput | Error) {
  try {
    log('writeBuildJson(): destPath: %s', path);
    fs.writeFileSync(path, JSON.stringify(obj, null, 2));
  } catch (err) {
    log(`writeBuildJson(): ${chalk.red('error')} in writing file: %o`, err);
    throw err;
  }
}

interface CompileArgs {
  buildJsonPath?: string;
  webpackConfig: Configuration;
  webpackStats?: Options.Stats;
}
