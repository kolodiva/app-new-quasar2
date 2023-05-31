<template>
  <!-- <p class="q-ma-none q-mt-sm">connid: {{connectionid}}</p> -->
  <h6 class="q-my-sm text-primary" >Страница поиска...</h6>
  <!-- <GoodsList :nomenkl='nomenklSimple' @changeOrder='changeOrder' :showzero='true'/> -->
</template>

<script>

export default {

  async preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {

    console.log(currentRoute.query.searchtext);

    //const myStore = useNomenklatorStore(store);

    // await api.get(currentRoute.path, {headers: {'Hostes': myStore.connectionid}, params: {connid: uuidv4() + '-' +  uuidv4()}})
    //   .then((response) => {
    //     //console.log(response.data);
    //     myStore.setNomenklSimple(response.data);
    //   })
    //   .catch((e) => {
    //
    //     // $q.notify({
    //     //   color: 'negative',
    //     //   position: 'top',
    //     //   message: `Loading failed ${e}`,
    //     //   icon: 'report_problem'
    //     // })
    //      console.log(e);
    //   })

  //console.log(currentRoute.path)
  }

}
</script>

<script setup>
import { v4 as uuidv4 } from "uuid";
import GoodsList from '../components/GoodsList.vue'
import { api } from 'boot/axios'
import { useNomenklatorStore } from 'stores/storeNomenklator'

const {nomenklSimple, isGroup, connectionid} = useNomenklatorStore();

const changeOrder = (guid, qty) => {
   changeOrderPos(guid, qty)
}

</script>
