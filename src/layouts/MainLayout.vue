<template>
  <q-layout view="hHh lpR fFf">

      <q-header elevated class="bg-blue-10 text-white" height-hint="98">
        <q-toolbar>
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

          <q-toolbar-title>
            <q-avatar class="q-pt-xs">
              <img src="avatar_anonim.png" style="filter: invert(100%)">
            </q-avatar>
            <span class="text-body1 q-pl-sm" > НачнЁмс помолясь...</span>
          </q-toolbar-title>

          <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
        </q-toolbar>

        <q-tabs align="left">
          <q-route-tab to="/page1" label="Page One" />
          <q-route-tab to="/page2" label="Page Two" />
          <q-route-tab to="/page3" label="Page Three" />
        </q-tabs>
      </q-header>

      <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
        <!-- drawer content -->
      </q-drawer>

      <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
        <!-- drawer content -->
      </q-drawer>

      <q-page-container>
        <router-view>
          <span>{{guid}}</span>
      </router-view>


      </q-page-container>

      <q-footer elevated class="bg-blue-10 text-white q-py-md">
        <q-toolbar>
          <q-toolbar-title>
            <q-avatar>
              <img src="avatar_anonim.png" style="filter: invert(100%)">
            </q-avatar>
            <div class="text-body1">Vittorio 2023</div>
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>

    </q-layout>

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

    await axios.get('https://kolodiva.com/test?id=1804')
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

const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    const toggleLeftDrawer = () => {
            leftDrawerOpen.value = !leftDrawerOpen.value
          }

          const toggleRightDrawer = () => {
            rightDrawerOpen.value = !rightDrawerOpen.value
          }

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
