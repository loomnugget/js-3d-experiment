'use strict';

const HTMLPlugin = require('html-webpack-plugin'); //creates index.html and injects scripts
//alows us to dynamically add script tags - names them based on hash
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: `${__dirname}/app/entry.js`,
  output: {
    filename: 'bundle.js',
    path: 'build',
  },
  plugins: [
    new HTMLPlugin({
      template: `${__dirname}/app/index.html`,
    }),
    new ExtractTextPlugin('bundle.css'),

  ],
  sassLoader: {
    includePaths: [`${__dirname}/app/scss/lib`],
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /jquery[\\\/]src[\\\/]selector\.js$/,
        loader: 'amd-define-factory-patcher-loader',
      },

      {
        test: /\.html$/,
        loader: 'html',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass?sourceMap'),
      },
      {
        test:/\.(eot|woff|ttf|svg).*/,
        loader: 'url?limit=10000&name=fonts/[hash].[ext]',

      },
    ],
  },
};

//killall node turns off webpack dev-server
