<template>
  <q-layout ref="layout" view="hHr LpR lFf" :right-breakpoint="1100">
    <toolbar slot="header"></toolbar>

    <vue-medium-editor
      id="d-writer"
      custom-tag="div"
      :text="contentHTML"
      :options="options"
      @edit="processEditOperation"
    >
    </vue-medium-editor>
  </q-layout>
</template>

<script>
import {
  QLayout,
  QBtn,
  QIcon
} from 'quasar'
import VueMediumEditor from 'vue2-medium-editor'
import MediumEditorAutoList from 'medium-editor-autolist'
import Toolbar from 'components/Toolbar'

import 'font-awesome/css/font-awesome.min.css'
import 'medium-editor/dist/css/medium-editor.min.css'
import 'medium-editor/dist/css/themes/tim.min.css'

import 'assets/fonts/LibreBaskerville/stylesheet.css'

export default {
  name: 'index',
  components: {
    QLayout,
    QBtn,
    QIcon,
    VueMediumEditor,
    Toolbar
  },
  data () {
    return {
      contentHTML: '<h1>Welcome to &#171;dante&#187;</h1><p>When you feel <i>ready</i>, start to type your <b>masterpiece</b>...</p>',
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
            'h3',
            'bold',
            'italic',
            'underline',
            'strikethrough',
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
  overflow-x hidden

.layout-header
  box-shadow none

#d-writer
  display block
  box-sizing border-box
  min-width 256px
  width 100%
  max-width 640px
  min-height 5rem
  margin 0 auto
  padding 16px 32px
  outline none
  border none
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
