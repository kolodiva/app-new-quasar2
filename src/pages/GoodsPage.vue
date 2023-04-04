<template>
  <q-page>
        <div class="text-h6 q-mt-sm">Товары и тара</div>

        <q-list bordered separator v-for="n in store.getNomenklSimple" :key="n.guid" class="text-h6"

        @click="n.itgroup ? $router.push(`${n.guid}`) : null"
        >

          <q-slide-item @left="onLeft" @right="onRight" v-ripple:orange-5.center>
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
                        <img :src="`${n.guid_picture}`" draggable="false">
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>{{n.name}}</q-item-section>
                  </q-item>
                </q-slide-item>


              </q-list>


  </q-page>

</template>

<script>

export default {

  async preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {

    const myStore = useMyStoreNomenklatorSimple(store);

    await axios.get(`https://kolodiva.com${currentRoute.path}`)
      .then((response) => {
        //guid.value = response.data.guid
        //myStore.increment(response.data.guid);

        myStore.setup(response.data);

        //console.log(response.data)
      })
      .catch((e) => {

        console.log(e);
      })

  //console.log(currentRoute.path)
  }

}
</script>

<script setup>
import axios from 'axios'
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { onBeforeUnmount } from 'vue'
import { useMyStoreNomenklatorSimple } from 'stores/myStore'

    const store = useMyStoreNomenklatorSimple();

    const $q = useQuasar()
    let timer

        const finalize  = (reset) => {
          timer = setTimeout(() => {
            reset()
          }, 500)
        }

        onBeforeUnmount(() => {
          clearTimeout(timer)
        })

      const onLeft = ({ reset }) => {
              $q.notify('Left action triggered. Resetting in 1 second.')
              finalize(reset)
            }

            const onRight = ({ reset }) => {
              $q.notify('Right action triggered. Resetting in 1 second.')
              finalize(reset)
            }

            const img_count = () => {
              return "https://picsum.photos/500/300?t=" + Math.floor(1000*Math.random())
            }
</script>
