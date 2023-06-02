import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { api } from 'boot/axios'

export const useTGStore = defineStore('tg', () => {

    //prop
    const collector = ref({id:1, nickname: 'Nemo', participate: false, orders: {}})
    const orders = ref([])

    async function setCollector(resp) {

        collector.value = resp;

        if (!resp.participate) {

          orders.value = [];

        } else {

          if (resp.orders && resp.orders.orders_ids) {
              orders.value = resp.orders.orders_ids;
          }
        }

      }
    //
    return {collector, orders, setCollector}
});
