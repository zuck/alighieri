<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ title || $t('Save as') }}</div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col-xs-9">
            <q-input
              v-model="fn"
              :label="$t('Filename')"
            />
          </div>
          <div class="col-xs-3">
            <q-select
              v-model="ext"
              prefix='.'
              :options="extOpts"
              :label="$t('Format')"
              :disable="extOpts.length === 1"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat color="primary" :label="$t('Cancel')" @click="onCancelClick" />
        <q-btn flat color="primary" :label="okLabel || $t('Save')" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'SaveDialog',

  props: {
    title: String,
    okLabel: String,
    filename: String,
    extensions: Array
  },

  data () {
    const extOpts = this.extensions || ['html']
    const [fn, origExt] = this.filename.split('.')
    const ext = (extOpts.indexOf(origExt) !== -1)
      ? origExt
      : extOpts[0]
    return {
      fn,
      ext,
      extOpts
    }
  },

  methods: {
    show () {
      this.$refs.dialog.show()
    },

    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      this.$emit('hide')
    },

    onOKClick () {
      this.$emit('ok', {
        filename: this.fn,
        ext: this.ext
      })
      this.hide()
    },

    onCancelClick () {
      this.hide()
    }
  }
}
</script>
