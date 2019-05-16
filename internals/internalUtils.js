exports.requirePackageArg = (argv) => {
  if (!argv.p) {
    console.log(`You should provide '-p' with package name`);
    process.exit(0);
  }
};
