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
import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'

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
    this.$q.dark.set(this.$store.state.base.darkMode)
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

    async confirmChangeDiscard () {
      const isChanged = this.$store.getters['editor/isChanged']
      return !isChanged || await this.showConfirmDlg({
        title: 'There are unsaved changes',
        message: 'Do you confirm you want to discard them?',
        cancel: true,
        persistent: true
      })
    },

    onToggleMenu () {
      this.$store.commit('base/toggleMenu')
    },

    onToggleDarkMode () {
      this.$store.commit('base/toggleDarkMode')
    },

    onAbout () {
      this.$store.dispatch('base/about')
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
        this.$store.dispatch('editor/openFile')
      }
    },

    onSaveFile () {
      this.$store.dispatch('editor/saveFile')
    },

    onSaveFileAs () {
      this.$store.dispatch('editor/saveFileAs')
    },

    async onImportFile () {
      const confirmed = await this.confirmChangeDiscard()
      if (confirmed) {
        this.$store.dispatch('editor/importFile')
      }
    },

    onExportFileAs () {
      this.$store.dispatch('editor/exportFileAs')
    },

    onPrintFile () {
      this.$store.dispatch('editor/printFile')
    },

    onSettings () {
      this.$store.dispatch('base/settings')
    },

    onExit () {
      this.$store.dispatch('base/exit')
    }
  }
}
</script>
