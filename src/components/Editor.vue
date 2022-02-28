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

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville')

.ProseMirror
  font-size: 20px
  font-size: 300
  font-family: "Libre Baskerville", serif
  line-height: 1.8

  h1, h2, h3, h4, h5, h6
    margin: .3em 0

  h1
    font-size: 5.653rem

  h2
    font-size: 3.998rem

  h3
    font-size: 2.827rem

  h4
    font-size: 1.999rem

  h5
    font-size: 1.414rem

  h6
    font-size: 1rem

  p
    margin-top: 2em
</style>
