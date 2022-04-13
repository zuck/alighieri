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
      <q-btn
        dense
        icon="code"
        :color="editor.isActive('code') ? 'accent' : color"
        @click="editor.chain().focus().toggleCode().run()"
      />
      <q-separator vertical/>
      <q-btn
        dense
        icon="format_quote"
        :color="editor.isActive('blockquote') ? 'accent' : color"
        @click="editor.chain().focus().toggleBlockquote().run()"
      />
    </q-btn-group>
  </bubble-menu>
  <floating-menu
    v-if="editor"
    :editor="editor"
    :tippy-options="{ duration: 100 }"
  >
    <q-btn-group flat class="q-ml-lg faded">
      <q-btn
        flat
        round
        icon="o_add_a_photo"
        @click="addImage(editor)"
      />
    </q-btn-group>
  </floating-menu>
  <editor-content :editor="editor" />
</template>

<script>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { debounce, useQuasar } from 'quasar'
import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Typography from '@tiptap/extension-typography'
import TextAlign from '@tiptap/extension-text-align'
import CodeBlock from '@tiptap/extension-code-block'
import Image from '@tiptap/extension-image'
import { UPDATE_STATS_DEBOUNCE_TIME } from '../config'

export default {
  components: {
    EditorContent,
    BubbleMenu,
    FloatingMenu
  },

  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },

  setup (props, { emit }) {
    const { t } = useI18n()
    const updateContent = debounce((content, text) => {
      emit('update:modelValue', content)
      emit('update:text', text)
    }, UPDATE_STATS_DEBOUNCE_TIME)

    const color = computed(() => 'black')
    const quasar = useQuasar()
    const editor = useEditor({
      content: props.modelValue,
      extensions: [
        StarterKit,
        Underline,
        Typography,
        TextAlign.configure({
          types: ['heading', 'paragraph']
        }),
        CodeBlock,
        Image
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

    const addImage = (editor) => {
      quasar.dialog({
        title: t('Add image'),
        prompt: {
          model: '',
          placeholder: t('Please, enter the image source URL'),
          type: 'text'
        },
        cancel: true,
        persistent: true
      }).onOk(src => {
        if (src !== null) {
          editor.chain().focus().setImage({ src }).run()
        }
      })
    }

    return {
      editor,
      color,
      addImage
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

.faded
  opacity: .33

.faded:hover
  opacity: 1

.ProseMirror
  font-size: 20px
  font-family: "Libre Baskerville", serif
  line-height: 2

  @media print
    font-size: 12pt

  h1, h2, h3, h4, h5, h6
    line-height: 1

  h1
    font-size: 3.052em

  h2
    opacity: .7
    font-size: 2.441em

    @media print
      opacity: 1

  h3
    font-size: 1.953em

  h4
    font-size: 1.563em

  h5
    font-size: 1.25em

  h6
    font-size: 1em

  p, ol, ul
    margin-top: 1em

  li p
    margin-top: 0

  hr
    margin: 4rem

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
