<template>
  <q-list no-border link>
    <q-item @click="$emit('new')">
      <q-item-side icon="add" />
      <q-item-main label="New..." sublabel="Create a new file" />
    </q-item>
    <q-item-separator />
    <q-item @click="$emit('open')">
      <q-item-side icon="folder open" />
      <q-item-main label="Open" sublabel="Open an existing file" />
    </q-item>
    <q-item @click="$emit('import')">
      <q-item-side icon="file upload" />
      <q-item-main label="Import" sublabel="Import from other formats" />
    </q-item>
    <q-item-separator />
    <q-item @click="$emit('save')">
      <q-item-side icon="save" />
      <q-item-main label="Save" sublabel="Save your work" />
    </q-item>
    <q-item @click="$emit('saveAs')">
      <q-item-side icon="save" />
      <q-item-main label="Save as" sublabel="Save to destination" />
    </q-item>
    <q-item @click="$emit('export')">
      <q-item-side icon="file download" />
      <q-item-main label="Export" sublabel="Export to another format" />
    </q-item>
    <q-item-separator />
    <q-item @click="$emit('print')">
      <q-item-side icon="print" />
      <q-item-main label="Print" sublabel="Print your work" />
    </q-item>
    <q-item-separator />
    <q-item @click="$emit('settings')">
      <q-item-side icon="settings" />
      <q-item-main label="Settings" sublabel="Adjust to your taste" />
    </q-item>
    <q-item @click="$emit('about')">
      <q-item-side icon="school" />
      <q-item-main label="About" sublabel="What's this?" />
    </q-item>
    <q-item-separator />
    <q-item @click="$emit('exit')">
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
  }
}
</script>

<style lang="stylus">
.q-item:hover .q-icon
  color #c83737
</style>
