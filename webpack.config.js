'use strict';

const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let plugins = [
  new ExtractTextPlugin('bundle.css'),
  new HTMLWebpackPlugin({template: `${__dirname}/app/index.html`}),
];

module.exports = {
  entry: `${__dirname}/app/index.js`,
  plugins,
  output: {
    path: 'build',
    filename: 'bundle.js',
  },
  sassLoader: {
    includePaths: [`${__dirname}/app/scss/lib`],
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : `${__dirname}/app`,
        loader : 'babel',
        query:
          {
            presets:['react']
          }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.html$/,
        loader: 'html',
      },
      {
        test: /\.(woff|ttf|svg|otf|eot).*/,
        loader: 'url?limit=10000&name=font/[name].[ext]',
      },
      {
        test: /\.(jpg|jpeg|bmp|tiff|gif|png)$/,
        loader: 'url?limit=10000&name=image/[hash].[ext]',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass?sourceMap'),
      },
    ],
  },
};
