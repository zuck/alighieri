<template>
  <q-list class="text-uppercase">
    <q-item header>
      <q-item-section avatar>
        <q-avatar class="full-width text-center">
          <img
            src="~assets/logo.svg"
            class="cursor-pointer"
            :title="$t('What\'s this?')"
            @click="$emit('about')"
          >
        </q-avatar>
      </q-item-section>
    </q-item>
    <q-separator/>
    <q-item
      clickable
      v-ripple
      :title="$t('Create a new file')"
      @click.native="$emit('newFile')"
    >
      <q-item-section avatar>
        <q-icon name="add_circle" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t('New...') }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      clickable
      v-ripple
      :title="$t('Open an existing file')"
      @click.native="$emit('openFile')"
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
      @click.native="$emit('saveFile')"
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
      @click.native="$emit('saveFileAs')"
    >
      <q-item-section avatar>
        <q-icon name="move_to_inbox" />
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
      @click.native="$emit('importFile')"
    >
      <q-item-section avatar>
        <q-icon name="cloud_upload" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t('Import') }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      clickable
      v-ripple
      :title="$t('Export to another format')"
      @click.native="$emit('exportFileAs')"
    >
      <q-item-section avatar>
        <q-icon name="cloud_download" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t('Export') }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      clickable
      v-ripple
      :title="$t('Print your work')"
      @click.native="$emit('printFile')"
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
  name: 'siebar',

  computed: {
    appInfo () {
      return this.$store.getters['base/appInfo']
    }
  }
}
</script>
