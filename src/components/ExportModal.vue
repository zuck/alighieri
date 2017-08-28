<template>
  <q-modal
    ref="modal"
    @escape-key="close()"
  >
    <div class="layout-padding">
      <h4>Export to...</h4>
      <input ref="filenameInput" :value="filename" type="text"/>
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
    confirmExt (ext) {
      this.$emit('export', this.$refs.filenameInput.value, ext)
      this.close()
    }
  }
}
</script>

<style lang="stylus">
input
  display block
  width 100%
  padding 8px
  margin-bottom 16px
  border 1px solid #777
  outline none
</style>
