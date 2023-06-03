<template>
  <q-page class="">

      <div v-for="n in orders" :key='n.order_guid'>
          <q-expansion-item group="somegroup"
          class="text-h5 shadow-1 overflow-hidden q-my-md" :label="`${n.order_id}`" header-class="bg-primary text-white" expand-icon-class="text-white"
          @show="getOrderPositions(n.order_guid)" style="border-radius: 20px">
            <q-card class="">
              <q-card-section>
                <q-tree
                      :nodes="simple"
                      accordion
                      node-key="label"
                      dense
                      v-model:expanded="expanded"
                    >

                    <template v-slot:default-header="prop">
                            <div class="row items-center">
                              <div class="text-h6  text-primary">{{ prop.node.label }}</div>
                            </div>
                          </template>

                          <template v-slot:default-body="prop">
                            <div v-if="prop.node.story" class="text-subtitle1" >
                              {{ prop.node.story }}
                            </div>
                            <!-- <span v-else class="text-weight-light text-black">This is some default content.</span> -->
                          </template>

                  </q-tree>
                </q-card-section>
            </q-card>
          </q-expansion-item>

        </div>




  </q-page>
</template>

<script setup>

  import { postQueryTG } from 'boot/axios'

  import { ref, computed } from 'vue';

  import { useTGStore } from 'stores/storeTG'
  import { storeToRefs } from 'pinia'


  const storeTG = useTGStore();
  const {orders} = storeToRefs(storeTG);

  const simple = ref([])
  const expanded = ref([ 'Заказ однако' ])

  const getOrderPositions = async (order_guid) => {
    //console.log(order_guid)
    //здесь иы делаем Запрос на вывод позиций Заказа с кол-вом и собранными товарами
    const res = await postQueryTG({oper:'getOrderPositions', order_guid})

  //console.log(res.resp)

    if (res.resp) {
      simple.value = [{label: 'Заказ однако', header: 'root', children: res.resp.positions}];
    } else {
      $q.notify({
        color: 'negative',
        position: 'top',
        message: `Loading failed ${res.error}`,
        icon: 'report_problem'
      })
    }
}

</script>
