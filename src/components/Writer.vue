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
      accept="text/markdown"
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

    <export-modal
      id="d-export-modal"
      ref="exportModal"
      @export="exportToFile"
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
import showdown from 'showdown'
import Europa from 'europa'
import FileSaver from 'file-saver'

import Toolbar from 'components/Toolbar'
import LeftMenu from 'components/LeftMenu'
import ExportModal from 'components/ExportModal'

import 'font-awesome/css/font-awesome.min.css'
import 'medium-editor/dist/css/medium-editor.min.css'
import 'medium-editor/dist/css/themes/tim.min.css'

import 'assets/fonts/LibreBaskerville/stylesheet.css'

const DEFAULT_CONTENT_HTML = '<h1>Welcome to «dante»</h1><p>When you feel <i>ready</i>, start to type your <b>masterpiece</b>...</p>'

export default {
  name: 'writer',
  components: {
    QLayout,
    Dialog,
    VueMediumEditor,
    Toolbar,
    LeftMenu,
    ExportModal
  },
  data () {
    return {
      filename: null,
      contentHTML: null,
      content: null,
      words: [],
      sentences: [],
      options: {
        buttonLabels: 'fontawesome',
        placeholder: false,
        spellcheck: false,
        autoLink: true,
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
            'anchor',
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
    this.mdToHtmlConverter = new showdown.Converter()
    this.htmlToMdConverter = new Europa()
    this.$refs.layout.hideLeft()
    this.contentHTML = DEFAULT_CONTENT_HTML
    document.querySelector('#d-writer').focus()
  },
  methods: {
    convertMdToHtml (md) {
      return this.mdToHtmlConverter.makeHtml(md)
    },
    convertHtmlToMd (html) {
      return this.htmlToMdConverter.convert(html)
    },
    newFile () {
      // TODO Show confirm dialog before delete current content
      this.contentHTML = DEFAULT_CONTENT_HTML
      this.filename = null
    },
    openFile (files) {
      if (files && files.length > 0) {
        var f = files[0]
        var reader = new FileReader()
        reader.onload = (evt) => {
          try {
            var data = evt.target.result
            this.filename = f.name.split('.md')[0]
            this.contentHTML = this.convertMdToHtml(data)
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
        var fileContent = this.convertHtmlToMd(this.contentHTML)

        FileSaver.saveAs(
          new Blob(
            [fileContent],
            { type: 'text/markdown;charset=utf-8' }
          ),
          this.filename + '.md'
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
      this.$refs.exportModal.open()
    },
    exportToFile (ext) {
      if (!this.filename) {
        this.filename = 'test'
      }

      // Plain HTML (.html)
      if (ext === 'html') {
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

      // Plain text (.txt)
      else if (ext === 'txt') {
        FileSaver.saveAs(
          new Blob(
            [this.content],
            { type: 'text/plain;charset=utf-8' }
          ),
          this.filename + '.txt'
        )
      }

      this.$refs.exportModal.close()
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
      this.content = (this.contentHTML || '').replace(/<p>|<h\d+>|<li>/g, '\n\n').replace(/<br\s*\/*>/g, '\n').replace(/\n\n\n/g, '\n\n').replace(/<(?:.|\n)*?>/gm, '').trim()
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
  background-color #fff
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

  pre, code
    background-color #fafafa

  pre
    padding 1rem
    border-radius .25rem

    code
      background-color transparent

  blockquote
    border-left-color #777

    :last-child
      margin-bottom 0

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
