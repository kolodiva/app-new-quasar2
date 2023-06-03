import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
// import { api } from 'boot/axios'

export const useTGStore = defineStore('tg', () => {

    //prop
    const collector = ref({id:1, nickname: 'Nemo', participate: false})
    const orders = ref([])

    //getter
    //const orders_ids  = computed(() => orders.value)

    const reverseActive = () => {collector.value.participate = !collector.value.participate}

    const setCollector = (resp) => {

        collector.value = resp;

        orders.value = resp.orders ? resp.orders : [];
    }
    //
    return {collector, orders, setCollector, reverseActive}
});
