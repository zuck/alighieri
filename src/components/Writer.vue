<template>
  <q-layout ref="layout" view="lHh LpR lFf">
    <toolbar
      id="toolbar"
      slot="header"
      :wordCount="wordCount"
      :sentenceCount="sentenceCount"
      @menuToggle="$refs.layout.toggleLeft()"
    />

    <left-menu
      id="left-menu"
      slot="left"
      @new="newFile()"
      @open="$refs.openFile.click()"
      @import="$refs.importFile.click()"
      @save="saveFile()"
      @saveAs="saveFileAs()"
      @export="exportFileAs()"
      @print="printFile()"
      @settings="settings()"
      @about="about()"
      @exit="exit()"
    />

    <input
      type="file"
      accept=".html"
      style="display:none"
      @change="openFile($event.target.files)"
      ref="openFile"
    >

    <input
      type="file"
      accept=".md,.txt"
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

    <save-as-modal
      id="save-as-modal"
      ref="saveAsModal"
      :filename="this.filename || this.sentences[0]"
      @save="saveFile"
      v-if="!isElectron"
    />

    <export-modal
      id="export-modal"
      ref="exportModal"
      :filename="this.filename || this.sentences[0]"
      @export="exportFile"
      v-if="!isElectron"
    />

    <settings-modal
      id="settings-modal"
      ref="settingsModal"
    />

    <about-modal
      id="about-modal"
      ref="aboutModal"
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
import SaveAsModal from 'components/SaveAsModal'
import ExportModal from 'components/ExportModal'
import SettingsModal from 'components/SettingsModal'
import AboutModal from 'components/AboutModal'

import 'font-awesome/css/font-awesome.min.css'
import 'medium-editor/dist/css/medium-editor.min.css'
import 'medium-editor/dist/css/themes/beagle.min.css'

import 'assets/fonts/LibreBaskerville/stylesheet.css'

const CONTENT_BACKUP_KEY = 'alighieri-content-backup'
const CONTENT_LAST_SAVED_KEY = 'alighieri-content-last-saved'
const DEFAULT_CONTENT_HTML = '<h1>Welcome to «Alighieri»</h1>' +
  '<p>When you feel <i>ready</i>, start to type your <b>masterpiece</b>...</p>'

var mdToHtmlConverter = new showdown.Converter({
  simplifiedAutoLink: true,
  strikethrough: true,
  tables: true,
  tasklists: true,
  simpleLineBreaks: true
})
var htmlToMdConverter = {
  convert: function (html) {
    return toMarkdown(html)
  }
}

export default {
  name: 'writer',
  components: {
    QLayout,
    VueMediumEditor,
    Toolbar,
    LeftMenu,
    SaveAsModal,
    ExportModal,
    SettingsModal,
    AboutModal
  },
  data () {
    return {
      isElectron: (this.$electron),
      filename: null,
      contentHTML: null,
      content: null,
      words: [],
      sentences: [],
      options: {
        buttonLabels: 'fontawesome',
        placeholder: false,
        spellcheck: false,
        autoLink: false,
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
    document.onkeydown = this.onKeyPress
    this.$refs.layout.hideLeft()
    this.contentHTML = LocalStorage.get.item(CONTENT_BACKUP_KEY) || DEFAULT_CONTENT_HTML
    document.querySelector('#writer').focus()
  },
  methods: {
    onKeyPress (evt) {
      // Open file
      if (evt.key === 'o' && evt.ctrlKey) {
        evt.preventDefault()
        this.$refs.openFile.click()
      }

      // Save file
      if (evt.key === 's' && evt.ctrlKey) {
        evt.preventDefault()
        this.saveFile()
      }

      // Zen mode
      if (evt.key === 'F11') {
        if (this.isElectron) {
          const win = this.$electron.remote.getCurrentWindow()
          win.setFullScreen(!win.isFullScreen())
        }
        else {
          if (document.isFullscreen) {
            document.exitFullscreen()
          }
          else {
            document.documentElement.requestFullscreen()
          }
        }
      }
    },
    convertMdToHtml (md) {
      return mdToHtmlConverter.makeHtml(md)
    },
    convertHtmlToMd (html) {
      return htmlToMdConverter.convert(html)
    },
    convertTxtToHtml (txt) {
      return mdToHtmlConverter.makeHtml(txt)
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
    saveFile (fn) {
      if (fn) {
        this.filename = fn
      }

      if (this.filename) {
        var fileContent = '<!DOCTYPE html><html>' +
        '<head>' +
        '<meta charset="utf-8">' +
        '<title>' + this.filename + '</title>' +
        '</head>' +
        '<body>' + this.contentHTML + '</body>' +
        '</html>'

        if (this.filename.split('.')[1] !== 'html') {
          this.filename += '.html'
        }

        if (this.isElectron) {
          require('fs').writeFile(this.filename, fileContent, (err) => {
            if (err) throw err
          })
        }
        else {
          FileSaver.saveAs(
            new Blob(
              [fileContent],
              { type: 'text/html;charset=utf-8' }
            ),
            this.filename
          )
        }

        SessionStorage.set(CONTENT_LAST_SAVED_KEY, this.contentHTML)
      }
      else {
        this.saveFileAs()
      }
    },
    saveFileAs () {
      if (this.isElectron) {
        this.$electron.remote.dialog.showSaveDialog({
          title: 'Save as',
          defaultPath: this.filename,
          filters: [
            { name: 'Plain HTML', extensions: ['html'] }
          ]
        }, (fn) => {
          if (fn) {
            this.saveFile(fn)
          }
        })
      }
      else {
        this.$refs.saveAsModal.open()
      }
    },
    exportFile (fn, ext) {
      var fileContent = null
      var fileType = null

      if (fn) {
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
          var filename = fn + '.' + ext

          if (this.isElectron) {
            require('fs').writeFile(filename, fileContent, (err) => {
              if (err) throw err
            })
          }
          else {
            FileSaver.saveAs(
              new Blob(
                [fileContent],
                { type: fileType + ';charset=utf-8' }
              ),
              filename
            )
          }
        }
      }
    },
    exportFileAs () {
      if (this.isElectron) {
        this.$electron.remote.dialog.showSaveDialog({
          title: 'Export to',
          buttonLabel: 'Export',
          filters: [
            { name: 'Markdown', extensions: ['md'] },
            { name: 'Plain Text', extensions: ['txt'] }
          ]
        }, (fn) => {
          if (fn) {
            var fnTokens = fn.split('.')
            this.exportFile(fnTokens[0], fnTokens[1])
          }
        })
      }
      else {
        this.$refs.exportModal.open()
      }
    },
    printFile () {
      window.print()
    },
    settings () {
      this.$refs.settingsModal.open()
    },
    about () {
      this.$refs.aboutModal.open()
    },
    exit () {
      this.checkContent(this.resetContent)

      if (this.$electron) {
        const window = this.$electron.remote.getCurrentWindow()
        window.close()
      }
    },
    updateContentAndStats () {
      this.content = this.convertHtmlToTxt(this.contentHTML)
      // Store backup content (only if there is valid text)
      if (this.content && this.content.length > 0) {
        LocalStorage.set(CONTENT_BACKUP_KEY, this.contentHTML)
      }
      else {
        LocalStorage.remove(CONTENT_BACKUP_KEY)
      }
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
@require '../themes/app.variables'

body
  font-family 'LibreBaskerville', serif
  background-color #fff
  overflow-x hidden

.layout-header, .layout-aside
  box-shadow none !important

.layout-padding
  padding 2rem 2rem 1rem

.modal-buttons
  padding 0 2rem 2rem
  justify-content space-between

hr
  border none
  border-top 1px solid $neutral
  margin-bottom 1rem

input
  display block
  width 100%
  padding 8px
  margin-bottom .5rem
  border 1px solid $tertiary
  outline none

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
    color $tertiary

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
    width 100%
    margin-bottom 1rem
    border-collapse collapse

    thead
      text-align left

    td, th
      padding .5rem
      border-bottom 1px solid $neutral
      vertical-align top

    thead td, thead th
      border-color $tertiary

    @media screen and (max-width 576px)
      tr
        display flex
        flex-direction column

      td, th
        min-width 100%

      td:not(:last-of-type), th:not(:last-of-type)
        border-bottom none

  pre
    padding 1rem
    border-radius .25rem
    overflow-x auto
    background-color $neutral

    code
      background-color transparent
      white-space pre-wrap

  code
    padding 4px
    white-space nowrap
    background-color $neutral

  blockquote
    border-left-color $neutral

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
