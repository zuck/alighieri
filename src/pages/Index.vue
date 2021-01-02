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

  methods: {
    onFocus (evt) {
      this.$refs.editor.focus()
    }
  }
}
</script>
