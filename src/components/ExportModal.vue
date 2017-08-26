<template>
  <q-modal
    ref="modal"
    :content-css="{padding: '32px', minWidth: '256px'}"
    @escape-key="close()"
  >
    <h4>Export to...</h4>
    <q-list no-border>
      <q-item
        link
        @click="$emit('export', 'md')"
      >
        <q-item-side icon="open_in_new" />
        <q-item-main label="Markdown (.md)" />
        <q-item-side right icon="keyboard_arrow_right" />
      </q-item>
      <q-item
        link
        @click="$emit('export', 'txt')"
      >
        <q-item-side icon="open_in_new" />
        <q-item-main label="Plain text (.txt)" />
        <q-item-side right icon="keyboard_arrow_right" />
      </q-item>
    </q-list>
    <q-btn
      flat
      @click="close()"
    >Cancel</q-btn>
  </q-modal>
</template>

<script>
import {
  QModal,
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
    QList,
    QItem,
    QItemSide,
    QItemMain,
    QBtn
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

<style lang="stylus">
</style>
