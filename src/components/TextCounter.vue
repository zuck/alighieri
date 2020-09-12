<template>
  <div class="inline-block">
    <span :title="$t('Chars')">{{ charCount }}</span>
    /
    <span :title="$t('Words')">{{ wordCount }}</span>
    /
    <span :title="$t('Sentences')">{{ sentenceCount }}</span>
    /
    <span :title="$t('Paragraphs')">{{ paragraphCount }}</span>
  </div>
</template>

<script>
export default {
  name: 'text-counter',

  computed: {
    charCount () {
      return this.$store.state.editor.charCount
    },

    wordCount () {
      return this.$store.state.editor.wordCount
    },

    sentenceCount () {
      return this.$store.state.editor.sentenceCount
    },

    paragraphCount () {
      return this.$store.state.editor.paragraphCount
    }
  }
}
</script>
