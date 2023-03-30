<template>
  <q-page>
        <div class="text-h6 q-mt-sm">Товары и тара</div>


        <div v-for="n in 50" :key="n" class="q-mb-xs" >
        <q-list bordered separator class="text-h6">

          <q-slide-item @left="onLeft" @right="onRight">
                  <template v-slot:left>
                    <div class="row items-center">
                      <q-icon left name="done" /> Left
                    </div>
                  </template>
                  <template v-slot:right>
                    <div class="row items-center">
                      Кол-во... <q-icon right name="alarm" />
                    </div>
                  </template>

                  <q-item class="" >
                    <q-item-section avatar>
                      <q-avatar>
                        <img :src='img_count()' draggable="false">
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>В Корзину {{n}}</q-item-section>
                  </q-item>
                </q-slide-item>


              </q-list>
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
