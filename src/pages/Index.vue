<template>
  <q-page padding class="column full-height">
    <editor class="col editor"/>
  </q-page>
</template>

<script>
import Editor from 'components/Editor'

export default {
  name: 'PageIndex',

  components: {
    Editor
  }
}
</script>

<style scoped lang="stylus">
.editor
  cursor text
</style>
