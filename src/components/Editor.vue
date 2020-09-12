<template>
  <editor-content :editor="editor" />
</template>

<script>
import { Editor, EditorContent } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Strike,
  Underline,
  Link,
  History,
  TrailingNode
} from 'tiptap-extensions'
import { LocalStorage } from 'quasar'
import { CONTENT_CACHE_KEY } from '../config'

export default {
  name: 'editor',

  components: {
    EditorContent
  },

  data () {
    return {
      editor: null
    }
  },

  mounted () {
    const html = LocalStorage.getItem(CONTENT_CACHE_KEY)
    this.$store.dispatch('editor/updateContent', html)
    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading(),
        new HorizontalRule(),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new Link(),
        new History(),
        new TrailingNode({
          node: 'paragraph',
          notAfter: ['paragraph']
        })
      ],
      content: html,
      autoFocus: true,
      onUpdate: ctx => {
        this.$store.dispatch('editor/updateContent', ctx.getHTML())
      }
    })
  },

  beforeDestroy () {
    this.editor.destroy()
  }
}
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Spectral|Spectral+SC')
@import url('https://fonts.googleapis.com/css2?family=Martel:wght@200;300;400;600;700;800;900&display=swap')

.ProseMirror
  max-width 650px
  margin 0 auto
  padding 0 1.5rem
  font-size: 1.25rem
  font-family 'Martel', serif
  line-height 1.75em

  &:focus
    outline: none

  h1, h2, h3, h4, h5, h6
    margin 1em 0
    font-family 'Spectral', serif
    line-height 1.25em

  h1
    font-weight 800
    font-size 3rem

  h2
    font-weight 600
    font-size 2.25rem

  h3
    font-weight 600
    font-size 1.875rem

  h4
    font-weight 600
    font-size 1.5rem

  h5
    font-weight 600
    font-size 1.3125rem

  h6
    font-weight 600
    font-size 1.125rem

  h1+h2, h2+h3, h3+h4, h4+h5, h5+h6
    margin-top -.5em

  code,
  pre
    border-radius: .5rem
    color: #fff
    background-color: #000

  code
    padding: .25rem .5rem

  pre
    padding: 1rem

    code
      padding: 0

  hr
   margin 4rem auto
   max-width 10rem
</style>
