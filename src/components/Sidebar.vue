<template>
  <q-list class="text-uppercase">
  </q-list>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Sidebar',

  setup () {
    const store = useStore()
    const appInfo = computed(() => store.getters['base/appInfo'])

    return {
      appInfo
    }
  }
})
</script>
