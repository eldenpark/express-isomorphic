const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const babelRc = {
  "plugins": [
    [
      "module-resolver", {
        "alias": {
        },
      }
    ],
    '@babel/plugin-syntax-dynamic-import',
  ],
  "presets": [
    ["@babel/preset-env", {
      targets: {
        node: '8.11',
      },
    }],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
};

module.exports = {
  context: __dirname,
  externals: {},
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.[jt]sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: babelRc,
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png|jpg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
            },
          },
        ],
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    modules: [
      'node_modules',
    ],
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',

      // https://github.com/apollographql/apollo-link-state/issues/302#issuecomment-431219631
      '*', '.mjs', '.gql', '.graphql',
    ],
  },
  target: 'web',
};
