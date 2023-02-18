<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-toolbar>
        <q-toolbar-title>
          {{ appInfo.name }}
          <span class="text-subtitle2">v{{ appInfo.version }}</span>
        </q-toolbar-title>
        <q-btn flat dense icon="close" @click="onOKClick" />
      </q-toolbar>
      <q-separator/>
      <q-card-section class="text-center q-gutter-md">
        <q-img width="180px" src="~assets/logo.svg"/>
        <p class="text-body1">{{ appInfo.description }}</p>
        <p class="text-body2 row items-center justify-center">
          <span>
            {{ $t('Built by') }}
            <strong>{{ appInfo.authorName }}</strong>
            {{ $t('with') }}
          </span>
          <q-img
            class="q-mx-xs"
            width="24px"
            style="cursor:pointer"
            src="~assets/quasar-logo.svg"
            alt="Quasar Framework"
            @click="openQuasar()"
          />
        </p>
        <p><q-btn flat no-caps icon="balance" :label="$t(`${appInfo.license} License`)" @click="openLicense()"/></p>
      </q-card-section>
      <q-separator/>
      <q-card-actions class="row q-pa-sm q-gutter-sm justify-between">
        <q-btn outline icon="code" :label="$t('Contribute')" @click="goToGitHub()"/>
        <q-btn outline color="primary" icon="support" :label="$t('Donate')" @click="goToDonation()"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { openURL, useDialogPluginComponent } from 'quasar'
import { useStore } from 'vuex'

export default {
  name: 'AboutDialog',

  emits: [
    ...useDialogPluginComponent.emits
  ],

  setup () {
    const store = useStore()
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    const info = store.getters['base/appInfo']
    const authorName = (info.author || '').split('<')[0].trim()
    const gitURL = ((info.repository && info.repository.url) || '')
      .replace(':', '/')
      .replace('.git', '')
      .replace('git@', 'https://')
    const appInfo = {
      name: info.productName,
      description: info.description,
      version: info.version,
      license: info.license,
      authorName
    }
    return {
      appInfo,
      dialogRef,
      onDialogHide,
      onOKClick () {
        onDialogOK()
      },
      onCancelClick: onDialogCancel,
      openLicense () {
        openURL(
          `https://en.wikipedia.org/wiki/${appInfo.license}_License`
        )
      },
      openQuasar () {
        openURL('https://quasar.dev')
      },
      goToGitHub () {
        openURL(gitURL)
      },
      goToDonation () {
        openURL('https://paypal.me/EBertoldi')
      }
    }
  }
}
</script>
