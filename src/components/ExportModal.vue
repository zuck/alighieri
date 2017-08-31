<template>
  <q-modal
    ref="modal"
    @escape-key="close()"
  >
    <div class="modal-header">Export to...</div>
    <div class="modal-body">
      <q-input v-model="filenameValue" placeholder="Type a filename..."/>
      <q-list no-border>
        <q-item
          link
          @click="confirmExt('md')"
        >
          <q-item-side icon="open_in_new" />
          <q-item-main label="Markdown (.md)" />
          <q-item-side right icon="keyboard_arrow_right" />
        </q-item>
        <q-item
          link
          @click="confirmExt('txt')"
        >
          <q-item-side icon="open_in_new" />
          <q-item-main label="Plain text (.txt)" />
          <q-item-side right icon="keyboard_arrow_right" />
        </q-item>
      </q-list>
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
  QInput,
  QList,
  QItem,
  QItemSide,
  QItemMain,
  QBtn
} from 'quasar'

export default {
  name: 'export-modal',
  components: {
    QModal,
    QInput,
    QList,
    QItem,
    QItemSide,
    QItemMain,
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
    confirmExt (ext) {
      this.$emit('export', this.filenameValue || this.filename, ext)
      this.close()
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
