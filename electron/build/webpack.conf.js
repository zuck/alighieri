var
  path = require('path'),
  webpack = require('webpack'),
  config = require('../config/webpack'),
  merge = require('webpack-merge'),
  ProgressBarPlugin = require('progress-bar-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var folders = {
  src: resolve('src'),
  node_modules: resolve('node_modules'),
  dist: resolve('dist')
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  target: 'electron-main',
  externals: config.externals,
  output: {
    filename: 'electron.js',
    libraryTarget: 'commonjs2',
    path: folders.dist
  },
  resolve: {
    extensions: ['.js', '.json', '.node'],
    modules: [
      folders.src,
      folders.node_modules
    ]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      { // eslint
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        include: folders.src,
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: folders.src,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.node$/,
        loader: 'node-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.env
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    // Progress Bar Webpack plugin format
    // https://github.com/clessg/progress-bar-webpack-plugin#options
    new ProgressBarPlugin({
      format: ' [:bar] ' + ':percent'.bold + ' (:msg)'
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ],
  performance: {
    hints: false
  }
}
