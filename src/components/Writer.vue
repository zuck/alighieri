<template>
  <div class="container">
    <div id="d-instructions">
      <img id="d-logo" src="statics/icon.png" />
      <dl>
        <dt><kbd>Enter</kbd></dt><dd>New paragraph</dd>
        <dt><kbd>Shift + Enter</kbd></dt><dd>New line</dd>
        <dt><kbd>1. + Space</kbd></dt><dd>New numbered list</dd>
        <dt><kbd>* + Space</kbd></dt><dd>New bullet list</dd>
      </dl>
    </div>
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

import 'font-awesome/css/font-awesome.min.css'
import 'medium-editor/dist/css/medium-editor.min.css'
import 'medium-editor/dist/css/themes/tim.min.css'

import 'assets/fonts/LibreBaskerville/stylesheet.css'

export default {
  name: 'index',
  components: {
    VueMediumEditor
  },
  data () {
    return {
      contentHTML: null,
      options: {
        buttonLabels: 'fontawesome',
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
  background-color #fcfcfc

.container
  display block
  min-width 320px
  width 100%
  max-width 576px
  margin 2rem auto

#d-instructions
  position fixed
  top 2rem
  left 2rem
  color #c0c0c0
  cursor pointer

  &:hover
    #d-logo, dl
      opacity 1

  dl
    opacity 0
    transition opacity .2s

  dt, dd
    float left

  dt
    clear both
    width 10em

#d-logo
  width 32px
  margin-bottom 1rem
  opacity .1
  transition opacity .2s

#d-writer
  outline none
  border none
  min-height 5rem
  line-height 1.45
  font-family 'LibreBaskerville', serif
  color #333

  h1, h2, h3, h4
    margin 0 0 .5em
    font-weight inherit
    line-height 1.2
    color #888

    &+p
      margin-top 1.414em

  h1
    font-size 2.369em
    color #111

  h2
    font-size 1.777em

  h3
    font-size 1.333em

  h4
    font-size 1em
</style>
