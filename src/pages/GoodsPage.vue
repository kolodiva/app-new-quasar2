<template>
  <!-- <p class="q-ma-none q-mt-sm">connid: {{connectionid}}</p> -->
  <GoodsGroup v-if='isGroup' :nomenkl='nomenklSimple' />
  <GoodsList v-else :nomenkl='nomenklSimple' @changeOrder='changeOrder'/>
</template>

<script>

export default {

  async preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {

    const myStore = useNomenklatorStore(store);

    await api.get(currentRoute.path, {headers: {'Hostes': myStore.connectionid}, params: {connid: uuidv4() + '-' +  uuidv4()}})
      .then((response) => {
        //console.log(response.data)
        myStore.setNomenklSimple(response.data);
      })
      .catch((e) => {

        // $q.notify({
        //   color: 'negative',
        //   position: 'top',
        //   message: `Loading failed ${e}`,
        //   icon: 'report_problem'
        // })
         console.log(e);
      })

  //console.log(currentRoute.path)
  }

}
</script>

<script setup>
import { v4 as uuidv4 } from "uuid";
import GoodsGroup from '../components/GoodsGroupCards.vue'
import GoodsList from '../components/GoodsList.vue'
import { api } from 'boot/axios'
import { useNomenklatorStore } from 'stores/storeNomenklator'

const {nomenklSimple, isGroup, connectionid, changeOrderPos} = useNomenklatorStore();

const changeOrder = (guid, qty) => {
   changeOrderPos(guid, qty)
}

</script>
