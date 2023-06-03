<template>
  <q-page class="">

      <div v-for="n in orders" :key='n.order_guid'>
          <q-expansion-item group="somegroup"
          class="text-h5 shadow-1 overflow-hidden q-my-md" :label="`${n.order_id}`" header-class="bg-primary text-white" expand-icon-class="text-white"
          @show="startCounting(n.order_guid)" style="border-radius: 20px">
            <q-card class="">
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                eveniet doloribus ullam aliquid.
              </q-card-section>
            </q-card>
          </q-expansion-item>

        </div>




  </q-page>
</template>

<script setup>

  import { useTGStore } from 'stores/storeTG'
  import { storeToRefs } from 'pinia'

  const storeTG = useTGStore();
  const {orders} = storeToRefs(storeTG);

  const startCounting = (order_guid) => {
    //console.log(order_guid)
    //здесь иы делаем Запрос на вывод позиций Заказа с кол-вом и собранными товарами
  }

</script>
