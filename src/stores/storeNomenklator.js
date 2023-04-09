import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {topNomenkl} from 'assets/nomenkl-top-level.json'
import { api } from 'boot/axios'

export const useNomenklatorStore = defineStore('nomenklator', () => {

    //prop
    const nomenklTopLevel = ref(topNomenkl)
    const nomenklSimple = ref([])
    const connectionid = ref('')
    const qtyOrder = ref(0)

    //getter
    const isGroup = computed(() => nomenklSimple.value && nomenklSimple.value[0] && nomenklSimple.value[0].itgroup)

    //setter
    function setNomenklSimple(rows) {
        nomenklSimple.value = rows
        if (rows && rows.length > 0) {
          qtyOrder.value = rows[0].order_qty
        }
    }

    function setConnectionId(connid) {

      //connid = '123456789'
        return connectionid.value = connid
    }

    async function changeOrderPos(guid, qty) {

      const obj = nomenklSimple.value.find(o => o.guid === guid);

      await api.post('changeorder', {connectionid: connectionid.value, guid, qty: parseFloat(obj.qty_order) + qty},
        {
          headers: {
            'content-type': 'application/json',
            // 'Access-Control-Allow-Headers': 'Authorization',
          }
        })
        .then((response) => {

          //console.log(response.data.order_qty);

          obj.qty_order = Math.max(0, parseFloat(obj.qty_order) + qty);

          qtyOrder.value = response.data.order_qty;

        })
        .catch((e) => {

          // $q.notify({
          //   color: 'negative',
          //   position: 'top',
          //   message: `Loading failed ${e}`,
          //   icon: 'report_problem'
          // })
           console.log(e);
        })

    }

    //
    return {nomenklTopLevel, nomenklSimple, setNomenklSimple, isGroup, setConnectionId, connectionid, changeOrderPos, qtyOrder }
});
