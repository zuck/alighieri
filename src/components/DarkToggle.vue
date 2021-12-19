<template>
  <q-btn flat dense round icon="lightbulb_outline" @click="$emit('click')"/>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'dark-toggle'
})
</script>
