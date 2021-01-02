<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ $t('Settings') }}</div>
      </q-card-section>
      <q-card-section>
        <form @submit.prevent.stop>
          <fieldset>
            <legend class="text-caption">{{ $t('General') }}</legend>
            <q-checkbox v-model="darkMode" :label="$t('Dark mode')"/>
          </fieldset>
          <fieldset>
            <legend class="text-caption">{{ $t('Paragraphs') }}</legend>
            <q-checkbox v-model="parSpaceBetween" :label="$t('Space between')"/>
            <br>
            <q-checkbox v-model="parIndentFirstLine" :label="$t('Indent first line')"/>
          </fieldset>
        </form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat color="primary" :label="$t('Cancel')" @click="onCancelClick" />
        <q-btn flat color="primary" :label="$t('Ok')" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import DialogMixin from '../mixins/DialogMixin'

export default {
  name: 'SettingsDialog',

  mixins: [DialogMixin],

  data () {
    return {
      darkMode: this.$store.state.base.darkMode,
      parSpaceBetween: this.$store.state.base.parSpaceBetween,
      parIndentFirstLine: this.$store.state.base.parIndentFirstLine
    }
  },

  methods: {
    getOkResponse () {
      return {
        darkMode: this.darkMode,
        parSpaceBetween: this.parSpaceBetween,
        parIndentFirstLine: this.parIndentFirstLine
      }
    }
  }
}
</script>
