<template>

        <q-btn class="q-my-md" icon="arrow_back" outline rounded color="primary" label="Товары и тара" @click='$router.go(-1)'/>

        <q-list bordered separator v-for="n in nomenkl" :key="n.guid" class="text-h6"

        @click="n.itgroup ? $router.push(`${n.guid}`) : null"
        >

          <q-slide-item @left="opt => onLeft(opt, `${n.guid}`)" @right="opt => onRight(opt, `${n.guid}`)">
                  <template v-slot:left>
                    <div class="row items-center">
                      <q-icon left name="add" /> +1
                    </div>
                  </template>
                  <template v-slot:right>
                    <div class="row items-center">
                      <q-icon right name="clear" />
                    </div>
                  </template>

                  <q-item class="" >
                    <q-item-section avatar>
                      <q-avatar size='100px' v-ripple:orange-5.center>
                        <q-badge v-if='n.qty_order > 0' color="red" floating class="q-mt-sm  q-mr-sm">{{n.qty_order}}</q-badge>
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
  const emit = defineEmits(['changeOrder']);

  const $q = useQuasar()

  let timer

      const finalize  = (reset) => {
        timer = setTimeout(() => {
          reset()
        }, 200)
      }

      onBeforeUnmount(() => {
        clearTimeout(timer)
      })

    const onLeft = ({ reset }, guid) => {
            emit('changeOrder', guid, 1)
            $q.notify({type: 'positive', message: 'Добавлена 1 ед. в корзину.', timeout: 500})
            finalize(reset)
          }

          const onRight = ({ reset }, guid) => {
            emit('changeOrder', guid, -1)
            $q.notify({type: 'negative', message: 'Удалена 1 ед. из корзины.', timeout: 500})
            finalize(reset)
          }

</script>
