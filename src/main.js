require(`./themes/app.${__THEME}.styl`)
require(`quasar/dist/quasar.ie`)
require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import VueElectron from 'vue-electron'
import isElectron from 'is-electron'
import Quasar from 'quasar'
import router from './router'

Vue.config.productionTip = false

// Install Quasar Framework
Vue.use(Quasar)

// Install Electron (if enabled)
if (isElectron()) {
  Vue.use(VueElectron)
}

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
// import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    render: h => h(require('./App'))
  })
})
