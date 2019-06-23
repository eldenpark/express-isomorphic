const chalk = require('chalk');
const util = require('util');
// const tag = chalk.cyan('[eym-sandbox-web]');
// export default function log(format, ...args) {
//   const time = new Date().toISOString();
//   console.log(`${time} ${tag} ${format}`, ...args); // eslint-disable-line
// }
function getLogArgs({ args, buildStep = '', format, tag, }) {
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
exports.logger = function logger(logTag) {
    return (format, ...args) => {
        const { _msg, _tag, _time, } = getLogArgs({
            args,
            format,
            tag: logTag,
        });
        console.log(`${_time} ${_tag} ${_msg}`); //eslint-disable-line
    };
};
