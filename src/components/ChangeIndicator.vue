<template>
  <q-btn
    flat
    dense
    round
    class="q-mr-sm"
    icon="lens"
    :color="isChanged ? 'negative' : 'positive'"
    :title="$t('Save')"
    @click="$emit('click')"
  />
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'change-indicator',

  setup () {
    const store = useStore()
    const isChanged = computed(() => store.getters['editor/isChanged'])
    return {
      isChanged
    }
  }
})
</script>
