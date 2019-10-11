import { logger } from 'jege/server';

const log = logger('[express-isomorphic]');

export function createAssetElements(
  assets: string[] = [],
  publicPath?: string,
): string {
  return assets.map((asset) => {
    if (asset.endsWith('.js')) {
      return `<script src="${publicPath}${asset}"></script>`;
    }

    if (asset.endsWith('.css')) {
      return `<link rel="stylesheet" type="text/css" href="${publicPath}${asset}">`;
    }

    log('getAssets(): The type of asset is not handled: %s', asset);
    return undefined;
  })
    .join('');
}

export function createStringifiableObjectElement(key: string, object: any) {
  const stringifiedObj = JSON.stringify(object)
    .replace(/</g, '\\u003c');

  return `<script>window['${key}']=${stringifiedObj}</script>`;
}

export function createStyleElement(styleDef, id?: string) {
  const _id = id ? ` id=${id}` : '';
  return `<style${_id}>${styleDef}</style>`;
}

export function createSocketScriptElement(socketPort?, socketPath?: string) {
  if (socketPort && socketPath) {
    return socketPort && socketPath && `
if (window.io) {
  var socket = io('http://localhost:${socketPort}', {
    path: '${socketPath}',
  });
  socket.on('express-isomorphic', function ({ msg }) {
    console.log('[express-isomorphic] %s', msg);
  });
}`;
  }
  return '';
}
