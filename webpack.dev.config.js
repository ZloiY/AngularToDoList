var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractSass = new ExtractTextPlugin('./style/[name].css');
var CopyWebPackPlugin = require('copy-webpack-plugin');

var buildingPath = {
  src: 'app',
  dist: 'dist',
};

module.exports = {
  context: path.join(__dirname, buildingPath.src),
  entry: {
    main: './src/main.build.js',
    style: './style/style.scss',
  },
  output: {
    path: path.join(__dirname, buildingPath.dist),
    filename: 'src/[name].js',
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      use: extractSass.extract({
        fallback: 'style-loader',
        use: 'css-loader!sass-loader',
      }),
    }]
  },
  plugins: [
    extractSass,
    new CopyWebPackPlugin([
      {
        from: 'index.html',
        to: '',
      },
      {
        from: 'src/todolist/todolist.template.html',
        to: 'src/todolist'
      }
    ]),
  ]
};