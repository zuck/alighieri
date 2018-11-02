<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <toolbar @toggleMenu="toggleMenu()" @toggleDarkMode="toggleDarkMode()" @save="saveFile()"/>
    </q-layout-header>
    <q-layout-drawer v-model="leftDrawerOpen">
      <sidebar
        @new="newFile"
        @open="openFileFrom"
        @import="importFileFrom"
        @save="saveFile"
        @saveAs="saveFileAs"
        @exportAs="exportFileAs"
        @print="printFile"
        @settings="settings"
        @about="about"
        @exit="exit"
      />
    </q-layout-drawer>
    <q-page-container>
      <router-view/>
      <input
        ref="openFile"
        v-if="!$q.platform.is.electron"
        type="file"
        accept=".html"
        style="display:none"
        @change="openFile($event.target.files)"
      >
      <input
        ref="importFile"
        v-if="!$q.platform.is.electron"
        type="file"
        accept=".md, .txt"
        style="display:none"
        @change="importFile($event.target.files)"
      >
      <save-modal ref="saveModal" v-if="!$q.platform.is.electron"/>
      <settings-modal ref="settingsModal"/>
      <about-modal ref="aboutModal"/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import FileSaver from 'file-saver'

import Toolbar from 'components/Toolbar'
import Sidebar from 'components/Sidebar'
import SaveModal from 'components/SaveModal'
import SettingsModal from 'components/SettingsModal'
import AboutModal from 'components/AboutModal'
import {
  convertTxtToHtml,
  convertMdToHtml,
  convertHtmlToMd
} from '../conversion'

import * as INFO from '../../package.json'

const PRODUCT_NAME = INFO.productName
const DEFAULT_CONTENT_HTML =
  `<h1>Welcome to «${PRODUCT_NAME}»</h1>` +
  `<h2><i>A distraction-free editor for writers</i></h2>` +
  `<h3>Are you ready?</h3>` +
  `<p>When you <i>feel</i> you are, start to type your <b>masterpiece</b>...</p>`

export default {
  name: 'LayoutDefault',

  components: {
    Toolbar,
    Sidebar,
    SaveModal,
    SettingsModal,
    AboutModal
  },

  computed: {
    isChanged () {
      return this.$store.getters['isChanged']
    },

    fileName () {
      return this.$store.state.filename || this.$store.state.sentences[0]
    },

    fileTitle () {
      return (this.$store.state.filename || '')
        .split('/')
        .pop()
        .split('.')[0]
    },

    windowTitle () {
      return [
        this.fileTitle || this.$t('No title'),
        this.isChanged ? '*' : '',
        ' - ',
        PRODUCT_NAME
      ].join('')
    }
  },

  data () {
    return {
      leftDrawerOpen: false
    }
  },

  mounted () {
    window.addEventListener('beforeunload', this.exit)
    document.addEventListener('keypress', this.onKeyPress)
    document.title = this.windowTitle
  },

  methods: {
    openURL,

    onKeyPress (evt) {
      // Toggle menu
      if (evt.key === 'm' && evt.ctrlKey) {
        evt.preventDefault()
        this.toggleMenu()
      }

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

      // Toggle dark mode
      if (evt.key === 'd' && evt.ctrlKey) {
        evt.preventDefault()
        this.toggleDarkMode()
      }
    },

    resetFile () {
      this.$store.dispatch('updateContent', DEFAULT_CONTENT_HTML)
      this.$store.commit('updateFilename', null)
      this.$store.commit('registerLastSave', null)
    },

    newFile () {
      if (this.isChanged) {
        this.showConfirmDialog().then(() => this.resetFile())
      } else {
        this.resetFile()
      }
    },

    openFileFrom () {
      if (this.$q.platform.is.electron) {
        const title = this.$t('Open')
        const filters = [{ name: this.$t('Plain HTML'), extensions: ['html'] }]

        this.$q.electron.remote.dialog.showOpenDialog(
          {
            title: title,
            defaultPath: this.fileName,
            buttonLabel: this.$t('Open'),
            filters: filters
          },
          fileNames => {
            const fn = fileNames[0]
            if (fileNames && fileNames.length > 0) {
              this.$q.electron.remote
                .require('fs')
                .readFile(fn, (err, data) => {
                  if (err) throw err
                  const f = new Blob([data])
                  f.name = fn
                  this.openFile([f])
                })
            }
          }
        )
      } else {
        this.$refs.openFile.click()
      }
    },

    importFileFrom () {
      if (this.$q.platform.is.electron) {
        const title = this.$t('Import')
        const filters = [
          { name: this.$t('Markdown'), extensions: ['md'] },
          { name: this.$t('Plain Text'), extensions: ['txt'] }
        ]

        this.$q.electron.remote.dialog.showOpenDialog(
          {
            title: title,
            defaultPath: this.fileName,
            buttonLabel: this.$t('Import'),
            filters: filters
          },
          fileNames => {
            if (fileNames && fileNames.length > 0) {
              const fn = fileNames[0]
              this.$q.electron.remote
                .require('fs')
                .readFile(fn, (err, data) => {
                  if (err) throw err
                  const f = new Blob([data])
                  f.name = fn
                  this.importFile([f])
                })
            }
          }
        )
      } else {
        this.$refs.importFile.click()
      }
    },

    openFile (files) {
      if (files && files.length > 0) {
        const f = files[0]
        const reader = new FileReader()
        reader.onload = evt => {
          try {
            const html = evt.target.result
              .split('<body>')[1]
              .replace('</body>', '')
              .replace('</html>', '')
            this.$store.dispatch('updateContent', html)
            this.$store.commit('updateFilename', f.name.split('.')[0])
            this.$store.commit('registerLastSave')
          } catch (err) {
            reader.onerror(err)
          }
        }
        reader.onerror = () => {
          // TODO notify import error
        }
        reader.readAsText(f)
      }
    },

    importFile (files) {
      if (files && files.length > 0) {
        const f = files[0]
        const reader = new FileReader()
        reader.onload = evt => {
          try {
            if (f.type === 'text/markdown') {
              this.$store.dispatch(
                'updateContent',
                convertMdToHtml(evt.target.result)
              )
            } else if (f.type === 'text/plain') {
              this.$store.dispatch(
                'updateContent',
                convertTxtToHtml(evt.target.result)
              )
            }
            this.$store.commit('updateFilename', f.name.split('.')[0])
            this.$store.commit('registerLastSave')
          } catch (err) {
            reader.onerror(err)
          }
        }
        reader.onerror = () => {
          // TODO notify import error
        }
        reader.readAsText(f)
      }
    },

    saveFile (fn) {
      let filename = fn || this.$store.state.filename

      if (filename) {
        if (filename.split('.').pop() !== 'html') {
          filename += '.html'
        }

        const fileContent =
          '<!DOCTYPE html><html>' +
          '<head>' +
          '<meta charset="utf-8">' +
          '<title>' +
          filename +
          '</title>' +
          '</head>' +
          '<body>' +
          this.$store.state.contentHTML +
          '</body>' +
          '</html>'

        if (this.$q.platform.is.electron) {
          this.$q.electron.remote
            .require('fs')
            .writeFile(filename, fileContent, err => {
              if (err) throw err
            })
        } else {
          FileSaver.saveAs(
            new Blob([fileContent], { type: 'text/html;charset=utf-8' }),
            filename
          )
        }

        this.$store.commit('updateFilename', filename)
        this.$store.commit('registerLastSave')
      } else {
        this.saveFileAs()
      }
    },

    saveFileAs () {
      const title = this.$t('Save as')
      const filters = [{ name: this.$t('Plain HTML'), extensions: ['html'] }]
      const saveFileTo = fn => {
        if (fn) {
          const fnTokens = fn.split('.')
          this.saveFile(fnTokens[0], fnTokens[1])
        }
      }
      if (this.$q.platform.is.electron) {
        this.$q.electron.remote.dialog.showSaveDialog(
          {
            title: title,
            defaultPath: this.fileName,
            filters: filters
          },
          saveFileTo
        )
      } else {
        this.$refs.saveModal
          .open(this.fileName)
          .then(saveFileTo)
          .catch(() => { })
      }
    },

    exportFile (fn, ext) {
      let fileContent = null
      let fileType = null

      if (fn) {
        // Markdown (.md)
        if (ext === 'md') {
          fileContent = convertHtmlToMd(this.$store.state.contentHTML)
          fileType = 'text/markdown'
        }

        // Plain text (.txt)
        if (ext === 'txt') {
          fileContent = this.$store.state.content
          fileType = 'text/plain'
        }

        if (fileType) {
          const filename = fn + '.' + ext

          if (this.$q.platform.is.electron) {
            this.$q.electron.remote
              .require('fs')
              .writeFile(filename, fileContent, err => {
                if (err) throw err
              })
          } else {
            FileSaver.saveAs(
              new Blob([fileContent], { type: fileType + ';charset=utf-8' }),
              filename
            )
          }
        }
      }
    },

    exportFileAs () {
      const title = this.$t('Export to')
      const buttonLabel = this.$t('Export')
      const filters = [
        { name: this.$t('Markdown'), extensions: ['md'] },
        { name: this.$t('Plain Text'), extensions: ['txt'] }
      ]
      const exportFileTo = fn => {
        if (fn) {
          const fnTokens = fn.split('.')
          this.exportFile(fnTokens[0], fnTokens[1])
        }
      }
      if (this.$q.platform.is.electron) {
        this.$q.electron.remote.dialog.showSaveDialog(
          { title, buttonLabel, filters },
          exportFileTo
        )
      } else {
        this.$refs.saveModal
          .open(
            this.$store.state.filename || this.$store.state.sentences[0],
            title,
            buttonLabel,
            filters.map(item => {
              return {
                label: '.' + item.extensions[0],
                value: item.extensions[0]
              }
            })
          )
          .then(exportFileTo)
          .catch(() => { })
      }
    },

    printFile () {
      window.print()
    },

    settings () {
      this.$refs.settingsModal
        .open(this.$store.state.settings)
        .then(settings => this.$store.commit('updateSettings', settings))
        .catch(() => { })
    },

    about () {
      this.$refs.aboutModal.open()
    },

    toggleMenu () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },

    toggleDarkMode () {
      this.$store.commit('updateSettings', {
        darkMode: !this.$store.state.settings.darkMode
      })
    },

    exit (evt) {
      if (this.$q.electron) {
        const closeFunc = () => {
          window.onbeforeunload = null
          this.$q.electron.remote.getCurrentWindow().close()
        }

        if (this.isChanged) {
          this.showConfirmDialog().then(() => closeFunc())
        } else {
          closeFunc()
        }
      }
    },

    applySettings (opts) {
      this.opts = opts
    },

    showConfirmDialog (title, message) {
      return this.$q.dialog({
        title: title || this.$t('There are unsaved changes'),
        message: message || this.$t('Are you sure you want to discard them?'),
        ok: true,
        cancel: true
      })
    }
  },

  watch: {
    windowTitle (val) {
      document.title = val
    }
  }
}
</script>

<style lang="stylus">
@media print {
  @page {
    size: auto;
    margin: 25mm;
    orphans: 2;
    widows: 3;
  }

  body {
    font-size: 10pt;
    background-color: transparent;
    overflow: auto;
    padding: 0 !important;
    margin: 0 !important;
  }
}
</style>
