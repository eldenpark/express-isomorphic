const chalk = require('chalk');
const { format } = require('util');

exports.requireNonNull = (obj, message) => {
  if (obj === undefined || obj === null) {
    console.log(message);
    process.exit(0);
  }
};

const tag = chalk.cyan('[express-isomorphic2]');
exports.log = (first, ...rest) => {
  const time = new Date().toISOString();
  const msg = format(first, ...rest);
  console.log(`${time} ${tag} ${msg}`);
};
