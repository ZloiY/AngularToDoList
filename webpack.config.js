var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractSass = new ExtractTextPlugin('./style/[name].css');
var CopyWebPackPlugin = require('copy-webpack-plugin');

var buildingPath = {
  src: 'assets',
  dist: 'dist/src',
};

module.exports = {
  context: path.join(__dirname, buildingPath.src),
  entry: {
    main: './src/js/main.module.js',
    style: './src/style/style.scss',
  },
  output: {
    path: path.join(__dirname, buildingPath.dist),
    filename: 'js/[name].[chunkhash].js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: '/src/style/',
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.scss$/,
      use: extractSass.extract({
        fallback: 'style-loader',
        use: 'css-loader!sass-loader',
      }),
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      }
    }),
    extractSass,
    new CopyWebPackPlugin([
      {
        from: 'index.html',
        to: '../',
      }
    ]),
  ]
};