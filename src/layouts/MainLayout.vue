<template>
    <q-layout view="lHh Lpr lFf" container style="height: 100vh" class="shadow-2 rounded-borders">
      <q-header reveal elevated>
        <q-toolbar>
          <q-btn flat round dense icon="menu" @click="drawerLeft = !drawerLeft" />

          <q-toolbar-title>
            <strong>Овощной</strong> ларЬ 2023
          </q-toolbar-title>

          <q-btn flat round dense icon="menu" @click="drawerRight = !drawerRight" />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawerLeft"
        :width="150"
        :breakpoint="700"
        behavior="mobile"
        overlay
        bordered
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      >
        <q-scroll-area class="fit">
          <div class="q-pa-sm">
            <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
          </div>
        </q-scroll-area>
      </q-drawer>

      <q-drawer
        side="right"
        v-model="drawerRight"
        bordered
        :width="150"
        :breakpoint="500"
        behavior="mobile"
        overlay
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      >
        <q-scroll-area class="fit">
          <div class="q-pa-sm">
            <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
          </div>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page padding style="padding-top: 45px">
          <router-view/>
          <!-- place QPageSticky at end of page -->
          <q-page-sticky expand position="top">


            <q-card class="full-width text-h6">
              <q-tabs
                v-model="tab"
                dense
                :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
                narrow-indicator
                style="height: 45px;"
              >
                <q-route-tab to="/" exact no-caps name="goods" label="" icon='home'/>
                <q-route-tab to="/basket" exact name="basket" label="" icon='shopping_cart'/>
                <q-route-tab to="/orders" exact name="orders" label="" icon='list_alt' />
                <q-route-tab to="/contacts" exact name="contacts" label="" icon='contact_phone'/>
              </q-tabs>


                  </q-card>

          </q-page-sticky>
        </q-page>
      </q-page-container>
    </q-layout>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { onBeforeUnmount } from 'vue'


export default {
  setup () {
    const $q = useQuasar()

    function navRedirect (e, go) {
          //e.preventDefault() // we cancel the default navigation

          // call this at your convenience
          go({
            to: { path: '/'},
            //{ query: { path: '/', noScroll: true } },
            // replace: boolean; default is what the tab is configured with
            // returnRouterError: boolean; default is false
          })
          .then(vueRouterResult => { console.log(vueRouterResult)/* ... */ })
          .catch(vueRouterError => {
            /* ...will not reach here unless returnRouterError === true */
          })
        }

    return {
      drawerLeft: ref($q.screen.width > 5700),
      drawerRight: ref($q.screen.width > 5500),
      tab: ref('goods'),
      navRedirect
    }
  }
}
</script>
