import { logger } from '@nodekit/logger';
import React from 'react';

import { SSRManager, SSRManagerContext } from '../SSRManager';

const log = logger('[express-isomorphic-react]');

async function renderToStringProxy({
  element,
  renderFunction,
}: RenderToStringProxyArgs): Promise<string> {
  let callCount = 0;
  let latestHtml = '';
  const ssrManager = new SSRManager();

  async function process(): Promise<string> {
    callCount += 1;
    try {
      const wrappedElement = (
        <SSRManagerContext.Provider value={ssrManager}>
          {element}
        </SSRManagerContext.Provider>
      );
      latestHtml = renderFunction(wrappedElement);

      if (!ssrManager.hasFetchers()) {
        return latestHtml;
      }
    } catch (err) {
      log('process(): Error has occurred in renderToStringProxy(): %o', err);
      throw new Error('Error has occurred in renderToStringProxy()');
    }

    await ssrManager.consumeAndWaitFetchers();

    if (callCount > 12) {
      log('process(): too many recursive calls, returning');
      return latestHtml;
    }
    return process();
  }

  log('renderToStringProxy(): returning html, call count: %s', callCount);
  return Promise.resolve().then(process);
}

export default renderToStringProxy;

interface RenderToStringProxyArgs {
  element: React.ReactElement;
  renderFunction: (element: React.ReactElement) => string;
}
