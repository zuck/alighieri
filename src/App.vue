<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import * as INFO from '../package.json'

/*
 * Root component
 */
export default {
  mounted () {
    document.title = INFO.productName || INFO.name || 'Quasar App'
  }
}
</script>

<style lang="stylus">
</style>
