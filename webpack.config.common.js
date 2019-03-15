const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { Analyzer, Rewriter } = require('@css-blocks/jsx');
const { CssBlocksPlugin } = require('@css-blocks/webpack');

const entryPoint = './src/index.tsx';

const jsxCompilationOptions = {
  aliases: {},
  compilationOptions: {},
  optimization: {
    rewriteIdents: true,
    mergeDeclarations: true,
    removeUnusedStyles: true,
    conflictResolution: true,
    enabled: process.env.NODE_ENV === 'production',
  },
  // types: 'typescript',
};

const rewriter = new Rewriter(jsxCompilationOptions);
const analyzer = new Analyzer(jsxCompilationOptions);

module.exports = {
  entry: {
    app: entryPoint,
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CssBlocksPlugin({
      analyzer,
      outputCssFile: 'blocks.css',
      name: 'css-blocks',
      compilationOptions: jsxCompilationOptions.compilationOptions,
      optimization: jsxCompilationOptions.optimization,
    }),
    new HtmlWebpackPlugin({
      title: 'Pawcapella 🐾🎶',
      filename: 'index.html',
      template: './public/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/react',
                '@babel/typescript',
                [
                  '@babel/env',
                  {
                    modules: false,
                  },
                ],
              ],
            },
          },
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                require('@css-blocks/jsx/dist/src/transformer/babel').makePlugin(
                  {
                    rewriter,
                  }
                ),
              ],
              cacheDirectory: false,
              compact: true,
              parserOpts: {
                plugins: ['jsx'],
              },
            },
          },
          {
            loader: require.resolve('@css-blocks/webpack/dist/src/loader'),
            options: {
              analyzer,
              rewriter,
            },
          },
        ],
      },
      {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$|\.webmanifest$|\.xml$/,
        loader: 'file-loader?name=[name].[ext]', // <-- retain original file name
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
};
