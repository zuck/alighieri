<template>
  <q-dialog
    v-model="isOpen"
    prevent-close
    :cancel="true"
    :ok="okLabel"
    @ok="confirm()"
    @cancel="close()"
    @escape-key="close()"
  >
    <span slot="title">{{ title }}</span>
    <div slot="body">
      <div class="row">
        <q-input v-model="basename" :placeholder="$t('Type a filename...')"/>
        <q-select v-model="ext" :options="extOptions"/>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import { QDialog, QInput, QSelect } from 'quasar'

export default {
  name: 'save-modal',

  components: {
    QDialog,
    QInput,
    QSelect
  },

  data () {
    return {
      isOpen: false,
      resolve: null,
      reject: null,
      basename: null,
      ext: null,
      title: null,
      okLabel: null,
      extOptions: []
    }
  },

  methods: {
    open (filename, title, okLabel, extOptions) {
      const tokens = (filename || '').split('.')
      this.title = title || this.$t('Save as')
      this.okLabel = okLabel || this.$t('Save')
      this.extOptions = extOptions || [
        { value: 'html', label: this.$t('.html') }
      ]
      this.basename = tokens[0]
      this.ext = tokens[1] || this.extOptions[0].value
      return new Promise((resolve, reject) => {
        this.isOpen = true
        this.resolve = val => resolve(val)
        this.reject = err => reject(err)
      })
    },

    close () {
      this.reject()
      this.isOpen = false
    },

    confirm () {
      this.resolve(this.basename + '.' + this.ext)
      this.isOpen = false
    }
  }
}
</script>
