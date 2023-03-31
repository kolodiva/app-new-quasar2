<template>

  <q-page class="q-py-md">
      <div class="row justify-center q-gutter-sm">

        <!-- <q-responsive :ratio="1/8" class=""
        v-for="n in store.getNomenklTopLevel"
        :key='n.id'
        style='min-width: 80px'
        > -->

          <q-card flat bordered class="col-xs-5 col-sm-2 col-md-1"
          v-for="n in store.getNomenklTopLevel"
          :key='n.id'
          style='min-width: 160px'
          >
            <!-- <q-avatar square color="grey"  class="fit"><q-img :src="`${n.url}`" /></q-avatar> -->
            <!-- <q-img class="col" :src="`${n.url}`" /> -->


            <q-skeleton height="180px" class="row justify-center" animation='none' square >
              <q-img fit='fill' :src="`${n.url}`" style='max-width: 180px;' />
            </q-skeleton>





            <q-card-section style='overflow: auto'>
              <div class="text-subtitle2 text-center"  >{{ n.name }}</div>
              <!-- <div class="text-subtitle2">by John Doe</div> -->
            </q-card-section>
          </q-card>
        <!-- </q-responsive> -->
      </div>
    </q-page>

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
    min-height: 250px;
    height: 250px;
    max-height: 250px;
    width: 160px;
    }
  </style>
