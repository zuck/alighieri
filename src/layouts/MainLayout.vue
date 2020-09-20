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
    toggleMenu () {
      this.$store.commit('base/toggleMenu')
    },

    toggleDarkMode () {
      this.$store.commit('base/toggleDarkMode')
    }
  }
}
</script>
