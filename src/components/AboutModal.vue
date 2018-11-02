<template>
  <q-dialog v-model="isOpen" prevent-close @ok="close()" @escape-key="close()">
    <div slot="title" class="text-center">
      <img id="logo" src="~assets/logo.svg">
      <h5 class="product-name">{{ $options.name }}</h5>
      <h6 class="product-description">{{ $options.description }}</h6>
    </div>
    <div slot="body" class="text-center">
      <p class="row items-center justify-center">
        <span>
          {{ $t('Built by') }}
          <strong>{{ $options.authorName }}</strong>
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
    </div>
    <div slot="buttons" slot-scope="props" class="row full-width items-center justify-between">
      <span class="text-faded">
        v{{ $options.version }} -
        <a href="#" @click="openLicense()">{{ $options.license }}</a>
      </span>
      <q-btn flat :label="$t('Ok')" @click="close()"/>
    </div>
  </q-dialog>
</template>

<script>
import { QDialog, openURL } from 'quasar'

import * as INFO from '../../package.json'

export default {
  name: 'about-modal',

  components: {
    QDialog
  },

  data () {
    return {
      isOpen: false,
      resolve: null,
      reject: null
    }
  },

  mounted () {
    this.$options.name = INFO.name
    this.$options.description = INFO.description
    this.$options.version = INFO.version
    this.$options.license = INFO.license
    this.$options.authorName = INFO.author.split('<')[0].trim()
    this.$options.githubURL = INFO.repository.url
      .replace(':', '/')
      .replace('.git', '')
      .replace('git@', 'https://')
  },

  methods: {
    open () {
      return new Promise((resolve, reject) => {
        this.isOpen = true
        this.resolve = val => resolve(val)
        this.reject = err => reject(err)
      })
    },

    close () {
      this.resolve()
      this.isOpen = false
    },

    openLicense () {
      openURL(
        'https://en.wikipedia.org/wiki/' + this.$options.license + '_License'
      )
    },

    openQuasar () {
      openURL('http://quasar-framework.org')
    },

    goToGitHub () {
      openURL(this.$options.githubURL)
    }
  }
}
</script>

<style scoped lang="stylus">
@require '~variables';

.product-name {
  margin-top: 0;
  margin-bottom: 0;
  color: $tertiary;

  &:first-letter {
    text-transform: capitalize;
  }
}

.product-description {
  color: $faded;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 1rem;
}
</style>
