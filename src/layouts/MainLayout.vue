<template>
  <q-layout
    view="hHh Lpr lFf"
    :class="baseClass"
  >
    <q-header :class="baseClass">
      <navbar
        @toggleDarkMode="onToggleDarkMode"
        @toggleMenu="onToggleMenu"
        @save="onSaveFile"
        @about="onAbout"
      />
    </q-header>

    <q-drawer
      mini
      :class="baseClass"
      v-model="menuOpen"
    >
      <sidebar
        @newFile="onNewFile"
        @openFile="onOpenFile"
        @saveFile="onSaveFile"
        @saveFileAs="onSaveFileAs"
        @printFile="onPrintFile"
        @settings="onSettings"
      />
      <q-btn
        dense
        round
        color="accent"
        icon="menu_open"
        class="lt-md absolute-top-right q-mt-sm"
        style="margin-right:-16px"
        @click="onToggleMenu"
      />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { showOpenFilePicker } from 'file-system-access'
import { useQuasar } from 'quasar'
import AboutDialog from 'src/components/AboutDialog'
import Navbar from 'src/components/Navbar'
import Sidebar from 'src/components/Sidebar'
import { serializeContent } from 'src/conversion'
import { computed, defineComponent, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'MainLayout',

  components: {
    Navbar,
    Sidebar
  },

  setup () {
    const store = useStore()
    const i18n = useI18n()
    const $q = useQuasar()
    const menuOpen = computed(() => store.state.base.menuOpen)
    const isDark = computed(() => store.state.base.darkMode)
    const baseClass = computed(() => isDark.value ? 'q-dark' : 'bg-white text-dark')

    function askConfirmOrExecute (shouldAskConfirm, action) {
      if (shouldAskConfirm) {
        $q.dialog({
          title: i18n.t('There are unsaved changes'),
          message: i18n.t('Are you sure you want to discard the current document?'),
          ok: i18n.t('Confirm'),
          cancel: true,
          persistent: true
        }).onOk(action)
      } else {
        action()
      }
    }

    function onNewFile () {
      const hasUnsavedChanges = store.getters['editor/hasUnsavedChanges']
      const resetFile = () => store.dispatch('editor/resetFile')
      askConfirmOrExecute(hasUnsavedChanges, resetFile)
    }

    async function onOpenFile () {
      const [fileHandle] = await showOpenFilePicker({
      })
      const file = await fileHandle.getFile()
      const content = await file.text()
      store.dispatch('editor/loadFile', {
        filename: file.name,
        content
      })
    }

    async function onSaveFile () {
      store.dispatch('editor/saveFile')
    }

    async function onSaveFileAs () {
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: store.state.editor.filename
      })
      store.dispatch('editor/saveFile', fileHandle.name)
      const writable = await fileHandle.createWritable()
      const content = serializeContent(store.state.editor.content, fileHandle.name)
      await writable.write(content)
      await writable.close()
    }

    function onPrintFile () {
      store.dispatch('editor/printFile')
    }

    function onSettings () {
      const settings = {
        darkMode: store.state.base.darkMode,
        parSpaceBetween: store.state.base.parSpaceBetween,
        parIndentFirstLine: store.state.base.parIndentFirstLine
      }
      $q.dialog({
        title: i18n.t('Settings'),
        options: {
          type: 'toggle',
          model: Object.keys(settings).filter(opt => !!settings[opt]),
          items: [
            { label: i18n.t('Dark mode'), value: 'darkMode' },
            { label: i18n.t('Space between paragraphs'), value: 'parSpaceBetween' },
            { label: i18n.t('Indent first line'), value: 'parIndentFirstLine' }
          ]
        },
        cancel: true,
        persistent: true
      })
        .onOk(res => {
          store.commit('base/setDarkMode', res.includes('darkMode'))
          store.commit('base/setParagraphSpaceBetween', res.includes('parSpaceBetween'))
          store.commit('base/setParagraphIndentFirstLine', res.includes('parIndentFirstLine'))
        })
    }

    function onAbout () {
      $q.dialog({
        component: AboutDialog
      })
    }

    function onToggleMenu () {
      store.commit('base/toggleMenu')
    }

    function onToggleDarkMode () {
      store.dispatch('base/toggleDarkMode')
    }

    function onKeyDown (evt) {
      // Toggle menu
      if (evt.key === 'm' && evt.ctrlKey) {
        evt.preventDefault()
        onToggleMenu()
      }
      // Toggle dark mode
      if (evt.key === 'd' && evt.ctrlKey) {
        evt.preventDefault()
        onToggleDarkMode()
      }
      // Open file
      if (evt.key === 'o' && evt.ctrlKey) {
        evt.preventDefault()
        onOpenFile()
      }
      // Save file
      if (evt.key === 's' && evt.ctrlKey) {
        evt.preventDefault()
        onSaveFile()
      }
      // Print file
      if (evt.key === 'p' && evt.ctrlKey) {
        evt.preventDefault()
        onPrintFile()
      }
    }

    function onExit () {
      // TODO
    }

    onMounted(() => {
      window.addEventListener('beforeunload', onExit)
      document.addEventListener('keydown', onKeyDown)
      $q.dark.set(store.state.base.darkMode)
    })

    onUnmounted(() => {
      window.removeEventListener('beforeunload', onExit)
      document.removeEventListener('keydown', onKeyDown)
    })

    return {
      menuOpen,
      isDark,
      baseClass,
      onNewFile,
      onOpenFile,
      onSaveFile,
      onSaveFileAs,
      onPrintFile,
      onSettings,
      onAbout,
      onToggleMenu,
      onToggleDarkMode,
      onKeyDown,
      onExit
    }
  }
})
</script>
