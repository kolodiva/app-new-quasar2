<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="Carousel" color="primary" @click="carousel = true" />
    <q-btn label="Card" color="primary" @click="card = true" />
    <q-btn label="Sliders" color="primary" @click="sliders = true" />

    <q-dialog v-model="carousel">
      <q-carousel
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated
        :autoplay="autoplay"
        infinite
        v-model="slide"
        control-color="primary"
        navigation-icon="flutter_dash"
        navigation
        padding
        height="600px"
        class="bg-white shadow-1 rounded-borders"
        arrows
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
        style="overflow-x: hidden"

      >
        <q-carousel-slide :name="1" class="column no-wrap flex-center">
          <q-icon name="style" color="primary" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="2" class="column no-wrap flex-center">
          <q-icon name="live_tv" color="primary" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="3" class="column no-wrap flex-center">
          <q-icon name="layers" color="primary" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="4" class="column no-wrap flex-center">
          <q-icon name="terrain" color="primary" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
      </q-carousel>
    </q-dialog>

    <q-dialog v-model="card">
      <q-card class="my-card">
        <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="place"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              Cafe Basilico
            </div>
            <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
              <q-icon name="place" />
              250 ft
            </div>
          </div>

          <q-rating v-model="stars" :max="5" size="32px" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            $・Italian, Cafe
          </div>
          <div class="text-caption text-grey">
            Small plates, salads & sandwiches in an intimate setting.
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="Reserve" />
          <q-btn v-close-popup flat color="primary" round icon="event" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="sliders">
      <q-card style="width: 300px" class="q-px-sm q-pb-md">
        <q-card-section>
          <div class="text-h6">Volumes</div>
        </q-card-section>

        <q-item-label header>Media volume</q-item-label>
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="volume_up" />
          </q-item-section>
          <q-item-section>
            <q-slider color="teal" v-model="slideVol" :step="0" />
          </q-item-section>
        </q-item>

        <q-item-label header>Alarm volume</q-item-label>
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="alarm" />
          </q-item-section>
          <q-item-section>
            <q-slider color="teal" v-model="slideAlarm" :step="0" />
          </q-item-section>
        </q-item>

        <q-item-label header>Ring volume</q-item-label>
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="vibration" />
          </q-item-section>
          <q-item-section>
            <q-slider color="teal" v-model="slideVibration" :step="0" />
          </q-item-section>
        </q-item>
      </q-card>
    </q-dialog>

    <div>{{guid}}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { api} from 'boot/axios'

import { useQuasar, QSpinnerFacebook } from 'quasar'

  const $q = useQuasar();

  // $q.notify({
  //         color: 'positive',
  //         position: 'bottom',
  //         message: 'Loading zaebic',
  //         icon: 'check_circle'
  //       });

//const guid1 = await api.get('/test')

    //console.log(data);

      //return {
      const guid = ref('guid1')
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

      function loadData () {
        api.get('/test?id=2356')
          .then((response) => {
            guid.value = response.data.guid
          })
          .catch((e) => {
            $q.notify({
              color: 'negative',
              position: 'top',
              message: `'Loading failed: '${e}`,
              icon: 'report_problem'
            })
          })

          // api.get('/test?id=1804')
          //   .then((response) => {
          //     guid.value = response.data.guid
          //   })
          //   .catch((e) => {
          //     $q.notify({
          //       color: 'negative',
          //       position: 'top',
          //       message: `'Loading failed: '${e}`,
          //       icon: 'report_problem'
          //     })
          //   })
        }

                $q.loading.show({
                  spinner: QSpinnerFacebook,
                  spinnerColor: 'yellow',
                  spinnerSize: 40,
                  backgroundColor: 'purple',
                  message: 'Some important process is in progress. Hang on...',
                  messageColor: 'black'
                });

        loadData();

        setTimeout(() => {
          $q.loading.hide()
        }, 1000)
    //}
  //}
//}
</script>
