var
  webpackConfig = require('./webpack.conf'),
  webpack = require('webpack')

module.exports = function (done) {
  console.log((' Building Electron entry main.js...\n').bold)

  webpack(webpackConfig, function (err, stats) {
    if (err || (stats.compilation.errors && stats.compilation.errors.length)) {
      console.log(stats.compilation.errors.toString({
        colors: true
      }))
      return
    }

    console.log(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')

    console.log('\n Build complete for Electron main.js into dist/electron.js\n')

    done && done()
  })
}
