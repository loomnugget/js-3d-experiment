'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: `${__dirname}/app/index.jsx`,
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
    ],
  },
};
