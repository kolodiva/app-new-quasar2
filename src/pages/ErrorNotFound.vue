<template>
  <q-page class="bg-white text-blue text-center q-pa-md flex flex-center">

    <div>
      <div style="font-size: 15vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        Oops.<br>А ннету ничего...
      </div>

      <q-btn
        class="q-mt-xl"
        color="blue"
        text-color="white"
        unelevated
        to="/"
        label="В Каталог"
        no-caps
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorNotFound'
})
</script>
