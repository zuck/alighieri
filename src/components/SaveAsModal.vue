<template>
  <q-modal
    ref="modal"
    @escape-key="close()"
  >
    <div class="layout-padding">
      <h4>Choose a name</h4>
      <input ref="filenameInput" :value="filename" type="text"/>
    </div>
    <div class="modal-buttons row">
      <q-btn
        flat
        @click="close()"
      >Cancel</q-btn>
      <q-btn
        flat
        @click="confirmFilename()"
      >Confirm</q-btn>
    </div>
  </q-modal>
</template>

<script>
import {
  QModal,
  QBtn
} from 'quasar'

export default {
  name: 'save-as-modal',
  components: {
    QModal,
    QBtn
  },
  props: ['filename'],
  methods: {
    open () {
      this.$refs.modal.open()
    },
    close () {
      this.$refs.modal.close()
    },
    toggle () {
      this.$refs.modal.toggle()
    },
    confirmFilename () {
      this.$emit('save', this.$refs.filenameInput.value)
      this.close()
    }
  }
}
</script>

<style lang="stylus">
</style>
