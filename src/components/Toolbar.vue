<template>
  <q-toolbar color="grey-1">
    <q-btn
      id="d-logo"
      flat round
      color="grey-13"
      @click="$refs.layout.toggleLeft()"
    >
      <img src="statics/icon.png" />
    </q-btn>
    <q-toolbar-title>{{ wordCount }} <abbr title="Words">ws</abbr> | {{ sentenceCount }} <abbr title="Sentences">ss</abbr></q-toolbar-title>
    <q-btn
      id="d-help"
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
#d-logo, #d-help
  img, .q-icon
    height 2em
    opacity .3
    transition opacity .2s

  &:hover
    img, .q-icon
      opacity 1

.q-toolbar-title
  color #e0e0e0
  text-align center

.q-tooltip
  width 100%
  max-width 320px

  dt, dd
    float left

  dt
    clear both
    width 9em
</style>
