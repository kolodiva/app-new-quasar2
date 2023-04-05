<template>
    <GoodsGroup v-if='isGroup' :nomenkl = 'nomenkl' />
    <GoodsList v-else :nomenkl = 'nomenkl' />
</template>

<script>

export default {

  async preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {

    const myStore = useNomenklatorStore(store);

    await axios.get(`https://kolodiva.com${currentRoute.path}`)
      .then((response) => {

        myStore.setNomenklSimple(response.data);

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
import { useNomenklatorStore } from 'stores/storeNomenklator'
import GoodsGroup from '../components/GoodsGroupCards.vue'
import GoodsList from '../components/GoodsList.vue'

    const store = useNomenklatorStore();

    const nomenkl = store.getNomenklSimple;

    const isGroup = store.isGroup;

    //console.log(isGroup)

</script>
