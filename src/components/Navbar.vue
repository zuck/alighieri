<template>
  <q-toolbar :class="className">
    <q-btn
      flat
      dense
      round
      :icon="isMenuOpen ? 'menu_open' : 'menu'"
      aria-label="Menu"
      :title="$t('Toggle menu')"
      @click="$emit('toggleMenu')"
    />

    <q-toolbar-title class="items-center">
      <q-avatar class="q-mr-md">
        <img
          src="~assets/logo.svg"
          class="cursor-pointer"
          :title="$t('What\'s this?')"
          @click="$emit('about')"
        />
      </q-avatar>
      <change-indicator @click="$emit('save')" />
      <text-counter />
    </q-toolbar-title>

    <dark-toggle
      :title="$t('Toggle dark mode')"
      @click="$emit('toggleDarkMode')"
    />
    <help-tooltip />
  </q-toolbar>
</template>

<script>
import ChangeIndicator from "components/ChangeIndicator";
import DarkToggle from "components/DarkToggle";
import HelpTooltip from "components/HelpTooltip";
import TextCounter from "components/TextCounter";
import { useQuasar } from "quasar";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "navbar",

  components: {
    TextCounter,
    ChangeIndicator,
    DarkToggle,
    HelpTooltip,
  },

  setup() {
    const $q = useQuasar();
    const store = useStore();
    const isMenuOpen = computed(() => store.state.base.menuOpen);
    const className = computed(() => {
      return $q.dark.isActive
        ? "bg-dark-page text-grey-6 shadow-dark-page"
        : "bg-white text-grey-7 shadow-white";
    });
    return {
      isMenuOpen,
      className,
    };
  },
});
</script>
