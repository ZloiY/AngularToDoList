var webpack = require('webpack');
var Config = require('webpack-config');

exports.default = new Config.default().extend('webpack.dev.config.js').merge({
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: '/style/',
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      }
    })
  ]
});