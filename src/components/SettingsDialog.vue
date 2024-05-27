<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-toolbar>
        <q-toolbar-title>
          {{ $t("Settings") }}
        </q-toolbar-title>
        <q-btn flat round dense icon="close" @click="onCancelClick()" />
      </q-toolbar>
      <q-separator />
      <q-card-section class="column q-gutter-md">
        <q-select
          filled
          :label="$t('Locale')"
          v-model="locale"
          :options="localeOptions"
        />
        <q-toggle :label="$t('Dark mode')" v-model="darkMode" />
        <q-toggle
          :label="$t('Space between paragraphs')"
          v-model="parSpaceBetween"
        />
        <q-toggle
          :label="$t('Indent first line')"
          v-model="parIndentFirstLine"
        />
      </q-card-section>
      <q-separator />
      <q-card-actions class="row q-pa-sm q-gutter-sm justify-end">
        <q-btn flat :label="$t('Cancel')" @click="onCancelClick()" />
        <q-btn
          flat
          color="primary"
          :label="$t('OK')"
          @click="onOKClick(settings)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from "quasar";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";

export default {
  name: "SettingsDialog",

  emits: [...useDialogPluginComponent.emits],

  setup() {
    const i18n = useI18n();
    const store = useStore();
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();
    const localeOptions = i18n.availableLocales;
    const locale = ref(store.state.base.locale);
    const darkMode = ref(store.state.base.darkMode);
    const parSpaceBetween = ref(store.state.base.parSpaceBetween);
    const parIndentFirstLine = ref(store.state.base.parIndentFirstLine);
    return {
      localeOptions,
      locale,
      darkMode,
      parSpaceBetween,
      parIndentFirstLine,
      dialogRef,
      onDialogHide,
      onOKClick() {
        onDialogOK({
          locale: locale.value,
          darkMode: darkMode.value,
          parSpaceBetween: parSpaceBetween.value,
          parIndentFirstLine: parIndentFirstLine.value,
        });
      },
      onCancelClick: onDialogCancel,
    };
  },
};
</script>
