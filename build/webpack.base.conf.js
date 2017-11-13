var path = require('path')
var glob = require('glob')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

var getEntry = function (globPath) {
  var files = glob.sync(globPath)
  var entries = {}, entry, key
  var reg= /^\.\/src\/page\/(\w+)\/index\.js$/
  for (var i = 0; i < files.length; i++) {
    entry = files[i]
    key = entry.match(reg)
    if (key) {
      key = entry.match(reg)[1]
      entries[key] = entry
    }
  }
  return entries
}
var entry = getEntry(process.env.NODE_ENV === 'production' ? config.build.js : config.dev.js)

module.exports = {
  entry: entry,
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'widget': path.resolve(__dirname, '../src/widget')
    },
    'jquery': 'jquery'
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      // {
      //   test: /\.js$/,
      //   loader: 'eslint',
      //   include: projectRoot,
      //   exclude: /node_modules/
      // }
    ],
    loaders: [
      {
        test: /\.jade$/, 
        loader: 'jade'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
}
