<template>
  <q-toolbar :class="className">
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
import TextCounter from 'components/TextCounter'
import ChangeIndicator from 'components/ChangeIndicator'
import DarkToggle from 'components/DarkToggle'
import HelpTooltip from 'components/HelpTooltip'

export default {
  name: 'navbar',

  components: {
    TextCounter,
    ChangeIndicator,
    DarkToggle,
    HelpTooltip
  },

  computed: {
    className () {
      return this.$q.dark.isActive
        ? 'bg-dark-page text-grey-6 shadow-dark-page'
        : 'bg-white text-grey-7 shadow-white'
    }
  }
}
</script>

<style scoped lang="stylus">
.shadow-dark-page
  box-shadow 0px 0px 20px 15px $dark-page

.shadow-white
  box-shadow 0px 0px 20px 15px white
</style>
