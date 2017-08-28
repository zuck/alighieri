<template>
  <q-modal
    ref="modal"
    @escape-key="close()"
  >
    <div class="layout-padding">
      <img id="logo" src="statics/icon.png"/>
      <h4>{{ name }}</h4>
      <h6>{{ description }}</h6>
      <p id="version">v{{ version }}</p>
      <h5>License</h5>
      <pre id="license">{{ license }}</pre>
      <q-btn
        flat
        @click="close()"
      >Cancel</q-btn>
      <q-btn
        flat
        @click="goToGitHub()"
      >Contribute</q-btn>
    </div>
  </q-modal>
</template>

<script>
import * as INFO from '../../package.json'
import * as LICENSE from '../../LICENSE.txt'
import {
  QModal,
  QBtn
} from 'quasar'

export default {
  name: 'about-modal',
  components: {
    QModal,
    QBtn
  },
  data () {
    return {
      name: INFO.name,
      description: INFO.description,
      version: INFO.version,
      license: LICENSE,
      github: INFO.repository.url.replace(':', '/').replace('.git', '').replace('git@', 'https://')
    }
  },
  methods: {
    open () {
      this.$refs.modal.open()
    },
    close () {
      this.$refs.modal.close()
    },
    toggle () {
      this.$refs.modal.toggle()
    },
    goToGitHub () {
      window.open(this.github)
    }
  }
}
</script>

<style lang="stylus">
#logo
  display block
  margin 16px auto

  &+h4, &+h4+h6
    text-align center

  &+h4:first-letter
    text-transform capitalize

  &+h4+h6
    color #777

#version
  margin-top 16px
  text-align center

#license
  max-height 190px
  padding 16px
  overflow-y auto
  overflow-x hidden
</style>
