<template>
  <q-list no-border link="">
    <q-list-header class="q-pa-md text-center">
      <img src="~assets/logo.svg" width="90px">
    </q-list-header>
    <q-item @click.native="$emit('new')">
      <q-item-side icon="add"/>
      <q-item-main :label="$t('New...')" :sublabel="$t('Create a new file')"/>
    </q-item>
    <q-item-separator/>
    <q-item @click.native="$emit('open')">
      <q-item-side icon="folder open"/>
      <q-item-main :label="$t('Open')" :sublabel="$t('Open an existing file')"/>
    </q-item>
    <q-item @click.native="$emit('import')">
      <q-item-side icon="file upload"/>
      <q-item-main :label="$t('Import')" :sublabel="$t('Import from other formats')"/>
    </q-item>
    <q-item-separator/>
    <q-item @click.native="$emit('save')">
      <q-item-side icon="save"/>
      <q-item-main :label="$t('Save')" :sublabel="$t('Save your work')"/>
    </q-item>
    <q-item @click.native="$emit('saveAs')">
      <q-item-side icon="save"/>
      <q-item-main :label="$t('Save as')" :sublabel="$t('Save to destination')"/>
    </q-item>
    <q-item @click.native="$emit('exportAs')">
      <q-item-side icon="file download"/>
      <q-item-main :label="$t('Export')" :sublabel="$t('Export to another format')"/>
    </q-item>
    <q-item-separator/>
    <q-item @click.native="$emit('print')">
      <q-item-side icon="print"/>
      <q-item-main :label="$t('Print')" :sublabel="$t('Print your work')"/>
    </q-item>
    <q-item-separator/>
    <q-item @click.native="$emit('settings')">
      <q-item-side icon="settings"/>
      <q-item-main :label="$t('Settings')" :sublabel="$t('Adjust to your taste')"/>
    </q-item>
    <q-item @click.native="$emit('about')">
      <q-item-side icon="school"/>
      <q-item-main :label="$t('About')" :sublabel="$t('What\'s this?')"/>
    </q-item>
    <q-item-separator v-if="$q.platform.is.electron"/>
    <q-item @click.native="$emit('exit')" v-if="$q.platform.is.electron">
      <q-item-side icon="exit to app"/>
      <q-item-main :label="$t('Exit')" :sublabel="$t('Close the application')"/>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'sidebar'
}
</script>

<style scoped lang="stylus">
</style>
