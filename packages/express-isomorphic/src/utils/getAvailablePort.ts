import chalk from 'chalk';
import http from 'http';
import { logger } from 'jege/server';

const log = logger('[express-isomorphic]');

export default async function getAvailablePort(initialPort): Promise<number> {
  function openAndCheckConnection(port): Promise<number> {
    return new Promise((resolve, reject) => {
      const server = http.createServer(() => {});
      server.listen(port, () => {
        log('openAndCheckConnection(): connect success: %s', port);
        server.close(() => {
          log(`openAndCheckConnection(): successfully closed examining server: %s`, port);
          resolve(port);
        });
      })
        .on('error', (err) => {
          log('openAndCheckConnection(): error: %s, port: %s', err, port);
          reject();
        });
    });
  }

  for (let port = initialPort; port < initialPort + 10; port += 1) {
    try {
      const _port = await openAndCheckConnection(port);
      log('getAvailablePort(): port is available: %s', port);
      return _port;
    } catch (err) {
      log('getAvailablePort(): port not availble: %s', port);
    }
  }

  log(`getAvailablePort(): ${chalk.red('error')} getting available port`);
  throw new Error('getAvailablePort(): no port availble');
}
