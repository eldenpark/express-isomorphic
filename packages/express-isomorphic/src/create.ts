import createExpress, {
  Extend,
  MakeHtml,
  ServerCreation,
} from './createExpress';

async function create<State>({
  extend,
  makeHtmlPath,
}: CreateArgs<State>): Promise<ServerCreation<State>> {
  const makeHtml: MakeHtml<State> = require(makeHtmlPath).default || require(makeHtmlPath);

  return createExpress<State>({
    bootstrap: () => {},
    extend,
    htmlGenerator: async ({
      requestUrl,
      serverState,
    }) => {
      return makeHtml({
        requestUrl,
        serverState,
      });
    },
  });
}

export interface WebpackBuild {
  assets: any[];
  builtAt: number;
  entrypoints: {
    [key: string]: {
      assets: string[];
    };
  };
  errors: any[];
}

interface CreateArgs<State> {
  extend?: Extend<State>;
  makeHtmlPath: string;
}

export default create;
