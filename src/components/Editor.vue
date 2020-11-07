<template>
  <div :class="classNames">
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
          :class="{ 'is-active': isActive.heading() }"
        >
          <q-icon name="title" />
          <div class="editor-menububble-popup">
            <button
              :class="{ 'is-active': isActive.heading({ level: 1 }) }"
              @click="commands.heading({ level: 1 })"
            >
              H1
            </button>
            <button
              :class="{ 'is-active': isActive.heading({ level: 2 }) }"
              @click="commands.heading({ level: 2 })"
            >
              H2
            </button>
            <button
              :class="{ 'is-active': isActive.heading({ level: 3 }) }"
              @click="commands.heading({ level: 3 })"
            >
              H3
            </button>
            <button
              :class="{ 'is-active': isActive.heading({ level: 4 }) }"
              @click="commands.heading({ level: 4 })"
            >
              H4
            </button>
            <button
              :class="{ 'is-active': isActive.heading({ level: 5 }) }"
              @click="commands.heading({ level: 5 })"
            >
              H5
            </button>
            <button
              :class="{ 'is-active': isActive.heading({ level: 6 }) }"
              @click="commands.heading({ level: 6 })"
            >
              H6
            </button>
          </div>
        </button>

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
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <q-icon name="format_quote" />
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

  computed: {
    classNames () {
      const value = this.$store.getters['base/settings']
      return {
        editor: true,
        'par-space-between': value.parSpaceBetween,
        'par-indent-first-line': value.parIndentFirstLine
      }
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

  @media print
    font-size 1rem
    max-width 100%

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
  pre
    margin-bottom 0

  li
    p
      margin-bottom 0

  code,
  pre
    border-radius: .5rem
    color: $grey-1
    background-color: $grey-10

  code
    padding: .25rem .5rem

  pre
    padding: 1rem

    code
      padding: 0

  blockquote
    margin 2.5rem 0
    padding-left 2rem
    padding-right 2rem
    border-left 5px solid $grey-5
    font-size 1.25em
    line-height 1.75em

  hr
    margin 4rem auto
    max-width 10rem

  a
    color $accent
    cursor pointer

  strong,
  b
    font-weight 800

.editor-menububble
  position absolute
  display flex
  z-index $z-top
  background $grey-10
  border-radius 5px
  padding 0.3rem
  margin-bottom 0.5rem
  transform translateX(-50%)
  visibility hidden
  opacity 0
  transition opacity 0.2s, visibility 0.2s

  .editor-menububble-popup
    position absolute
    flex-direction column
    left 0
    top 0
    background $grey-10

    button
      display none
      margin 0

      &.is-active
        display inline-flex

  button
    display inline-flex
    position relative
    background transparent
    border 0
    outline none
    color $grey-5
    font-size 1.2rem
    font-weight bold
    line-height 1.5rem
    vertical-align middle
    padding 0.2rem 0.5rem
    margin-right 0.2rem
    border-radius 3px
    cursor pointer

    .q-icon
      font-size 1.5rem

    &last-child
      margin-right 0

    &:hover
    &:focus
      color $grey-5 !important
      background-color rgba(white, 0.2)

      .editor-menububble-popup
        display inline-flex

        button
          display inline-flex

    &.is-active
      background-color $accent
      color $grey-1 !important

  &.is-active
    opacity 1
    visibility visible

.body--dark
  .ProseMirror
    pre,
    code
      color $grey-10
      background-color $grey-1

  .editor-menububble
    background $grey-1

    .editor-menububble-popup
      background $grey-1

    button
      color $grey-10

      &:hover
        color $grey-10 !important
        background-color rgba(black, 0.2)

.par-space-between
  .ProseMirror
    p,
    pre
      margin-bottom 0.5em

.par-indent-first-line
  .ProseMirror
    p
      text-indent 2rem
</style>
