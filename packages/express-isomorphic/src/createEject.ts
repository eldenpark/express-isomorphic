import axios from 'axios';
import fs from 'fs';
import { logger } from 'jege/server';

const log = logger('[express-isomorphic]');

export default function createEject() {
  log('createEject()');

  return async function eject({
    filePath,
    requestUrl,
  }: EjectArgs) {
    log('eject(): Start requestng and writing, filePath: %s, requestUrl: %s', filePath, requestUrl);

    try {
      const { data } = await axios.get(requestUrl);
      fs.writeFileSync(filePath, data);
      return data;
    } catch (err) {
      log('createEject(): error ejecting, filePath: %s, requestUrl: %s', filePath, requestUrl);
      throw new Error(`ejectPath does not exist, ejectPath: ${filePath}`);
    }
  };
}

interface EjectArgs {
  filePath: string;
  requestUrl: string;
}
