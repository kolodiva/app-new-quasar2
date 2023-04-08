<template>

        <!-- <q-btn class="q-my-md" icon="arrow_back" outline rounded color="primary" label="Товары и тара" @click='$router.go(-1)'/> -->
        <q-card class="my-card q-mt-md" bordered v-for="n in nomenkl" :key="n.guid"  style='font-size: 1.2rem;'>

          <q-card-section horizontal class="q-mx-none q-pl-md" style="color: #1976d2; background-color: #c8c6c6;">
             {{n.artikul}}, {{n.artikul_new}}
          </q-card-section>

          <q-separator />

          <q-card-section horizontal>
              <q-item>
                <q-list >

                  <q-slide-item @left="opt => onLeft(opt, n)" @right="opt => onRight(opt, n)">
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

                <q-item-section avatar>
                  <q-avatar size='150px' v-ripple:orange-5.center>
                    <q-badge v-if='n.qty_order > 0' color="red" floating class="q-mt-sm  q-mr-sm q-pa-sm" style='font-size: 1.1rem;'>{{n.qty_order}}</q-badge>
                    <img :src="`${n.url_picture}`" draggable="false">
                  </q-avatar>
                </q-item-section>

              </q-slide-item>

              </q-list>

              </q-item>

              <q-separator vertical/>

              <q-card-section class="col-4">
                Остатки МСК, Цена итд
              </q-card-section>

            </q-card-section>

              <q-separator />

              <q-card-section class='q-pa-none'>

                <q-list >

                  <q-slide-item @left="opt => onLeft(opt, n)" @right="opt => onRight(opt, n)">
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

                <q-card-section class="">
                  {{n.name}}
                </q-card-section>

                </q-slide-item>

                </q-list>


              </q-card-section>




            </q-card>

</template>

<script setup>

  import { useQuasar } from 'quasar'
  import { onBeforeUnmount } from 'vue'

  import sndclac from 'assets/gluhoy-schelchok-s-ehom.mp3'

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

      const beeper = () => {
        let sound = new Audio(sndclac);
        sound.play();
      }

      const onLeft = ({ reset }, n) => {
            beeper()
            emit('changeOrder', n.guid, 1)
            $q.notify({type: 'positive', message: 'Добавлена 1 ед. в корзину.', timeout: 500})
            finalize(reset)
          }

      const onRight = ({ reset }, n) => {
            beeper()
            const op = n.qty_order;
            emit('changeOrder', n.guid, -1)
            if (op > 0 ) {
              $q.notify({type: 'negative', message: 'Удалена 1 ед. из корзины.', timeout: 500})
            }
            finalize(reset)
        }

</script>
