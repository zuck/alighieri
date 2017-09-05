<template>
  <q-modal
    ref="modal"
    @escape-key="close()"
  >
    <div class="modal-header">Settings</div>
    <div class="modal-body">
      <p class="caption">Paragraphs</p>
      <q-checkbox v-model="opts.parSpaceBetween" label="Space between" />
      <br>
      <q-checkbox v-model="opts.parIdentFirstLine" label="Ident first line" />
    </div>
    <div class="modal-buttons row">
      <q-btn
        flat
        @click="close()"
      >Cancel</q-btn>
      <q-btn
        flat
        @click="confirm()"
      >Confirm</q-btn>
    </div>
  </q-modal>
</template>

<script>
import {
  QModal,
  QCheckbox,
  QBtn,
  LocalStorage
} from 'quasar'
import * as INFO from '../../package.json'

const SETTINGS_KEY = INFO.name + '-settings'

export default {
  name: 'settings-modal',
  components: {
    QModal,
    QCheckbox,
    QBtn
  },
  data () {
    return {
      opts: {}
    }
  },
  mounted () {
    this.opts = Object.assign({
      parSpaceBetween: true,
      parIdentFirstLine: true
    }, LocalStorage.get.item(SETTINGS_KEY))
    this.emitChanges()
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
    emitChanges () {
      this.$emit('confirm', Object.assign({}, this.opts))
    },
    confirm () {
      LocalStorage.set(SETTINGS_KEY, this.opts)
      this.emitChanges()
      this.close()
    }
  }
}
</script>

<style scoped lang="stylus">
@require '../themes/app.variables'
</style>
