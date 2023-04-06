<template>
  <p>connid: {{connectionid}}</p>
  <GoodsGroup v-if='isGroup' :nomenkl='nomenklSimple' />
  <GoodsList v-else :nomenkl='nomenklSimple' />
</template>

<script>

export default {

  async preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {

    const myStore = useNomenklatorStore(store);

    await api.get(`${currentRoute.path}`)
      .then((response) => {
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
import GoodsGroup from '../components/GoodsGroupCards.vue'
import GoodsList from '../components/GoodsList.vue'
import { api } from 'boot/axios'
import { useNomenklatorStore } from 'stores/storeNomenklator'



    const {nomenklSimple, isGroup, connectionid} = useNomenklatorStore();

</script>
