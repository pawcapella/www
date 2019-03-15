if (process.env.NODE_ENV == null) {
  process.env.NODE_ENV = 'production';
}

const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(
  {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new UglifyJSPlugin(),
    ],
    // when merging config objects that contain css-blocks config,
    // the non-css-blocks config must contain a module object
    // otherwise css-blocks will not rewrite files properly
    // (for some unknown reason)
    module: {},
  },
  // the object with css-blocks config must come last
  common
);
