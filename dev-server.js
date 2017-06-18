var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var devServer = new WebpackDevServer(
  webpack(config),
  {
    contentBase: __dirname,
    publicPath: '/',
  }
).listen(9000, 'localhost');