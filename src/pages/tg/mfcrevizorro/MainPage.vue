<template>
  <q-page class="bg-white text-blue q-pa-md">

    <q-list bordered>
      <div v-for="n in orders" :key='n.order_guid'>
          <q-expansion-item class="text-h6" group="somegroup" icon="shopping_cart" :label="`${n.order_id}`" header-class="text-teal" expand-icon-class="text-teal">
            <q-card class="bg-teal-2">
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                eveniet doloribus ullam aliquid.
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator />
        </div>

  </q-list>



  </q-page>
</template>

<script setup>

  import { useTGStore } from 'stores/storeTG'
  import { storeToRefs } from 'pinia'

  const storeTG = useTGStore();
  const {orders} = storeToRefs(storeTG);

</script>
