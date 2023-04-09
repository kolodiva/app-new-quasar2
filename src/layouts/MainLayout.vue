<template>
    <q-layout view="lHh Lpr lFf">
      <q-header reveal elevated>
        <q-toolbar>
          <q-btn flat round dense icon="menu" @click="drawerLeft = !drawerLeft" />

          <q-toolbar-title>
            <strong>Овощной</strong> ларЪ 2023
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
            <div v-for="n in 10" :key="n">Drawer {{ n }} / 10</div>
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
            <div v-for="n in 10" :key="n">Drawer {{ n }} / 10</div>
          </div>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page padding style="padding-top: 45px" class="full-height">


          <router-view :key="$route.fullPath"/>

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
                <q-route-tab to="/basket" exact name="basket" label="" icon='shopping_cart'>
                  <q-badge v-if='myStory.getQtyOrder > 0' color="green" floating class="" style=''>{{myStory.getQtyOrder}}</q-badge>
                </q-route-tab>
                <q-route-tab to="/orders" exact name="orders" label="" icon='list_alt' />
                <q-route-tab to="/contacts" exact name="contacts" label="" icon='contact_phone'/>
              </q-tabs>


                  </q-card>

          </q-page-sticky>


          <!-- place QPageScroller at end of page -->
                    <q-page-scroller position="bottom-right" :scroll-offset="250" :offset="[18, 18]" :duration=1000  >
                      <q-btn round  icon="keyboard_arrow_up" color="primary" />
                    </q-page-scroller>
                    <q-page-sticky v-if="$route.path!='/'" position="bottom-left" :offset="[18, 18]">
                      <q-btn round  color="accent" icon="keyboard_arrow_left" @click='$router.go(-1)' />
                    </q-page-sticky>
        </q-page>

      </q-page-container>
    </q-layout>
</template>

<script setup>
  import { useQuasar } from 'quasar'
  import { ref } from 'vue'
  import { useNomenklatorStore } from 'stores/storeNomenklator'

  const myStory = useNomenklatorStore();

  //const qtyOrder = computed(() => {return myStory.getQtyOrder});


  const $q = useQuasar()

  const tab = ref('goods')

  const drawerLeft = ref($q.screen.width > 5700)
  const drawerRight = ref($q.screen.width > 5500)
</script>
