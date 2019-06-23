const chalk = require('chalk');
const util = require('util');

function getLogArgs({
  args,
  buildStep = '',
  format,
  tag,
}) {
  const _buildStep = buildStep.length > 0
    ? ' ' + chalk.magenta('gulp>' + buildStep)
    : '';
  const _msg = format ? util.format(format, ...args) : '';
  const _tag = chalk.cyan(tag);
  const _time = new Date().toISOString();

  return {
    _buildStep,
    _msg,
    _tag,
    _time,
  };
}

exports.buildLogger = (logTag) => function buildLogger(buildStep, format, ...args) {
  const {
    _buildStep,
    _msg,
    _tag,
    _time,
  } = getLogArgs({
    args,
    buildStep,
    format,
    tag: logTag,
  });

  console.log(`${_time} ${_tag}${_buildStep} ${_msg}`); //eslint-disable-line
};

exports.logger = (logTag) => function logger(format, ...args) {
  const {
    _msg,
    _tag,
    _time,
  } = getLogArgs({
    args,
    format,
    tag: logTag,
  });

  console.log(`${_time} ${_tag} ${_msg}`); //eslint-disable-line
};
