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

  computed: {
    fileTitle (state) {
      const fileName = (this.$store.state.editor.filename || '')
        .split('/')
        .pop()
        .split('.')[0]
      return [
        fileName || this.$t('No title'),
        this.$store.getters['editor/isChanged'] ? '*' : ''
      ].join('')
    }
  },

  meta () {
    const productName = this.$store.getters['base/appInfo'].productName
    return {
      title: this.fileTitle,
      titleTemplate: title => `${title} - ${productName}`
    }
  },

  methods: {
    onFocus (evt) {
      this.$refs.editor.focus()
    }
  }
}
</script>
