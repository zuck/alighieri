<template>
  <q-layout ref="layout" view="lHh LpR lFf">
    <toolbar
      id="d-toolbar"
      slot="header"
      :wordCount="wordCount"
      :sentenceCount="sentenceCount"
    />

    <left-menu
      id="d-left-menu"
      slot="left"
      @new="newFile()"
      @open="$refs.openFile.click()"
      @save="saveFile()"
      @saveAs="saveFileAs()"
      @export="exportFile()"
      @print="printFile()"
      @settings="settings()"
      @about="about()"
      @exit="exit()"
    />

    <input
      type="file"
      accept="application/json"
      style="display:none"
      @change="openFile($event.target.files)"
      ref="openFile"
    >

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
import {
  QLayout,
  Dialog
} from 'quasar'
import VueMediumEditor from 'vue2-medium-editor'
import MediumEditorAutoList from 'medium-editor-autolist'
import FileSaver from 'file-saver'
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
    Dialog,
    VueMediumEditor,
    Toolbar,
    LeftMenu
  },
  data () {
    return {
      filename: null,
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
    newFile () {
      // TODO Show confirm dialog before delete current content
      this.contentHTML = null
      this.filename = null
    },
    openFile (files) {
      if (files && files.length > 0) {
        var f = files[0]
        var reader = new FileReader()
        reader.onload = (evt) => {
          try {
            var data = evt.target.result
            this.filename = f.name.split('.html')[0]
            this.contentHTML = data.split('<body>')[1].replace(/<\/body>|<\/html>/g, '')
          }
          catch (err) {
            reader.onerror(err)
          }
        }
        reader.onerror = (err) => {
          console.error(err)
          this.filename = null
          this.contentHTML = null
        }
        reader.readAsText(f)
      }
    },
    saveFile () {
      if (this.filename) {
        var fileContent = '<!DOCTYPE html><html lang="en">' +
        '<head><meta charset="utf-8">' +
        '<title>' + this.filename + '</title>' +
        '</head><body>' +
        this.contentHTML +
        '</body></html>'

        FileSaver.saveAs(
          new Blob(
            [fileContent],
            { type: 'text/html;charset=utf-8' }
          ),
          this.filename + '.html'
        )
      }
      else {
        this.saveFileAs()
      }
    },
    saveFileAs () {
      this.filename = 'test'
      this.saveFile()
    },
    exportFile () {
      Dialog.create({
        title: 'dante',
        message: 'Export',
        buttons: [
          'Cancel',
          {
            label: 'OK',
            handler () {}
          }
        ]
      })
    },
    printFile () {
      if (window) {
        window.print()
      }
    },
    settings () {
      Dialog.create({
        title: 'dante',
        message: 'Settings',
        buttons: [
          'Cancel',
          {
            label: 'OK',
            handler () {}
          }
        ]
      })
    },
    about () {
      Dialog.create({
        title: 'dante',
        message: 'About',
        buttons: [
          'Cancel',
          {
            label: 'OK',
            handler () {}
          }
        ]
      })
    },
    exit () {
      Dialog.create({
        title: 'dante',
        message: 'Exit',
        buttons: [
          'Cancel',
          {
            label: 'OK',
            handler () {}
          }
        ]
      })
    },
    updateContentAndStats () {
      this.content = (this.contentHTML || '').replace(/<p>|<h\d+>|<li>/g, '\n\n').replace(/<br\s*\/*>/g, '\n').replace(/<(?:.|\n)*?>/gm, '')
      this.sentences = this.content.replace(/(\.+|:|;|\?|!)/g, '$1\n').split(/\n+\s*/).filter(n => n)
      this.words = this.content.split(/\s+/).filter(n => n)
    },
    processEditOperation (operation) {
      this.$nextTick(() => {
        this.contentHTML = operation.api.getFocusedElement().innerHTML
      })
    }
  },
  watch: {
    contentHTML: function (val) {
      this.updateContentAndStats()
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
  line-height 2
  color #333

  h1, h2, h3, h4
    margin 0 0 .5em
    font-weight inherit
    line-height 1.2
    color #777

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

/* Printing */

@page
  size auto
  margin 20mm 25mm 25mm

@media print
  body
    font-size 16px
    background-color transparent
    padding 0 !important
    margin 0 !important

  .layout-header, .layout-aside
    display none

  .layout-page-container, .layout-page, #d-writer
    display inline-block
    width 100% !important
    max-width 100% !important
    padding 0 !important
    margin 0 !important
</style>
