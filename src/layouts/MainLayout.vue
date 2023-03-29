<template>
  <div class="">
    <q-layout view="lHh Lpr lFf" container style="height: 100vh" class="shadow-2 rounded-borders">
      <q-header reveal elevated>
        <q-toolbar>
          <q-btn flat round dense icon="menu" @click="drawerLeft = !drawerLeft" />

          <q-toolbar-title>
            <strong>Овощной</strong> ларЁк 2023
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
        <q-page padding style="padding-top: 36px">
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="mails">
              <div class="text-h6">Товары</div>
              <p v-for="n in 15" :key="n">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis voluptate?
              </p>
            </q-tab-panel>

            <q-tab-panel name="alarms">
              <div class="text-h6">Корзина</div>
              <p v-for="n in 15" :key="n">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis voluptate?
              </p>
            </q-tab-panel>

            <q-tab-panel name="movies">
              <div class="text-h6">Заказы</div>
              <p v-for="n in 15" :key="n">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis voluptate?
              </p>
            </q-tab-panel>
            <q-tab-panel name="contacts">
              <div class="text-h6">Контакты</div>
              <p v-for="n in 15" :key="n">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis voluptate?
              </p>
            </q-tab-panel>
          </q-tab-panels>

          <!-- place QPageSticky at end of page -->
          <q-page-sticky expand position="top">


            <q-card style="width: 100vw">
              <q-tabs
                v-model="tab"
                dense
                :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
                align="justify"
                narrow-indicator
                style="height: 40px;"
              >
                <q-tab name="mails" label="Товары" />
                <q-tab name="alarms" label="Корзина" />
                <q-tab name="movies" label="Заказы" />
                <q-tab name="contacts" label="Контакты" />
              </q-tabs>


                  </q-card>

          </q-page-sticky>

          <!-- place QPageScroller at end of page -->
                    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 38]">
                      <q-btn fab icon="keyboard_arrow_up" color="accent" />
                    </q-page-scroller>


        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
  setup () {
    const $q = useQuasar()

    return {
      drawerLeft: ref($q.screen.width > 700),
      drawerRight: ref($q.screen.width > 500),
      tab: ref('mails'),
    }
  }
}
</script>
