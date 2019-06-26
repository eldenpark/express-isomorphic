import createExpress, {
  Extend,
  MakeHtml,
  ServerCreation,
} from './createExpress';

const productionServer: ProductionServer = async <State extends {}>({
  extend,
  makeHtmlPath,
}) => {
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
};

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

interface ProductionServer {
  <State>(arg: {
    extend?: Extend<State>;
    makeHtmlPath: string;
  }): Promise<ServerCreation<State>>;
}

export default productionServer;
