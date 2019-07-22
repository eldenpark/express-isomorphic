const path = require('path');

const rootPackagePath = path.resolve(__dirname, '../../');

module.exports = {
  overrides: [
    {
      files: ['scripts/*'],
      rules: {
        'import/no-extraneous-dependencies': ['error', {
          devDependencies: true,
          packageDir: [
            __dirname,
            rootPackagePath,
          ],
        }],
      },
    },
  ],
  rules: {
    'react/prop-types': ['off'],
  },
};
