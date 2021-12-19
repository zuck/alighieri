<template>
  <q-layout view="lHh lpr lFf">
    <q-header class="bg-transparent text-dark">
      <navbar
        @toggleDarkMode="onToggleDarkMode"
        @toggleMenu="onToggleMenu"
      />
    </q-header>

    <q-drawer
      v-model="menuOpen"
      show-if-above
      bordered
    >
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import Navbar from 'components/Navbar'

export default defineComponent({
  name: 'MainLayout',

  components: {
    Navbar
  },

  setup () {
    const store = useStore()
    const menuOpen = computed(() => store.state.base.menuOpen)

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
