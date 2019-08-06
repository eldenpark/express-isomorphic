export default function stringifyServerState(serverStateObject) {
  let result = '';
  Object.entries(serverStateObject)
    .forEach(([key, value]) => {
      if (key === 'latestHtmlGenerated') {
        try {
          let stringifiedValue = JSON.stringify(value);
          stringifiedValue = stringifiedValue.length > 80
            ? `${stringifiedValue.slice(0, 80)}...[length: ${stringifiedValue.length}]`
            : stringifiedValue;
          result += ` ${key}: ${stringifiedValue}`;
        } catch (err) {
          result += ` ${key}: [circular]`;
        }
      } else {
        try {
          result += ` ${key}: ${JSON.stringify(value)}`;
        } catch (err) {
          result += ` ${key}: [circular]`;
        }
      }
    });
  return result;
}
