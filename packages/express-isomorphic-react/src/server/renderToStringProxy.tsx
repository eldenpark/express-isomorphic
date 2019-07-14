import { logger } from 'jege/server';
import React from 'react';

import { SSRManager, SSRManagerContext } from '../internals/SSRManager';

const MAXIMUM_CALL_COUNT = 10;

const log = logger('[express-isomorphic-react]');

async function renderToStringProxy({
  element,
  renderFunction,
}: RenderToStringProxyArgs): Promise<string> {
  let callCount = 0;
  let latestHtml = '';
  const ssrManager = new SSRManager();

  async function doRender(): Promise<string> {
    callCount += 1;
    try {
      const wrappedElement = (
        <SSRManagerContext.Provider value={ssrManager}>
          {element}
        </SSRManagerContext.Provider>
      );
      latestHtml = renderFunction(wrappedElement);

      if (!ssrManager.hasPromises()) {
        log('doRender(): returning html, call count: %s', callCount);
        return latestHtml;
      }
    } catch (err) {
      log('doRender(): Error has occurred in renderToStringProxy(): %o', err);
      throw new Error('Error has occurred in renderToStringProxy()');
    }

    await ssrManager.consumeAndWaitPromises();

    if (callCount > MAXIMUM_CALL_COUNT) {
      log('doRender(): too many recursive calls, returning latest html');
      return latestHtml;
    }
    return doRender();
  }

  return Promise.resolve().then(doRender);
}

export default renderToStringProxy;

interface RenderToStringProxyArgs {
  element: React.ReactElement;
  renderFunction: (element: React.ReactElement) => string;
}
