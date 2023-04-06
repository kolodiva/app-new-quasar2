<template>

        <q-btn class="q-my-md" icon="arrow_back" outline rounded color="primary" label="Товары и тара" @click='$router.go(-1)'/>

        <q-list bordered separator v-for="n in nomenkl" :key="n.guid" class="text-h6"

        @click="n.itgroup ? $router.push(`${n.guid}`) : null"
        >

          <q-slide-item @left="onLeft" @right="onRight">
                  <template v-slot:left>
                    <div class="row items-center">
                      <q-icon left name="done" /> Left
                    </div>
                  </template>
                  <template v-slot:right>
                    <div class="row items-center">
                      Кол-во... <q-icon right name="alarm" />
                    </div>
                  </template>

                  <q-item class="" >
                    <q-item-section avatar>
                      <q-avatar size='100px' v-ripple:orange-5.center>
                        <img :src="`${n.url_picture}`" draggable="false">
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>{{n.name}}</q-item-section>
                  </q-item>
                </q-slide-item>
              </q-list>

</template>

<script setup>

  import { useQuasar } from 'quasar'
  import { onBeforeUnmount } from 'vue'

  defineProps({nomenkl: Array});

  const $q = useQuasar()
  let timer

      const finalize  = (reset) => {
        timer = setTimeout(() => {
          reset()
        }, 500)
      }

      onBeforeUnmount(() => {
        clearTimeout(timer)
      })

    const onLeft = ({ reset }) => {
            $q.notify('Left action triggered. Resetting in 1 second.')
            finalize(reset)
          }

          const onRight = ({ reset }) => {
            $q.notify('Right action triggered. Resetting in 1 second.')
            finalize(reset)
          }

</script>
