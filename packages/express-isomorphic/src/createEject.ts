import axios from 'axios';
import fs from 'fs';
import { logger } from 'jege/server';
import path from 'path';

const log = logger('[express-isomorphic]');

export default function createEject(ejectPath?: string) {
  log('createEject(): ejectPath: %s', ejectPath);

  if (ejectPath) {
    if (!fs.existsSync(ejectPath)) {
      log('createEject(): path does not exist, ejectPath: %s', ejectPath);
      throw new Error(`ejectPath does not exist, ejectPath: ${ejectPath}`);
    }

    return async function eject({
      fileName,
      requestUrl,
    }: EjectArgs) {
      log('eject(): Start requestng and writing, fileName: %s, requestUrl: %s', fileName, requestUrl);
      const { data } = await axios.get(requestUrl);

      const filePath = path.resolve(ejectPath, fileName);
      fs.writeFileSync(filePath, data);
      return data;
    };
  }

  return function noop() {
    log('ejectPath is not given thus eject() does not do anything');
  };
}

interface EjectArgs {
  fileName: string;
  requestUrl: string;
}
