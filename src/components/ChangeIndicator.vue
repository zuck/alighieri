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
export default {
  name: 'change-indicator',

  computed: {
    isChanged () {
      return this.$store.getters['editor/isChanged']
    }
  }
}
</script>
