'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: `${__dirname}/app/index.js`,
  output: {
    path: 'build',
    filename: 'bundle.js',
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : `${__dirname}/app`,
        loader : 'babel',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'},
    ],
  },
  plugins: [HTMLWebpackPluginConfig],
};
