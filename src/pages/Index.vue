<template>
  <q-page padding class="column full-height" @click.native="onFocus">
    <editor ref="editor" class="col"/>
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
    onFocus (evt) {
      this.$refs.editor.focus()
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
        this.$store.dispatch('base/toggleDarkMode')
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
</style>
