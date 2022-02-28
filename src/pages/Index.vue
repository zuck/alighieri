<template>
  <q-page class="flex justify-center">
    <container>
      <editor/>
    </container>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import Container from 'src/components/Container'
import Editor from 'src/components/Editor'

export default defineComponent({
  name: 'PageIndex',

  components: {
    Container,
    Editor
  }
})
</script>
