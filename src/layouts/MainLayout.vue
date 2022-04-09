<template>
  <q-layout
    view="hHh Lpr lFf"
    :class="baseClass"
  >
    <q-header :class="baseClass">
      <navbar
        @toggleDarkMode="onToggleDarkMode"
        @toggleMenu="onToggleMenu"
      />
    </q-header>

    <q-drawer
      mini
      :class="baseClass"
      v-model="menuOpen"
    >
      <sidebar
        @newFile="onNewFile"
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
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import Navbar from 'src/components/Navbar'
import Sidebar from 'src/components/Sidebar'

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

    onMounted(() => $q.dark.set(store.state.base.darkMode))

    return {
      menuOpen,
      isDark,
      baseClass,
      onNewFile () {
        const hasUnsavedChanges = store.getters['editor/hasUnsavedChanges']
        const resetFile = () => store.dispatch('editor/resetFile')
        askConfirmOrExecute(hasUnsavedChanges, resetFile)
      },
      onToggleMenu () {
        store.commit('base/toggleMenu')
      },
      onToggleDarkMode () {
        store.dispatch('base/toggleDarkMode')
      }
    }
  }
})
</script>
