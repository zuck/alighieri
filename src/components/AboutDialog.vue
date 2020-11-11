<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ $t('Alighieri') }} v{{ appInfo.version }}</div>
      </q-card-section>
      <q-card-section class="text-center">
        <img id="logo" src="~assets/logo.svg">
        <p class="row items-center justify-center">
          <span>
            {{ $t('Built by') }}
            <strong>{{ appInfo.authorName }}</strong>
            {{ $t('with') }}
          </span>
          <a href="#" @click="openQuasar()">
            <img
              id="quasar-logo"
              width="32px"
              src="https://cdn.rawgit.com/quasarframework/quasar-art/cbbbb4b0/dist/svg/quasar-logo.svg"
            >
          </a>
        </p>
        <q-btn outline :label="$t('Contribute')" @click="goToGitHub()"/>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat color="primary" :label="$t('Ok')" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { openURL } from 'quasar'
import DialogMixin from '../mixins/DialogMixin'

export default {
  name: 'AboutDialog',

  mixins: [DialogMixin],

  computed: {
    appInfo () {
      const info = this.$store.getters['base/appInfo']
      const authorName = (info.author || '').split('<')[0].trim()
      const gitURL = ((info.repository && info.repository.url) || '')
        .replace(':', '/')
        .replace('.git', '')
        .replace('git@', 'https://')
      return {
        name: info.name,
        description: info.description,
        version: info.version,
        license: info.license,
        authorName,
        gitURL
      }
    }
  },

  methods: {
    openLicense () {
      openURL(
        'https://en.wikipedia.org/wiki/' + this.appInfo.license + '_License'
      )
    },

    openQuasar () {
      openURL('https://quasar.dev')
    },

    goToGitHub () {
      openURL(this.appInfo.gitURL)
    }
  }
}
</script>

<style scoped lang="stylus">
#logo
  width 180px
</style>
