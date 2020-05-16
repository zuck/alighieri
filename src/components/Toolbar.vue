<template>
  <q-toolbar :class="style">
    <q-btn
      flat
      dense
      round
      aria-label="Menu"
      icon="menu"
      @click="$emit('toggleMenu')"
    />
    <q-toolbar-title class="items-center">
      <q-btn
        flat
        dense
        round
        class="q-mr-sm"
        icon="lens"
        :color="isChanged ? 'negative' : 'positive'"
        @click="$emit('save')"
      />
      <small class="counters">
        <span :title="$t('Chars')">{{ charCount }}</span>
        /
        <span :title="$t('Words')">{{ wordCount }}</span>
        /
        <span :title="$t('Sentences')">{{ sentenceCount }}</span>
      </small>
    </q-toolbar-title>
    <q-btn flat dense round icon="lightbulb_outline" @click="$emit('toggleDarkMode')"/>
    <q-btn flat dense round icon="help_outline" aria-label="Help">
      <q-tooltip anchor="bottom right" self="top right" :offset="[0, 16]">
        <dl class="horizontal">
          <dt>
            <kbd>
              <q-icon name="keyboard_return" :title="$t('Enter')"/>
            </kbd>
          </dt>
          <dd>{{ $t('New paragraph') }}</dd>
          <dt>
            <kbd>
              <q-icon name="keyboard_capslock" :title="$t('Shift')"/>+
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
            <kbd>&lt;&lt;</kbd>
          </dt>
          <dd>&laquo;</dd>
          <dt>
            <kbd>&gt;&gt;</kbd>
          </dt>
          <dd>&raquo;</dd>
          <dt>
            <kbd>--- +
              <q-icon name="keyboard_return" :title="$t('Enter')"/>
            </kbd>
          </dt>
          <dd>{{ $t('New page break') }}</dd>
          <template v-if="!$q.platform.is.mobile">
            <dt>
              <kbd>Ctrl + O</kbd>
            </dt>
            <dd>{{ $t('Open') }}</dd>
            <dt>
              <kbd>Ctrl + S</kbd>
            </dt>
            <dd>{{ $t('Save') }}</dd>
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
  </q-toolbar>
</template>

<script>
import { QTooltip } from 'quasar'

export default {
  name: 'toolbar',

  components: {
    QTooltip
  },

  computed: {
    isChanged () {
      return this.$store.getters.isChanged
    },

    charCount () {
      return this.$store.state.words.reduce((total, word) => {
        return total + (word || '').length
      }, 0)
    },

    wordCount () {
      return this.$store.state.words.length
    },

    sentenceCount () {
      return this.$store.state.sentences.length
    },

    style () {
      const colors = (this.$store.state.settings.darkMode)
        ? 'bg-primary text-white'
        : 'bg-white text-primary'
      return `${colors} item-center`
    }
  }
}
</script>

<style scoped lang="stylus">
abbr,
.counters {
  cursor: help;
}

.q-tooltip {
  width: 320px;

  dt {
    text-align: left;
    width: 45%;
  }

  dd {
    margin-left: calc(45% + 0.5rem);
  }
}
</style>
