<template>
  <q-toolbar>
    <q-btn
      flat
      dense
      round
      icon="menu"
      aria-label="Menu"
      :title="$t('Toggle menu')"
      @click="$emit('toggleMenu')"
    />

    <q-toolbar-title class="items-center">
      <change-indicator @click="$emit('save')"/>
      <text-counter/>
    </q-toolbar-title>

    <dark-toggle :title="$t('Toggle dark mode')" @click="$emit('toggleDarkMode')"/>
    <help-tooltip/>
  </q-toolbar>
</template>

<script>
import { defineComponent } from 'vue'
import TextCounter from 'components/TextCounter'
import ChangeIndicator from 'components/ChangeIndicator'
import DarkToggle from 'components/DarkToggle'
import HelpTooltip from 'components/HelpTooltip'

export default defineComponent({
  name: 'navbar',

  components: {
    TextCounter,
    ChangeIndicator,
    DarkToggle,
    HelpTooltip
  }
})
</script>
