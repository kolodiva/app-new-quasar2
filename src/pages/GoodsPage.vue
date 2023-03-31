<template>

  <!-- <q-page  class="q-pa-md"> -->
      <div class="row justify-center q-gutter-sm">
        <q-intersection
          v-for="n in store.getNomenklTopLevel"
          :key='n.id'
          once
          transition="scale"
          class="example-item"
        >
          <q-card flat bordered class="q-ma-sm">
            <img :src="`${n.url}`">

            <q-card-section>
              <div class="text-h6">Card #{{ index }}</div>
              <div class="text-subtitle2">by John Doe</div>
            </q-card-section>
          </q-card>
        </q-intersection>
      </div>
    <!-- </q-page> -->

</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { onBeforeUnmount } from 'vue'
import { useMyStoreNomenklator } from 'stores/myStore'


export default {
  setup () {
    const store = useMyStoreNomenklator();

    const $q = useQuasar()
    let timer

        function finalize (reset) {
          timer = setTimeout(() => {
            reset()
          }, 500)
        }

        onBeforeUnmount(() => {
          clearTimeout(timer)
        })

    return {
      store,
      onLeft ({ reset }) {
              $q.notify('Left action triggered. Resetting in 1 second.')
              finalize(reset)
            },

            onRight ({ reset }) {
              $q.notify('Right action triggered. Resetting in 1 second.')
              finalize(reset)
            },

            img_count(){
              return "https://picsum.photos/500/300?t=" + Math.floor(1000*Math.random())
            },
    }
  }
}
</script>

  <style lang="scss" scoped>
  .example-item {
    height: 250px;
    width: 160px;
    }
  </style>
