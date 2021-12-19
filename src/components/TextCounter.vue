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
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'text-counter',

  setup () {
    const store = useStore()
    const charCount = computed(() => store.state.editor.charCount)
    const wordCount = computed(() => store.state.editor.wordCount)
    const sentenceCount = computed(() => store.state.editor.sentenceCount)
    const paragraphCount = computed(() => store.state.editor.paragraphCount)

    return {
      charCount,
      wordCount,
      sentenceCount,
      paragraphCount
    }
  }
})
</script>
