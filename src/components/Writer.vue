<template>
  <q-layout ref="layout" view="lHh LpR lFf">
    <toolbar
      id="d-toolbar"
      slot="header"
      :layout="this.$refs.layout"
      :wordCount="wordCount"
      :sentenceCount="sentenceCount"
    />

    <left-menu
      id="d-left-menu"
      slot="left"
    />

    <vue-medium-editor
      id="d-writer"
      custom-tag="div"
      :text="contentHTML"
      :options="options"
      @edit="processEditOperation"
    />
  </q-layout>
</template>

<script>
import { QLayout } from 'quasar'
import VueMediumEditor from 'vue2-medium-editor'
import MediumEditorAutoList from 'medium-editor-autolist'
import Toolbar from 'components/Toolbar'
import LeftMenu from 'components/LeftMenu'

import 'font-awesome/css/font-awesome.min.css'
import 'medium-editor/dist/css/medium-editor.min.css'
import 'medium-editor/dist/css/themes/tim.min.css'

import 'assets/fonts/LibreBaskerville/stylesheet.css'

export default {
  name: 'writer',
  components: {
    QLayout,
    VueMediumEditor,
    Toolbar,
    LeftMenu
  },
  data () {
    return {
      contentHTML: '<h1>Welcome to «dante»</h1><p>When you feel <i>ready</i>, start to type your <b>masterpiece</b>...</p>',
      content: null,
      words: [],
      sentences: [],
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
  computed: {
    wordCount: function () {
      return this.words.length
    },
    sentenceCount: function () {
      return this.sentences.length
    }
  },
  mounted () {
    this.$refs.layout.hideLeft()
    this.updateContentAndStats()
    document.querySelector('#d-writer').focus()
  },
  methods: {
    updateContentAndStats () {
      this.content = (this.contentHTML || '').replace(/<p>|<h\d+>|<li>/g, '\n\n').replace(/<br\s*\/*>/g, '\n').replace(/<(?:.|\n)*?>/gm, '')
      this.sentences = this.content.replace(/(\.+|:|;|\?|!)/g, '$1\n').split(/\n+\s*/).filter(n => n)
      this.words = this.content.split(/\s+/).filter(n => n)
    },
    processEditOperation (operation) {
      this.$nextTick(() => {
        this.contentHTML = operation.api.getFocusedElement().innerHTML
        this.updateContentAndStats()
      })
    }
  }
}
</script>

<style lang="stylus">
body
  font-family 'LibreBaskerville', serif
  background-color #fafafa
  overflow-x hidden

.layout-header, .layout-aside
  box-shadow none !important

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
  color #555

  h1, h2, h3, h4
    margin 0 0 .5em
    font-weight inherit
    line-height 1.2
    color #777

    &+p
      margin-top 1.414em

  h1
    font-size 2.369em
    color #333

  h2
    font-size 1.777em

  h3
    font-size 1.333em

  h4
    font-size 1em
</style>
