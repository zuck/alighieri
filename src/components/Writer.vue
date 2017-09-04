<template>
  <q-layout id="writer" ref="layout" view="lHh LpR lFf">
    <toolbar
      id="toolbar"
      slot="header"
      :isSaved="!isChanged"
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
      id="editor"
      custom-tag="div"
      :text="contentHTML"
      :options="meOptions"
      :class="opts"
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
      @confirm="applySettings"
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
import MediumEditorAutoHR from 'medium-editor-autohr'
import showdown from 'showdown'
import toMarkdown from 'to-markdown'
import FileSaver from 'file-saver'
import screenfull from 'screenfull'

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

const initialWinTitle = 'Alighieri'

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
      isFullscreen: false,
      filename: null,
      contentHTML: null,
      content: null,
      words: [],
      sentences: [],
      opts: {},
      meOptions: {
        buttonLabels: 'fontawesome',
        placeholder: false,
        spellcheck: false,
        autoLink: false,
        extensions: {
          autolist: new MediumEditorAutoList(),
          autohr: new MediumEditorAutoHR()
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
    },
    isChanged: function () {
      return this.contentHTML !== SessionStorage.get.item(CONTENT_LAST_SAVED_KEY)
    },
    windowTitle: function () {
      return (this.filename ? this.filename : 'No title') +
        (this.isChanged ? '*' : '') +
        ' - ' + initialWinTitle
    }
  },
  mounted () {
    window.onbeforeunload = this.exit
    document.onkeyup = this.onKeyPress
    document.title = this.windowTitle

    this.$refs.layout.hideLeft()

    this.contentHTML = LocalStorage.get.item(CONTENT_BACKUP_KEY) || DEFAULT_CONTENT_HTML
    SessionStorage.set(CONTENT_LAST_SAVED_KEY, this.contentHTML)

    document.querySelector('#editor').focus()
  },
  methods: {
    resetFile () {
      SessionStorage.set(CONTENT_LAST_SAVED_KEY, DEFAULT_CONTENT_HTML)
      this.contentHTML = DEFAULT_CONTENT_HTML
      this.filename = null
    },
    newFile () {
      if (this.isChanged) {
        this.showConfirmDialog(this.resetFile)
      }
      else {
        this.resetFile()
      }
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
              .split('<body>')[1]
              .replace('</body>', '')
              .replace('</html>', '')

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
      var filename = this.filename

      if (fn) {
        filename = fn
      }

      if (filename) {
        if (filename.split('.').pop() !== 'html') {
          filename += '.html'
        }

        var fileContent = '<!DOCTYPE html><html>' +
        '<head>' +
        '<meta charset="utf-8">' +
        '<title>' + filename + '</title>' +
        '</head>' +
        '<body>' + this.contentHTML + '</body>' +
        '</html>'

        if (this.isElectron) {
          require('fs').writeFile(filename, fileContent, (err) => {
            if (err) throw err
          })
        }
        else {
          FileSaver.saveAs(
            new Blob(
              [fileContent],
              { type: 'text/html;charset=utf-8' }
            ),
            filename
          )
        }

        this.filename = filename
        SessionStorage.set(CONTENT_LAST_SAVED_KEY, this.contentHTML)
        /* Hack to recompute 'isCHanged' property */
        this.contentHTML = ' ' + this.contentHTML
        this.contentHTML = this.contentHTML.substr(1)
        /* */
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
    exit (evt) {
      if (evt && this.isChanged) {
        evt.returnValue = false
      }

      if (this.$electron) {
        const closeFunc = () => {
          window.onbeforeunload = null
          this.$electron.remote.getCurrentWindow().close()
        }

        if (this.isChanged) {
          this.showConfirmDialog(closeFunc)
        }
        else {
          closeFunc()
        }
      }
    },
    applySettings (opts) {
      this.opts = opts
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
    },
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
        evt.preventDefault()
        evt.stopPropagation()
        evt.returnValue = false

        if (evt.ctrlKey) {
          if (this.isElectron) {
            const win = this.$electron.remote.getCurrentWindow()
            win.setFullScreen(!win.isFullScreen())
            this.isFullscreen = win.isFullScreen()
          }
          else {
            screenfull.toggle(screenfull.element || document.documentElement)
            this.isFullscreen = screenfull.isFullscreen
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
    showConfirmDialog (handlerFunc, title, message) {
      Dialog.create({
        title: title || 'There are unsaved changes',
        message: message || 'Are you sure you want to discard them?',
        buttons: ['No', {
          label: 'Yes',
          handler: handlerFunc
        }]
      })
    }
  },
  watch: {
    contentHTML: function (val) {
      this.updateContentAndStats()
    },
    isFullscreen: function (val) {
      this.$refs.layout.hideLeft()
    },
    windowTitle: function (val) {
      document.title = val
    }
  }
}
</script>

<style lang="stylus">
@require '../themes/quasar.variables'

.medium-editor-toolbar
  top 0 !important
  width 100%
  margin 0
  border-radius 0

  li button.medium-editor-action
    color $neutral
    background-color transparent

    &:hover
      color $warning
      background-color #333

    &.medium-editor-button-active
      color $primary

    &.medium-editor-button-first,
    &.medium-editor-button-last
      border-radius 0
      padding-left 12px
      padding-right 12px
      margin 0

  @media screen and (min-width $breakpoint-sm)
    top 12px !important
    width auto
    border-radius 20px

    li button.medium-editor-action
      &.medium-editor-button-first
        margin-left 20px

      &.medium-editor-button-last
        margin-right 20px

#writer
  .layout-header, .layout-aside
    box-shadow none !important
    border-color $neutral

  .layout-header
    border-bottom none

  .layout-aside
    border-right-width 1px
    border-right-style solid

  @media print
    .layout-header, .layout-aside, .layout-backdrop
      display none

    .layout-page-container, .layout-page
      display inline
      width 100% !important
      max-width 100% !important
      padding 0 !important
      margin 0 !important
      overflow visible

#editor
  display block
  box-sizing border-box
  min-width 256px
  width 100%
  max-width 640px
  min-height 5rem
  margin 0 auto
  padding 1rem 2rem
  outline none
  border none
  line-height 2
  color #111
  font-family 'LibreBaskerville', serif !important

  p, table, pre
    line-height 2

    &+h1
      margin-top 5.656rem

    &+h2, &+h3, &+h4
      margin-top 2.828rem

  h1, h2, h3, h4
    margin 0 0 1.414rem
    font-weight inherit
    line-height 1.2
    color $tertiary

  h1
    font-size 2.369em
    color #000

    &+p
      margin-top 2.828rem

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

    @media screen and (max-width $breakpoint-xs)
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
    padding .25rem
    white-space nowrap
    background-color $neutral

  blockquote
    border-left-color $neutral
    line-height 1.5

    :last-child
      margin-bottom 0

  hr
    display block
    width 100%
    border none
    border-top 1px solid $neutral
    margin 2rem 0 2.5rem

  &:not(.parSpaceBetween) p
    margin-bottom 0

  &.parIdentFirstLine p
    text-indent 2rem

  @media screen and (min-width $breakpoint-sm)
    padding-top 0

  /* Printing */

  @media print
    display inline
    padding 0

    h1:not(:first-child)
      page-break-before always

    hr
      display block
      margin 0
      padding 0
      border none
      visibility hidden
      page-break-before always

    h1, h2, h3, h4, h5, h6
      page-break-after avoid

    p+h1, table+h1, pre+h1
      margin-top 0

    table, figure, blockquote
      width 100%
      page-break-inside avoid
</style>
