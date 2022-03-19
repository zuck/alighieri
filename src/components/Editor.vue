<template>
  <bubble-menu
    v-if="editor"
    :editor="editor"
    :tippy-options="{ duration: 100 }"
  >
    <q-btn-group>
      <q-btn-dropdown
        dense
        icon="title"
        :color="editor.isActive('heading') ? 'accent' : color"
      >
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
            <q-item-section>
              <q-item-label>{{ $t(`H${level}`) }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
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
    </q-btn-group>
  </bubble-menu>
  <editor-content :editor="editor" />
</template>

<script>
import { computed } from 'vue'
import { throttle } from 'quasar'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Typography from '@tiptap/extension-typography'
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
    const updateContent = throttle((content, text) => {
      emit('update:modelValue', content)
      emit('update:text', text)
    }, UPDATE_STATS_DEBOUNCE_TIME)
    const editor = useEditor({
      content: props.modelValue,
      extensions: [
        StarterKit,
        Underline,
        Typography
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

  p, ol, ul
    margin-top: 1.5em

  li p
    margin-top: 0

  blockquote
    margin-left: 0
    padding-left: 1.5rem
    border-left: 8px solid $grey-5
</style>
