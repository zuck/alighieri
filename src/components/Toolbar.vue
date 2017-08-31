<template>
  <q-toolbar color="white">
    <q-btn
      flat round
      color="grey-13"
      @click="$emit('menuToggle')"
    >
      <q-icon name="menu" />
    </q-btn>
    <q-toolbar-title>
      <save-status :status="isSaved"/> {{ wordCount }} / {{ sentenceCount }}
    </q-toolbar-title>
    <q-btn
      flat round
      color="grey-13"
    >
      <q-icon name="help_outline" />
      <q-tooltip anchor="bottom right" self="top right" :offset="[0, 16]">
        <dl>
          <dt><q-icon name="lens"/> X / Y</dt><dd><q-icon name="lens"/> Words / Sents</dd>
          <dt><kbd>Enter</kbd></dt><dd>New paragraph</dd>
          <dt><kbd>Shift + Enter</kbd></dt><dd>New line</dd>
          <dt><kbd>1. + Space</kbd></dt><dd>New numbered list</dd>
          <dt><kbd>* + Space</kbd></dt><dd>New bullet list</dd>
          <dt><kbd>--- + Enter</kbd></dt><dd>New horizontal rule</dd>
          <dt><kbd>Ctrl + O</kbd></dt><dd>Open</dd>
          <dt><kbd>Ctrl + S</kbd></dt><dd>Save</dd>
          <dt><kbd>Ctrl + F11</kbd></dt><dd>Toggle "Zen Mode"</dd>
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

import SaveStatus from 'components/SaveStatus'

export default {
  name: 'toolbar',
  components: {
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QTooltip,
    SaveStatus
  },
  props: ['isSaved', 'wordCount', 'sentenceCount']
}
</script>

<style scoped lang="stylus">
@require '../themes/app.variables'

.q-btn
  .q-icon
    color $neutral

  &:hover .q-icon
    color $primary

.q-toolbar-title
  color $neutral
  text-align left

  abbr
    cursor help

.q-tooltip
  width 100%
  max-width 320px

  dt, dd
    float left

    .q-icon
      margin-top -.25rem

  dt
    clear both
    width 9em
</style>
