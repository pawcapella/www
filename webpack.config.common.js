const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.tsx',
  },
  plugins: [
    new CleanWebpackPlugin(),
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
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/react',
              '@babel/typescript',
              ['@babel/env', {
                "modules": false,
              }],
            ],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: [
      '.js',
      '.ts',
      '.tsx',
    ]
  },
};
