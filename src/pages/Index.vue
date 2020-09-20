<template>
  <q-page padding class="column full-height">
    <editor class="col editor"/>
  </q-page>
</template>

<script>
import Editor from 'components/Editor'

export default {
  name: 'PageIndex',

  components: {
    Editor
  },

  mounted () {
    window.addEventListener('beforeunload', this.onExit)
    document.addEventListener('keydown', this.onKeyDown)
  },

  beforeDestroy () {
    window.removeEventListener('beforeunload', this.onExit)
    document.removeEventListener('keydown', this.onKeyDown)
  },

  methods: {
    onExit (evt) {
      // TODO: ...
    },

    onKeyDown (evt) {
      // Toggle menu
      if (evt.key === 'm' && evt.ctrlKey) {
        evt.preventDefault()
        this.$store.commit('base/toggleMenu')
      }
      // Toggle dark mode
      if (evt.key === 'd' && evt.ctrlKey) {
        evt.preventDefault()
        this.$store.commit('base/toggleDarkMode')
      }
      // Open file
      if (evt.key === 'o' && evt.ctrlKey) {
        evt.preventDefault()
        this.$store.dispatch('editor/openFile')
      }
      // Save file
      if (evt.key === 's' && evt.ctrlKey) {
        evt.preventDefault()
        this.$store.dispatch('editor/saveFile')
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.editor
  cursor text
</style>
