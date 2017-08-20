const path = require('path')

module.exports = {
  // electron-packager options
  // Docs: https://simulatedgreg.gitbooks.io/electron-vue/content/docs/building_your_app.html
  name: 'QuasarElectronApp',

  // Electron version
  electronVersion: require('../node_modules/electron/package.json').version,
  arch: 'x64',
  asar: true,
  dir: path.join(__dirname, '../../dist'),
  icon: path.join(__dirname, '../icons/icon'),
  ignore: /\b(node_modules|src|icons)\b/,
  out: path.join(__dirname, '../dist'),
  overwrite: true,
  platform: process.env.PLATFORM_TARGET || 'all'
}
