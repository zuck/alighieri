<template>
  <q-toolbar color="white">
    <q-btn
      flat round
      color="grey-13"
      @click="$emit('menuToggle')"
    >
      <q-icon name="menu" />
    </q-btn>
    <q-toolbar-title>{{ wordCount }} <abbr title="Words">ws</abbr> | {{ sentenceCount }} <abbr title="Sentences">ss</abbr></q-toolbar-title>
    <q-btn
      flat round
      color="grey-13"
    >
      <q-icon name="help_outline" />
      <q-tooltip anchor="bottom right" self="top right" :offset="[0, 16]">
        <dl>
          <dt><kbd>Enter</kbd></dt><dd>New paragraph</dd>
          <dt><kbd>Shift + Enter</kbd></dt><dd>New line</dd>
          <dt><kbd>1. + Space</kbd></dt><dd>New numbered list</dd>
          <dt><kbd>* + Space</kbd></dt><dd>New bullet list</dd>
          <dt><kbd>F11</kbd></dt><dd>Toggle "Zen Mode"</dd>
        </dl>
      </q-tooltip>
    </q-btn>
  </q-toolbar>
</template>

<script>
import {
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QTooltip
} from 'quasar'

export default {
  name: 'toolbar',
  components: {
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QTooltip
  },
  props: ['wordCount', 'sentenceCount'],
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped lang="stylus">
@require '../themes/app.variables'

.q-btn
  .q-icon
    opacity .3
    transition opacity .2s, color .2s

  &:hover .q-icon
    opacity 1
    color $primary

.q-toolbar-title
  color #333
  opacity .3
  text-align center

  abbr
    cursor help

.q-tooltip
  width 100%
  max-width 320px

  dt, dd
    float left

  dt
    clear both
    width 9em
</style>
