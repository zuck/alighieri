<template>
  <q-layout view="lHh lpr lFf">
    <q-header class="bg-transparent">
      <navbar
        @toggleDarkMode="toggleDarkMode"
        @toggleMenu="toggleMenu"
      />
    </q-header>

    <q-drawer
      mini-to-overlay
      bordered
      v-model="menuOpen"
      :mini="menuMini"
      @mouseover="menuMini = false"
      @mouseout="menuMini = true"
    >
      <sidebar/>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'
import { LocalStorage } from 'quasar'
import { MENU_OPEN_CACHE_KEY, DARK_MODE_CACHE_KEY } from '../config'

export default {
  name: 'MainLayout',

  components: {
    Navbar,
    Sidebar
  },

  data () {
    return {
      menuOpen: false,
      menuMini: true
    }
  },

  mounted () {
    this.menuOpen = LocalStorage.getItem(MENU_OPEN_CACHE_KEY)
    this.$q.dark.set(LocalStorage.getItem(DARK_MODE_CACHE_KEY))
  },

  methods: {
    toggleMenu () {
      this.menuOpen = !this.menuOpen
      this.$nextTick().then(() => {
        LocalStorage.set(MENU_OPEN_CACHE_KEY, this.menuOpen)
      })
    },

    toggleDarkMode () {
      this.$q.dark.toggle()
      this.$nextTick().then(() => {
        LocalStorage.set(DARK_MODE_CACHE_KEY, this.$q.dark.isActive)
      })
    }
  }
}
</script>
