<template>
  <div
    id="q-app"
    :class="{
      'dark-mode': $store.state.settings.darkMode
    }"
  >
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
