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
    htmlGenerator: async (generatorArgs) => {
      return makeHtml(generatorArgs);
    },
  });
}

export default create;

interface CreateArgs<State> {
  extend?: Extend<State>;
  makeHtmlPath: string;
}
