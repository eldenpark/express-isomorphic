exports.requireNonNull = (obj, message) => {
  if (obj === undefined || obj === null) {
    console.log(message);
    process.exit(0);
  }
};
