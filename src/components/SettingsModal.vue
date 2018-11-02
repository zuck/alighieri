<template>
  <q-dialog
    v-model="isOpen"
    prevent-close
    :cancel="true"
    :ok="$t('Save')"
    @ok="confirm()"
    @cancel="close()"
    @escape-key="close()"
  >
    <span slot="title">{{ $t('Settings') }}</span>
    <form slot="body" @submit.prevent.stop>
      <legend class="caption">{{ $t('General') }}</legend>
      <q-checkbox v-model="darkMode" :label="$t('Dark mode')"/>
      <legend class="caption">{{ $t('Paragraphs') }}</legend>
      <q-checkbox v-model="parSpaceBetween" :label="$t('Space between')"/>
      <br>
      <q-checkbox v-model="parIdentFirstLine" :label="$t('Ident first line')"/>
    </form>
  </q-dialog>
</template>

<script>
import { QDialog, QCheckbox } from 'quasar'

export default {
  name: 'settings-modal',

  components: {
    QDialog,
    QCheckbox
  },

  data () {
    return {
      isOpen: false,
      resolve: null,
      reject: null,
      darkMode: null,
      parSpaceBetween: null,
      parIdentFirstLine: null
    }
  },

  methods: {
    open (settings) {
      return new Promise((resolve, reject) => {
        this.isOpen = true
        this.resolve = val => resolve(val)
        this.reject = err => reject(err)
        this.darkMode = settings.darkMode
        this.parSpaceBetween = settings.parSpaceBetween
        this.parIdentFirstLine = settings.parIdentFirstLine
      })
    },

    close () {
      this.reject()
      this.isOpen = false
    },

    confirm () {
      this.resolve({
        darkMode: this.darkMode,
        parSpaceBetween: this.parSpaceBetween,
        parIdentFirstLine: this.parIdentFirstLine
      })
      this.isOpen = false
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
