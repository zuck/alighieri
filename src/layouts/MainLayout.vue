<template>
  <q-layout view="hHh lpr lFf">
    <q-header class="bg-transparent text-dark">
      <navbar
        @toggleDarkMode="onToggleDarkMode"
        @toggleMenu="onToggleMenu"
      />
    </q-header>

    <q-drawer
      mini
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

    onMounted(() => q.dark.set(store.state.base.darkMode))

    return {
      menuOpen,
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
