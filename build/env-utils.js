var
  config = require('../config'),
  theme = config.defaultTheme,
  target = 'web'

process.argv.slice(2).forEach(function (item, index) {
  if (item.startsWith('theme')) {
    theme = item.split('=')[1]
  }
  else if (item.startsWith('target')) {
    target = item.split('=')[1]
  }
})

module.exports = {
  dev: process.env.NODE_ENV === 'development',
  prod: process.env.NODE_ENV === 'production',

  platform: {
    theme: theme,
    target: target,
    cordovaAssets: './cordova/platforms/' + (theme === 'mat' ? 'android' : 'ios') + '/platform_www'
  }
}
