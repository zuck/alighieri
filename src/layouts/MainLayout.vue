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
      :mini="menuMini"
      @mouseover="menuMini = false"
      @mouseout="menuMini = true"
    >
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
import Navbar from 'components/Navbar'

export default defineComponent({
  name: 'MainLayout',

  components: {
    Navbar
  },

  setup () {
    const store = useStore()
    const q = useQuasar()
    const menuOpen = computed(() => store.state.base.menuOpen)
    const menuMini = computed(() => store.state.base.menuMini)

    onMounted(() => q.dark.set(store.state.base.darkMode))

    return {
      menuOpen,
      menuMini,
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
