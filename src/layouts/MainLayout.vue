<template>
    <div>{{guid}}</div>
</template>


<script>

export default {

  async preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {

    // const $q = useQuasar();

    const myStore = useMyStore(store);

    // fetch data, validate route and optionally redirect to some other route...

    // ssrContext is available only server-side in SSR mode

    // No access to "this" here

    // Return a Promise if you are running an async job
    // Example:
    //return store.dispatch('fetchItem', currentRoute.params.id)

            // $q.loading.show({
            //   spinner: QSpinnerFacebook,
            //   spinnerColor: 'yellow',
            //   spinnerSize: 40,
            //   backgroundColor: 'purple',
            //   message: 'Some important process is in progress. Hang on...',
            //   messageColor: 'black'
            // });

            console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');

    await axios.get('https://kolodiva.com/test?id=2356')
      .then((response) => {
        //guid.value = response.data.guid
        myStore.increment(response.data.guid);

        //console.log(myStore.guid)
      })
      .catch((e) => {

        console.log(e);
      })

      // setTimeout(() => {
      //   $q.loading.hide()
      // }, 1000)

}
}
</script>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useMyStore } from 'stores/myStore'
import { computed } from 'vue';

import { useQuasar, QSpinnerFacebook } from 'quasar'

  const $q = useQuasar();

      const store = useMyStore();

      //return {
      const guid = computed(() => store.guid);
      const carousel = ref(false)
      const card = ref(false)
      const sliders = ref(false)

      const autoplay = ref(true)

      const slide = ref(1)
      const lorem = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!'

      const stars = ref(3)

      const slideVol = ref(39)
      const slideAlarm = ref(56)
      const slideVibration = ref(63)

</script>
