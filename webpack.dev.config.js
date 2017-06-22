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
    style: './style/style.scss'
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
      }, {
        from: 'src/todolist/todolist.template.html',
        to: 'src/todolist',
      }, {
        from: 'src/todolist-check-del-btns/todolist-check-del-btns.template.html',
        to: 'src/todolist-check-del-btns',
      }, {
        from: 'src/todolist-input/todolist-input.template.html',
        to: 'src/todolist-input',
      }, {
        from: 'src/todolist-tasklist/todolist-tasklist.template.html',
        to: 'src/todolist-tasklist',
      }, {
        from: 'src/todolist-tasklist/tasklist-element/tasklist-element.template.html',
        to: 'src/todolist-tasklist/tasklist-element'
      }
    ])
  ]
};