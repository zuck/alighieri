<template>
  <q-page class="flex justify-center">
    <container>
      <editor
        :model-value="content"
        @update:modelValue="onUpdateContent"
        @update:text="onUpdateStats"
      />
    </container>
  </q-page>
</template>

<script>
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import Container from 'src/components/Container'
import Editor from 'src/components/Editor'

export default defineComponent({
  name: 'PageIndex',

  components: {
    Container,
    Editor
  },

  setup () {
    const store = useStore()
    const content = computed(() => store.state.editor.content)

    onMounted(() => store.dispatch('editor/reloadFile'))

    return {
      content,
      onUpdateContent (content) {
        store.dispatch('editor/updateContent', content)
      },
      onUpdateStats (text) {
        store.commit('editor/updateStats', text)
      }
    }
  }
})
</script>
