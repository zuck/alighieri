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
      <sidebar />
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
    const q = useQuasar()
    const menuOpen = computed(() => store.state.base.menuOpen)
    const isDark = computed(() => store.state.base.darkMode)
    const baseClass = computed(() => isDark.value ? 'q-dark' : 'bg-white text-dark')

    onMounted(() => q.dark.set(store.state.base.darkMode))

    return {
      menuOpen,
      isDark,
      baseClass,
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
