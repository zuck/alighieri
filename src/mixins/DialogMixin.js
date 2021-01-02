export default {
  name: 'DialogMixin',

  methods: {
    getOkResponse () {
      return null
    },

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
      const res = this.getOkResponse()
      this.$emit('ok', res)
      this.hide()
    },

    onCancelClick () {
      this.hide()
    }
  }
}
