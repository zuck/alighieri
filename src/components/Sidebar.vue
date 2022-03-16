<template>
  <q-list class="text-uppercase" style="opacity:.6">
    <q-item
      clickable
      v-ripple
      :title="$t('Create a new file')"
      @click="$emit('newFile')"
    >
      <q-item-section avatar>
        <q-icon name="add_circle_outline" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t('New...') }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      clickable
      v-ripple
      :title="$t('Open an existing file')"
      @click="$emit('openFile')"
    >
      <q-item-section avatar>
        <q-icon name="o_folder_open" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t('Open') }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      clickable
      v-ripple
      :title="$t('Save your work')"
      @click="$emit('saveFile')"
    >
      <q-item-section avatar>
        <q-icon name="o_save" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t('Save') }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      clickable
      v-ripple
      :title="$t('Save to destination')"
      @click="$emit('saveFileAs')"
    >
      <q-item-section avatar>
        <q-icon name="o_move_to_inbox" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t('Save as') }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      clickable
      v-ripple
      :title="$t('Import from other formats')"
      @click="$emit('importFile')"
    >
      <q-item-section avatar>
        <q-icon name="o_cloud_upload" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t('Import') }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      clickable
      v-ripple
      :title="$t('Export to another format')"
      @click="$emit('exportFileAs')"
    >
      <q-item-section avatar>
        <q-icon name="o_cloud_download" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t('Export') }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      clickable
      v-ripple
      :title="$t('Print your work')"
      @click="$emit('printFile')"
    >
      <q-item-section avatar>
        <q-icon name="o_print" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t('Print') }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      clickable
      v-ripple
      :title="$t('Adjust to your taste')"
      @click="$emit('settings')"
    >
      <q-item-section avatar>
        <q-icon name="o_settings" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t('Settings') }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      v-if="$q.platform.is.electron"
      clickable
      v-ripple
      :title="$t('Close the application')"
      @click="$emit('exit')"
    >
      <q-item-section avatar>
        <q-icon name="o_exit_to_app"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t('Exit') }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Sidebar',

  setup () {
    const store = useStore()
    const appInfo = computed(() => store.getters['base/appInfo'])

    return {
      appInfo
    }
  }
})
</script>
