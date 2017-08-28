<template>
  <q-modal
    ref="modal"
    @escape-key="close()"
  >
    <div class="layout-padding">
      <h4>Settings</h4>
      <p>Not implemented yet...</p>
    </div>
    <div class="modal-buttons row">
      <q-btn
        flat
        @click="close()"
      >Cancel</q-btn>
    </div>
  </q-modal>
</template>

<script>
import {
  QModal,
  QBtn
} from 'quasar'

export default {
  name: 'settings-modal',
  components: {
    QModal,
    QBtn
  },
  data () {
    return {
    }
  },
  methods: {
    open () {
      this.$refs.modal.open()
    },
    close () {
      this.$refs.modal.close()
    },
    toggle () {
      this.$refs.modal.toggle()
    }
  }
}
</script>

<style scoped lang="stylus">
@require '../themes/app.variables'
</style>
