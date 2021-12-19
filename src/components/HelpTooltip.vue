<template>
  <q-btn
    flat
    dense
    round
    icon="help_outline"
    aria-label="Help"
  >
    <q-tooltip
      anchor="bottom right"
      self="top right"
      :offset="[0, 16]"
    >
      <dl class="horizontal">
        <dt>
          <kbd>
            <q-icon name="keyboard_return" :title="$t('Enter')"/>
          </kbd>
        </dt>
        <dd>{{ $t('New paragraph') }}</dd>
        <dt>
          <kbd>
            Shift  +
            <q-icon name="keyboard_return" :title="$t('Enter')"/>
          </kbd>
        </dt>
        <dd>{{ $t('New line') }}</dd>
        <dt>
          <kbd>1. +
            <q-icon name="space_bar" :title="$t('Space')"/>
          </kbd>
        </dt>
        <dd>{{ $t('New numbered list') }}</dd>
        <dt>
          <kbd>* +
            <q-icon name="space_bar" :title="$t('Space')"/>
          </kbd>
        </dt>
        <dd>{{ $t('New bullet list') }}</dd>
        <dt>
          <kbd>--- +
            <q-icon name="keyboard_return" :title="$t('Enter')"/>
          </kbd>
        </dt>
        <dd>{{ $t('New page break') }}</dd>
        <dt>
          <kbd>&lt;&lt;</kbd>
        </dt>
        <dd>&laquo;</dd>
        <dt>
          <kbd>&gt;&gt;</kbd>
        </dt>
        <dd>&raquo;</dd>
        <template v-if="!$q.platform.is.mobile">
          <dt>
            <kbd>Ctrl + S</kbd>
          </dt>
          <dd>{{ $t('Save changes') }}</dd>
          <dt>
            <kbd>Ctrl + O</kbd>
          </dt>
          <dd>{{ $t('Open document') }}</dd>
          <dt>
            <kbd>Ctrl + P</kbd>
          </dt>
          <dd>{{ $t('Print document') }}</dd>
          <dt>
            <kbd>Ctrl + M</kbd>
          </dt>
          <dd>{{ $t('Toggle menu') }}</dd>
          <dt>
            <kbd>Ctrl + D</kbd>
          </dt>
          <dd>{{ $t('Toggle "Dark Mode"') }}</dd>
          <dt>
            <kbd>F11</kbd>
          </dt>
          <dd>{{ $t('Toggle "Zen Mode"') }}</dd>
        </template>
      </dl>
    </q-tooltip>
  </q-btn>
</template>

<script>
import { defineComponent } from 'vue'
import { QTooltip } from 'quasar'

export default defineComponent({
  name: 'help-tooltip',

  components: {
    QTooltip
  }
})
</script>

<style scoped lang="sass">
dl
  width: 100%
  max-width: 320px

dt, dd
  display: inline-block
  font-size: 1rem
  line-height: 2rem
  margin: 0
  padding: 0
  width: 50%

kbd
  background-color: $dark
  padding: .25rem .5rem
</style>
