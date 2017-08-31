<template>
  <q-icon name="lens" :color="color">
    <q-tooltip>{{ tooltipMsg }}</q-tooltip>
  </q-icon>
</template>

<script>
import {
  QIcon,
  QTooltip
} from 'quasar'

export default {
  name: 'save-status',
  components: {
    QIcon,
    QTooltip
  },
  props: ['status'],
  computed: {
    color () {
      return this.status ? 'positive' : 'negative'
    },
    tooltipMsg () {
      return this.status ? 'Saved' : 'Not saved'
    }
  }
}
</script>

<style scoped lang="stylus">
@require '../themes/app.variables'

.q-icon
  cursor pointer
</style>
