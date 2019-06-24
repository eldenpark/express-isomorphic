const path = require('path');

const rootPackagePath = path.resolve(__dirname, '../../');

module.exports = {
  rules: {
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
      packageDir: [
        __dirname,
        rootPackagePath,
      ],
    }],
    'react/prop-types': ['off'],
  },
};
