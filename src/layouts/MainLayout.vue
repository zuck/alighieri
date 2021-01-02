<template>
  <q-layout view="lHh lpr lFf">
    <q-header class="bg-transparent">
      <navbar
        @toggleDarkMode="onToggleDarkMode"
        @toggleMenu="onToggleMenu"
      />
    </q-header>

    <q-drawer
      mini-to-overlay
      bordered
      :value="menuOpen"
      :mini="menuMini"
      @mouseover="menuMini = false"
      @mouseout="menuMini = true"
      @input="onToggleMenu"
    >
      <sidebar
        @about="onAbout"
        @newFile="onNewFile"
        @openFile="onOpenFile"
        @saveFile="onSaveFile"
        @saveFileAs="onSaveFileAs"
        @importFile="onImportFile"
        @exportFileAs="onExportFileAs"
        @printFile="onPrintFile"
        @settings="onSettings"
        @exit="onExit"
      />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { exportFile } from 'quasar'
import { importFile } from '../utils/loadfile'
import {
  extractHtmlContent,
  convertMdToHtml,
  convertTxtToHtml,
  convertHtmlToMd,
  convertHtmlToTxt
} from '../utils/conversion'
import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'
import SaveDialog from 'components/SaveDialog'
import SettingsDialog from 'components/SettingsDialog'
import AboutDialog from 'src/components/AboutDialog.vue'

export default {
  name: 'MainLayout',

  components: {
    Navbar,
    Sidebar
  },

  computed: {
    menuOpen () {
      return this.$store.state.base.menuOpen
    }
  },

  data () {
    return {
      menuMini: true
    }
  },

  mounted () {
    window.addEventListener('beforeunload', this.onExit)
    document.addEventListener('keydown', this.onKeyDown)
    this.$q.dark.set(this.$store.state.base.darkMode)
  },

  beforeDestroy () {
    window.removeEventListener('beforeunload', this.onExit)
    document.removeEventListener('keydown', this.onKeyDown)
  },

  methods: {
    async showConfirmDlg (opts) {
      return new Promise((resolve, reject) => {
        try {
          this.$q.dialog(opts)
            .onOk(data => resolve(data || true))
            .onCancel(() => resolve(false))
        } catch (err) {
          reject(err)
        }
      })
    },

    async showAboutDlg (opts) {
      return new Promise((resolve, reject) => {
        try {
          this.$q.dialog({
            component: AboutDialog,
            parent: this,
            ...opts
          })
            .onOk(data => resolve(data || true))
            .onCancel(() => resolve(false))
        } catch (err) {
          reject(err)
        }
      })
    },

    async showSaveAsDlg (opts) {
      return new Promise((resolve, reject) => {
        try {
          this.$q.dialog({
            component: SaveDialog,
            parent: this,
            ...opts
          })
            .onOk(data => resolve(data || true))
            .onCancel(() => resolve(false))
        } catch (err) {
          reject(err)
        }
      })
    },

    async showSettingsDlg (opts) {
      return new Promise((resolve, reject) => {
        try {
          this.$q.dialog({
            component: SettingsDialog,
            parent: this,
            ...opts
          })
            .onOk(data => resolve(data || true))
            .onCancel(() => resolve(false))
        } catch (err) {
          reject(err)
        }
      })
    },

    async confirmChangeDiscard () {
      const isChanged = this.$store.getters['editor/isChanged']
      return !isChanged || await this.showConfirmDlg({
        title: this.$t('There are unsaved changes'),
        message: this.$t('Do you confirm you want to discard them?'),
        cancel: true,
        persistent: true
      })
    },

    onToggleMenu () {
      this.$store.commit('base/toggleMenu')
    },

    onToggleDarkMode () {
      this.$store.dispatch('base/toggleDarkMode')
    },

    async onAbout () {
      await this.showAboutDlg()
    },

    async onNewFile () {
      const confirmed = await this.confirmChangeDiscard()
      if (confirmed) {
        this.$store.dispatch('editor/newFile')
      }
    },

    async onOpenFile () {
      const confirmed = await this.confirmChangeDiscard()
      if (confirmed) {
        const file = await importFile(['text/html'])
        this.$store.dispatch('editor/loadFile', {
          name: file.name,
          html: extractHtmlContent(file.content)
        })
      }
    },

    onSaveFile () {
      this.$store.dispatch('editor/saveFile')
    },

    async onSaveFileAs () {
      const res = await this.showSaveAsDlg({
        filename: this.$store.state.editor.filename
      })
      if (res.filename) {
        const filename = `${res.filename}.${res.ext}`
        const content = this.$store.state.editor.contentHTML
        const confirmed = exportFile(filename, content, 'text/html')
        if (confirmed) {
          this.$store.commit('editor/setFilename', filename)
          this.$store.dispatch('editor/saveFile')
        }
      }
    },

    async onImportFile () {
      const confirmed = await this.confirmChangeDiscard()
      if (confirmed) {
        const file = await importFile(['.md', 'text/plain'])
        let html = ''
        switch (file.type) {
          case 'text/markdown':
            html = convertMdToHtml(file.content)
            break
          default:
            html = convertTxtToHtml(file.content)
            break
        }
        this.$store.dispatch('editor/loadFile', {
          name: file.name,
          html
        })
      }
    },

    async onExportFileAs () {
      const res = await this.showSaveAsDlg({
        filename: this.$store.state.editor.filename,
        title: this.$t('Export as'),
        extensions: ['md', 'txt']
      })
      if (res) {
        const html = this.$store.state.editor.contentHTML
        const filename = `${res.filename}.${res.ext}`
        switch (res.ext) {
          case 'md':
            exportFile(filename, convertHtmlToMd(html), 'text/markdown')
            break
          default:
            exportFile(filename, convertHtmlToTxt(html), 'text/plain')
            break
        }
      }
    },

    onPrintFile () {
      this.$store.dispatch('editor/printFile')
    },

    async onSettings () {
      const settings = await this.showSettingsDlg()
      if (settings) {
        this.$store.dispatch('base/updateSettings', settings)
      }
    },

    async onExit () {
      const confirmed = await this.confirmChangeDiscard()
      if (confirmed) {
        window.onbeforeunload = null
        if (this.$q.electron) {
          this.$q.electron.remote.getCurrentWindow().close()
        }
      }
    },

    onKeyDown (evt) {
      // Toggle menu
      if (evt.key === 'm' && evt.ctrlKey) {
        evt.preventDefault()
        this.onToggleMenu()
      }
      // Toggle dark mode
      if (evt.key === 'd' && evt.ctrlKey) {
        evt.preventDefault()
        this.onToggleDarkMode()
      }
      // Open file
      if (evt.key === 'o' && evt.ctrlKey) {
        evt.preventDefault()
        this.onOpenFile()
      }
      // Save file
      if (evt.key === 's' && evt.ctrlKey) {
        evt.preventDefault()
        this.onSaveFile()
      }
      // Print file
      if (evt.key === 'p' && evt.ctrlKey) {
        evt.preventDefault()
        this.onPrintFile()
      }
    }
  }
}
</script>
