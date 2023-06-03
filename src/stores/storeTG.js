import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
// import { api } from 'boot/axios'

export const useTGStore = defineStore('tg', () => {

    //prop
    const collector = ref({id:1, nickname: 'Nemo', participate: false})
    const orders = ref([])

    //getter
    //const orders_ids  = computed(() => orders.value)

    async function setCollector(resp) {

        collector.value = resp;

        if (!resp.participate) {

          orders.value = [];

        } else {

          if (resp.orders) {
              orders.value = resp.orders;
          }
        }

      }
    //
    return {collector, orders, setCollector}
});
