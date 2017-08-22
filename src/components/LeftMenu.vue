<template>
  <q-list no-border link inset-delimiter>
    <q-list-header></q-list-header>
    <q-item @click="launch('http://quasar-framework.org')">
      <q-item-side icon="insert drive file" />
      <q-item-main label="New..." sublabel="Create a new file" />
    </q-item>
    <q-item-separator />
    <q-item @click="launch('http://forum.quasar-framework.org')">
      <q-item-side icon="folder open" />
      <q-item-main label="Open" sublabel="Open an existing file" />
    </q-item>
    <q-item @click="launch('http://forum.quasar-framework.org')">
      <q-item-side icon="save" />
      <q-item-main label="Save" sublabel="Save your work" />
    </q-item>
    <q-item @click="launch('http://forum.quasar-framework.org')">
      <q-item-side icon="import export" />
      <q-item-main label="Export" sublabel="Export to another format" />
    </q-item>
    <q-item-separator />
    <q-item @click="launch('http://forum.quasar-framework.org')">
      <q-item-side icon="print" />
      <q-item-main label="Print" sublabel="Print your work" />
    </q-item>
    <q-item-separator />
    <q-item @click="launch('https://gitter.im/quasarframework/Lobby')">
      <q-item-side icon="settings" />
      <q-item-main label="Settings" sublabel="Adjust to your taste" />
    </q-item>
    <q-item @click="launch('https://twitter.com/quasarframework')">
      <q-item-side icon="school" />
      <q-item-main label="About" sublabel="What's this?" />
    </q-item>
    <q-item-separator />
    <q-item @click="launch('https://twitter.com/quasarframework')">
      <q-item-side icon="exit to app" />
      <q-item-main label="Exit" sublabel="Close the application" />
    </q-item>
  </q-list>
</template>

<script>
import {
  QList,
  QListHeader,
  QItem,
  QItemSeparator,
  QItemSide,
  QItemMain
} from 'quasar'

export default {
  name: 'left-menu',
  components: {
    QList,
    QListHeader,
    QItem,
    QItemSeparator,
    QItemSide,
    QItemMain
  },
  methods: {
    launch (url) {
    }
  }
}
</script>

<style lang="stylus">
</style>
