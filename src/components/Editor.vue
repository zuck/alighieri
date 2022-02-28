<template>
  <editor-content :editor="editor" />
</template>

<script>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

export default {
  components: {
    EditorContent
  },

  setup () {
    const editor = useEditor({
      content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
      extensions: [
        StarterKit
      ],
      editorProps: {
        attributes: {
          class: 'q-pa-lg no-outline'
        }
      }
    })

    return { editor }
  }
}
</script>
