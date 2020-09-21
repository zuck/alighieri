<template>
  <div class="editor">
    <editor-menu-bubble
      :editor="editor"
      :keep-in-bounds="keepInBounds"
      v-slot="{ commands, isActive, menu }"
    >
      <div
        class="editor-menububble"
        :class="{ 'is-active': menu.isActive }"
        :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
      >

        <button
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <q-icon name="format_bold" />
        </button>

        <button
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <q-icon name="format_italic" />
        </button>

        <button
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <q-icon name="format_underline" />
        </button>

        <button
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <q-icon name="format_strikethrough" />
        </button>

        <button
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <q-icon name="code" />
        </button>
      </div>
    </editor-menu-bubble>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBubble } from 'tiptap'
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
    EditorContent,
    EditorMenuBubble
  },

  data () {
    return {
      keepInBounds: true,
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
  },

  methods: {
    focus () {
      this.editor.focus()
    },

    setContent (content) {
      const current = this.editor.getHTML()
      if (content !== current) {
        this.editor.setContent(content)
        this.editor.focus()
      }
    }
  },

  watch: {
    '$store.state.editor.contentHTML': function (val) {
      this.setContent(val)
    }
  }
}
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Spectral|Spectral+SC')
@import url('https://fonts.googleapis.com/css2?family=Martel:wght@200;300;400;600;700;800;900&display=swap')

.editor
  cursor text
  padding-top 1rem

.ProseMirror
  max-width 700px
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

  p,
  blockquote,
  pre
    margin-bottom 1.25em

  code,
  pre
    border-radius: .5rem
    color: white
    background-color: black

  code
    padding: .25rem .5rem

  pre
    padding: 1rem

    code
      padding: 0

  hr
    margin 4rem auto
    max-width 10rem

  a
    color $accent
    cursor pointer

.editor-menububble
  position absolute
  display flex
  z-index $z-top
  background black
  border-radius 5px
  padding 0.3rem
  margin-bottom 0.5rem
  transform translateX(-50%)
  visibility hidden
  opacity 0
  transition opacity 0.2s, visibility 0.2s

  &.is-active
    opacity 1
    visibility visible

  button
    display inline-flex
    background transparent
    border 0
    outline none
    color white
    font-size 1.5rem
    padding 0.2rem 0.5rem
    margin-right 0.2rem
    border-radius 3px
    cursor pointer

    &last-child
      margin-right 0

    &:hover
      background-color rgba(white, 0.2)

    &.is-active
      background-color $accent
      color white !important

.body--dark
  .ProseMirror
    pre,
    code
      color: black
      background-color: white

  .editor-menububble
    background white

    button
      color black
</style>
