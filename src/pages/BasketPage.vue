<template>
  <q-page>
        <div class="text-h6 q-mt-sm">Хлам в Корзине</div>


        <div class="q-mb-xs" >
          <p v-for="n in 50" :key="n">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis voluptate?
          </p>
            </div>


    <!-- place QPageScroller at end of page -->
              <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 38]">
                <q-btn fab icon="keyboard_arrow_up" color="accent" />
              </q-page-scroller>


  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { onBeforeUnmount } from 'vue'

export default {
  setup () {
    const $q = useQuasar()
    let timer

        function finalize (reset) {
          timer = setTimeout(() => {
            reset()
          }, 1000)
        }

        onBeforeUnmount(() => {
          clearTimeout(timer)
        })

    return {
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
