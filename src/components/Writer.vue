<template>
  <div class="container">
    <vue-medium-editor
      id="d-writer"
      custom-tag="div"
      :text="contentHTML"
      :options="options"
      @edit="processEditOperation"
    >
    </vue-medium-editor>
  </div>
</template>

<script>
import VueMediumEditor from 'vue2-medium-editor'
import MediumEditorAutoList from 'medium-editor-autolist'

import 'medium-editor/dist/css/medium-editor.min.css'
import 'medium-editor/dist/css/themes/tim.min.css'

export default {
  name: 'index',
  components: {
    VueMediumEditor
  },
  data () {
    return {
      contentHTML: null,
      options: {
        placeholder: false,
        spellcheck: false,
        extensions: {
          autolist: new MediumEditorAutoList()
        },
        toolbar: {
          buttons: [
            'h1',
            'h2',
            'bold',
            'italic',
            'underline',
            'quote',
            'unorderedlist',
            'orderedlist'
          ],
          static: true,
          sticky: true
        }
      }
    }
  },
  mounted () {
    document.querySelector('#d-writer').focus()
  },
  methods: {
    processEditOperation (operation) {
      this.$nextTick(() => {
        this.contentHTML = operation.api.getFocusedElement().innerHTML
      })
    }
  }
}
</script>

<style lang="stylus">
body
  background-color #fafafa

.container
  display block
  margin 2rem auto
  min-width 320px
  width 100%
  max-width 576px

#d-writer
  outline none
  border none
  min-height 5rem
</style>
