import createExpress, {
  Extend,
  MakeHtml,
  ServerCreation,
} from './createExpress';

async function create<State>({
  ejectPath,
  extend,
  makeHtmlPath,
}: CreateArgs<State>): Promise<ServerCreation<State>> {
  const makeHtml: MakeHtml<State> = require(makeHtmlPath).default || require(makeHtmlPath);

  return createExpress<State>({
    bootstrap: () => {},
    ejectPath,
    extend,
    htmlGenerator: async ({
      requestUrl,
      serverState,
    }) => {
      return makeHtml({
        requestUrl,
        serverState: serverState.getState(),
      });
    },
  });
}

export default create;

interface CreateArgs<State> {
  ejectPath?: string;
  extend?: Extend<State>;
  makeHtmlPath: string;
}
