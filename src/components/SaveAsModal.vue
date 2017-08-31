<template>
  <q-modal
    ref="modal"
    @escape-key="close()"
  >
    <div class="modal-header">Choose a name</div>
    <div class="modal-body">
      <q-input v-model="filename" placeholder="Type a filename..."/>
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
  QInput,
  QBtn
} from 'quasar'

export default {
  name: 'save-as-modal',
  components: {
    QModal,
    QInput,
    QBtn
  },
  props: ['filename'],
  data () {
    return {
      filenameValue: null
    }
  },
  mounted () {
    this.filenameValue = this.filename
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
    },
    confirmFilename () {
      this.$emit('save', this.filenameValue || this.filename)
      this.close()
    }
  }
}
</script>

<style lang="stylus">
</style>
