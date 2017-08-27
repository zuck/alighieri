<template>
  <q-layout ref="layout" view="lHh LpR lFf">
    <toolbar
      id="toolbar"
      slot="header"
      :wordCount="wordCount"
      :sentenceCount="sentenceCount"
    />

    <left-menu
      id="left-menu"
      slot="left"
      @new="newFile()"
      @open="$refs.openFile.click()"
      @import="$refs.importFile.click()"
      @save="saveFile()"
      @saveAs="saveFileAs()"
      @export="$refs.exportModal.open()"
      @print="printFile()"
      @settings="settings()"
      @about="about()"
      @exit="exit()"
    />

    <input
      type="file"
      accept="text/html"
      style="display:none"
      @change="openFile($event.target.files)"
      ref="openFile"
    >

    <input
      type="file"
      accept=".md, .txt"
      style="display:none"
      @change="importFile($event.target.files)"
      ref="importFile"
    >

    <vue-medium-editor
      id="writer"
      custom-tag="div"
      :text="contentHTML"
      :options="options"
      @edit="processEditOperation"
    />

    <export-modal
      id="export-modal"
      ref="exportModal"
      @export="exportFile"
    />
  </q-layout>
</template>

<script>
import {
  QLayout,
  Dialog,
  SessionStorage,
  LocalStorage
} from 'quasar'
import VueMediumEditor from 'vue2-medium-editor'
import MediumEditorAutoList from 'medium-editor-autolist'
import showdown from 'showdown'
import toMarkdown from 'to-markdown'
import FileSaver from 'file-saver'

import Toolbar from 'components/Toolbar'
import LeftMenu from 'components/LeftMenu'
import ExportModal from 'components/ExportModal'

import 'font-awesome/css/font-awesome.min.css'
import 'medium-editor/dist/css/medium-editor.min.css'
import 'medium-editor/dist/css/themes/beagle.min.css'

import 'assets/fonts/LibreBaskerville/stylesheet.css'

const CONTENT_BACKUP_KEY = 'alighieri-content-backup'
const CONTENT_LAST_SAVED_KEY = 'alighieri-content-last-saved'
const DEFAULT_CONTENT_HTML = '<h1>Welcome to «Alighieri»</h1><p>When you feel <i>ready</i>, start to type your <b>masterpiece</b>...</p>'

export default {
  name: 'writer',
  components: {
    QLayout,
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
            'h1', 'h2', 'h3',
            'subscript', 'superscript',
            'bold', 'italic',
            'underline', 'strikethrough',
            'anchor',
            'quote', 'pre',
            // 'indent', 'outdent',
            'justifyLeft', 'justifyCenter', 'justifyRight', // 'justifyFull',
            'unorderedlist', 'orderedlist'
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
    this.mdToHtmlConverter = new showdown.Converter({
      simplifiedAutoLink: true,
      strikethrough: true,
      tables: true,
      tasklists: true,
      simpleLineBreaks: true
    })
    this.htmlToMdConverter = {
      convert: function (html) {
        return toMarkdown(html)
      }
    }
    this.$refs.layout.hideLeft()
    this.contentHTML = DEFAULT_CONTENT_HTML
    document.querySelector('#writer').focus()
  },
  destroyed () {
  },
  methods: {
    convertMdToHtml (md) {
      return this.mdToHtmlConverter.makeHtml(md)
    },
    convertHtmlToMd (html) {
      return this.htmlToMdConverter.convert(html)
    },
    convertTxtToHtml (txt) {
      return this.mdToHtmlConverter.makeHtml(txt)
    },
    convertHtmlToTxt (html) {
      return (html || '')
        .replace(/<p>|<h\d+>|<li>/g, '\n\n')
        .replace(/<br\s*\/*>/g, '\n')
        .replace(/\n\n\n/g, '\n\n')
        .replace(/<(?:.|\n)*?>/gm, '')
        .trim()
    },
    resetContent () {
      SessionStorage.set(CONTENT_LAST_SAVED_KEY, null)
      this.contentHTML = DEFAULT_CONTENT_HTML
      this.filename = null
    },
    checkContent (handlerFunc) {
      if (this.contentHTML !== SessionStorage.get.item(CONTENT_LAST_SAVED_KEY)) {
        Dialog.create({
          title: 'There are unsaved changes',
          message: 'Are you sure you want to discard them?',
          buttons: [
            'No',
            {
              label: 'Yes',
              handler: handlerFunc
            }
          ]
        })
      }
      else {
        handlerFunc()
      }
    },
    newFile () {
      this.checkContent(this.resetContent)
    },
    openFile (files) {
      if (files && files.length > 0) {
        var f = files[0]
        var reader = new FileReader()
        reader.onload = (evt) => {
          try {
            var data = evt.target.result
            this.filename = f.name.split('.')[0]
            this.contentHTML = data

            SessionStorage.set(CONTENT_LAST_SAVED_KEY, this.contentHTML)
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
    importFile (files) {
      if (files && files.length > 0) {
        var f = files[0]
        var reader = new FileReader()
        reader.onload = (evt) => {
          try {
            var data = evt.target.result
            this.filename = f.name.split('.')[0]

            if (f.type === 'text/markdown') {
              this.contentHTML = this.convertMdToHtml(data)
            }
            else if (f.type === 'text/plain') {
              this.contentHTML = this.convertTxtToHtml(data)
            }
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
        var fileContent = '<!DOCTYPE html><html>' +
        '<head>' +
        '<meta charset="utf-8">' +
        '<title>' + this.filename + '</title>' +
        '</head>' +
        '<body>' + this.contentHTML + '</body>' +
        '</html>'

        FileSaver.saveAs(
          new Blob(
            [fileContent],
            { type: 'text/html;charset=utf-8' }
          ),
          this.filename + '.html'
        )

        SessionStorage.set(CONTENT_LAST_SAVED_KEY, this.contentHTML)
      }
      else {
        this.saveFileAs()
      }
    },
    saveFileAs () {
      this.filename = 'test'
      this.saveFile()
    },
    exportFile (ext) {
      var fileContent = null
      var fileType = null

      if (!this.filename) {
        this.filename = 'test'
      }

      // Markdown (.md)
      if (ext === 'md') {
        fileContent = this.convertHtmlToMd(this.contentHTML)
        fileType = 'text/markdown'
      }

      // Plain text (.txt)
      if (ext === 'txt') {
        fileContent = this.convertHtmlToTxt(this.contentHTML)
        fileType = 'text/plain'
      }

      if (fileType) {
        FileSaver.saveAs(
          new Blob(
            [fileContent],
            { type: fileType + ';charset=utf-8' }
          ),
          this.filename + '.' + ext
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
        title: 'Alighieri',
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
        title: 'Alighieri',
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
      this.checkContent(this.resetContent)

      // TODO close window
    },
    updateContentAndStats () {
      this.content = this.convertHtmlToTxt(this.contentHTML)
      this.sentences = this.content
        .replace(/(\.+|:|;|\?|!)/g, '$1\n')
        .split(/\n+\s*/)
        .filter(n => n)
      this.words = this.content
        .split(/\s+/)
        .filter(n => n)
    },
    processEditOperation (operation) {
      this.$nextTick(() => {
        this.contentHTML = operation.api.getFocusedElement().innerHTML
        LocalStorage.set(CONTENT_BACKUP_KEY, this.contentHTML)
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

#writer
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

  table
    margin-bottom 1rem

    thead
      text-align left

    td, th
      padding .5rem

    td, thead td, th
      border-bottom 1px solid rgba(0,0,0,.1)

    @media screen and (max-width 576px)
      tr
        display flex
        flex-direction column

      td, th
        min-width 100%

      td:not(:last-of-type), th:not(:last-of-type)
        border-bottom none

  pre, code
    background-color #fafafa

  pre
    padding 1rem
    border-radius .25rem
    overflow-x auto

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

  .layout-page-container, .layout-page, #writer
    display inline-block
    width 100% !important
    max-width 100% !important
    padding 0 !important
    margin 0 !important
</style>
