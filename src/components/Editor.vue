<template>
  <bubble-menu
    v-if="editor"
    :editor="editor"
    :tippy-options="{ duration: 100 }"
  >
    <q-btn-group>
      <q-btn
        dense
        icon="format_size"
        :color="editor.isActive('heading') ? 'accent' : color"
      >
        <q-menu>
          <q-list separator dense>
            <q-item
              v-for="level of 6"
              :key="level"
              clickable
              v-close-popup
              active-class="bg-accent text-white"
              :active="editor.isActive('heading', { level })"
              @click="editor.chain().focus().toggleHeading({ level }).run()"
            >
              <q-item-section>{{ $t(`H${level}`) }}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <q-separator vertical/>
      <q-btn
        dense
        icon="format_align_left"
        :color="editor.isActive({ textAlign: 'left' }) ? 'accent' : color"
        @click="editor.chain().focus().setTextAlign('left').run()"
      />
      <q-btn
        dense
        icon="format_align_center"
        :color="editor.isActive({ textAlign: 'center' }) ? 'accent' : color"
        @click="editor.chain().focus().setTextAlign('center').run()"
      />
      <q-btn
        dense
        icon="format_align_right"
        :color="editor.isActive({ textAlign: 'right' }) ? 'accent' : color"
        @click="editor.chain().focus().setTextAlign('right').run()"
      />
      <q-separator vertical/>
      <q-btn
        dense
        icon="format_bold"
        :color="editor.isActive('bold') ? 'accent' : color"
        @click="editor.chain().focus().toggleBold().run()"
      />
      <q-btn
        dense
        icon="format_italic"
        :color="editor.isActive('italic') ? 'accent' : color"
        @click="editor.chain().focus().toggleItalic().run()"
      />
      <q-btn
        dense
        icon="format_underline"
        :color="editor.isActive('underline') ? 'accent' : color"
        @click="editor.chain().focus().toggleUnderline().run()"
      />
      <q-btn
        dense
        icon="format_strikethrough"
        :color="editor.isActive('strike') ? 'accent' : color"
        @click="editor.chain().focus().toggleStrike().run()"
      />
      <q-separator vertical/>
      <q-btn
        dense
        icon="format_quote"
        :color="editor.isActive('blockquote') ? 'accent' : color"
        @click="editor.chain().focus().toggleBlockquote().run()"
      />
      <q-btn
        dense
        icon="code"
        :color="editor.isActive('code') ? 'accent' : color"
        @click="editor.chain().focus().toggleCode().run()"
      />
    </q-btn-group>
  </bubble-menu>
  <editor-content :editor="editor" />
</template>

<script>
import { computed } from 'vue'
import { debounce } from 'quasar'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Typography from '@tiptap/extension-typography'
import TextAlign from '@tiptap/extension-text-align'
import { UPDATE_STATS_DEBOUNCE_TIME } from '../config'

export default {
  components: {
    EditorContent,
    BubbleMenu
  },

  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },

  setup (props, { emit }) {
    const updateContent = debounce((content, text) => {
      emit('update:modelValue', content)
      emit('update:text', text)
    }, UPDATE_STATS_DEBOUNCE_TIME)
    const editor = useEditor({
      content: props.modelValue,
      extensions: [
        StarterKit,
        Underline,
        Typography,
        TextAlign.configure({
          types: ['heading', 'paragraph']
        })
      ],
      editorProps: {
        attributes: {
          class: 'q-pa-lg no-outline'
        }
      },
      onUpdate () {
        updateContent(this.getHTML(), this.getText())
      }
    })
    const color = computed(() => 'black')

    return {
      editor,
      color
    }
  },

  watch: {
    modelValue (value) {
      const isSame = this.editor.getHTML() === value
      if (!isSame) {
        this.editor.commands.setContent(value, true)
      }
    }
  }
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville')

.ProseMirror
  font-size: 20px
  font-family: "Libre Baskerville", serif
  line-height: 2

  h1, h2, h3, h4, h5, h6
    margin: 3rem 0
    line-height: 1.3

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

  p, ol, ul
    margin-top: 1em

  li p
    margin-top: 0

  hr
    margin: 4em

  blockquote
    margin-left: 0
    padding-left: 1.5rem
    border-left: 8px solid $grey-5

  p,
  pre
    margin-bottom: 0

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

  a
    color: $accent
    cursor: pointer

  img
    max-width: 100%
</style>
