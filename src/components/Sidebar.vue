<template>
  <q-list>
    <q-item-label header class="text-center">
      <img
        src="~assets/logo.svg"
        width="80px"
        class="cursor-pointer"
        :title="$t('What\'s this?')"
        @click="$emit('about')"
      >
    </q-item-label>
    <q-separator />
    <q-item
      clickable
      v-ripple
      :title="$t('Create a new file')"
      @click.native="$emit('new')"
    >
      <q-item-section avatar>
        <q-icon name="add" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t('New...') }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      clickable
      v-ripple
      :title="$t('Open an existing file')"
      @click.native="$emit('open')"
    >
      <q-item-section avatar>
        <q-icon name="folder_open" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t('Open') }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      clickable
      v-ripple
      :title="$t('Save your work')"
      @click.native="$emit('save')"
    >
      <q-item-section avatar>
        <q-icon name="save" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t('Save') }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      clickable
      v-ripple
      :title="$t('Save to destination')"
      @click.native="$emit('saveAs')"
    >
      <q-item-section avatar>
        <q-icon name="save" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t('Save as') }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />
    <q-item
      clickable
      v-ripple
      :title="$t('Import from other formats')"
      @click.native="$emit('import')"
    >
      <q-item-section avatar>
        <q-icon name="file_upload" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t('Import') }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      clickable
      v-ripple
      :title="$t('Export to another format')"
      @click.native="$emit('exportAs')"
    >
      <q-item-section avatar>
        <q-icon name="file_download" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t('Export') }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      clickable
      v-ripple
      :title="$t('Print your work')"
      @click.native="$emit('print')"
    >
      <q-item-section avatar>
        <q-icon name="print" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t('Print') }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />
    <q-item
      clickable
      v-ripple
      :title="$t('Adjust to your taste')"
      @click.native="$emit('settings')"
    >
      <q-item-section avatar>
        <q-icon name="settings" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t('Settings') }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator v-if="$q.platform.is.electron"/>
    <q-item
      v-if="$q.platform.is.electron"
      clickable
      v-ripple
      :title="$t('Close the application')"
      @click.native="$emit('exit')"
    >
      <q-item-section avatar>
        <q-icon name="exit_to_app"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t('Exit') }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'sidebar'
}
</script>
