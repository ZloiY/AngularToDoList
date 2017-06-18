import webpack from 'webpack';
import Config from 'webpack-config';

export default new Config().extend('webpack.dev.config.js').merge({
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