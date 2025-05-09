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
      <q-separator vertical />
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
      <q-separator vertical />
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
      <q-separator vertical />
      <q-btn
        dense
        icon="link"
        :color="editor.isActive('link') ? 'accent' : color"
        @click="() => setLink(editor)"
      />
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
      <q-btn flat round icon="o_add_a_photo" @click="addImage(editor)" />
    </q-btn-group>
  </floating-menu>
  <editor-content :class="editorClass" :editor="editor" />
</template>

<script>
import CodeBlock from "@tiptap/extension-code-block";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  useEditor,
} from "@tiptap/vue-3";
import { debounce, useQuasar } from "quasar";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { UPDATE_STATS_DEBOUNCE_TIME } from "../config";

export default {
  components: {
    EditorContent,
    BubbleMenu,
    FloatingMenu,
  },

  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },

  setup(props, { emit }) {
    const { t } = useI18n();
    const updateContent = debounce((content, text) => {
      emit("update:modelValue", content);
      emit("update:text", text);
    }, UPDATE_STATS_DEBOUNCE_TIME);

    const quasar = useQuasar();
    const store = useStore();
    const color = computed(() => "black");
    const editorClass = computed(() => ({
      "par-space-between": store.state.base.parSpaceBetween,
      "par-indent-first-line": store.state.base.parIndentFirstLine,
    }));
    const editor = useEditor({
      content: props.modelValue,
      extensions: [
        StarterKit,
        Link,
        Underline,
        Typography,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        CodeBlock,
        Image,
      ],
      editorProps: {
        attributes: {
          class: "q-py-xl q-px-lg no-outline",
        },
      },
      onUpdate() {
        updateContent(this.getHTML(), this.getText());
      },
    });

    function addImage(editor) {
      quasar
        .dialog({
          title: t("Add image"),
          prompt: {
            model: "",
            placeholder: t("Please, enter the image source URL"),
            type: "text",
          },
          cancel: true,
          persistent: true,
        })
        .onOk((src) => {
          if (src !== null) {
            editor.chain().focus().setImage({ src }).run();
          }
        });
    }

    function setLink(editor) {
      const previousUrl = editor.getAttributes("link").href;
      quasar
        .dialog({
          title: t("Set link"),
          prompt: {
            model: previousUrl,
            placeholder: t("Please, enter the link URL"),
            type: "text",
          },
          cancel: true,
          persistent: true,
        })
        .onOk((href) => {
          href
            ? editor.chain().focus().setLink({ href }).run()
            : editor.chain().focus().unsetLink().run();
        });
    }

    return {
      editor,
      editorClass,
      color,
      addImage,
      setLink,
    };
  },

  watch: {
    modelValue(value) {
      const isSame = this.editor.getHTML() === value;
      if (!isSame) {
        this.editor.commands.setContent(value, true);
      }
    },
  },
};
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
    line-height: 1.2

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

  hr
    margin: 4rem

  blockquote
    margin-left: 0
    padding-left: 1.5rem
    border-left: 8px solid $grey-5

  p
    margin-bottom: 0
    text-indent: 0

  li p
    margin-bottom: 0 !important
    text-indent: 0 !important

  ol, ul, img, table, pre
    margin-bottom: 1.5em

  code,
  pre
    border-radius: .5rem
    color: $grey-1
    background-color: $grey-9

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

.par-space-between
  .ProseMirror
    p
      margin-bottom: 1.5em

.par-indent-first-line
  .ProseMirror
    p
      text-indent: 2em
</style>
