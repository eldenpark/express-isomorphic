import {
  Extend,
  MakeHtml,
  ServerCreation,
} from './createExpress';
import createDev from './createDev';
import create from './create';
import ServerState from './ServerState';
import {
  WebpackBuild,
  WebpackConfig,
} from './types';

const ExpressIsomorphic = {
  create,
  createDev,
};

export default ExpressIsomorphic;

export {
  Extend,
  MakeHtml,
  MakeHtmlPath,
  ServerCreation,
  ServerState,
  WebpackBuild,
  WebpackConfig,
};

/**
 * makeHtmlPath should be given as the full path to the makeHtml file.
 * express-isomorphic does take the path to the file, not the module, in order that
 * in local devlelopment, relevant files are to be watched.
 */
type MakeHtmlPath = string;
