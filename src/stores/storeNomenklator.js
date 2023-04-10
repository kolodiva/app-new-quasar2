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

    const userid = ref(1)
    const useremail = ref('Anonymus')

    //getter
    const isGroup     = computed(() => nomenklSimple.value && nomenklSimple.value[0] && nomenklSimple.value[0].itgroup)
    const isAnonimus  = computed(() => userid.value && userid.value === 1)

    //setter
    async function setConnectionId(connid) {

      //console.log(connid);

        //сюда попадает connid заведом Заполненный (НЕ пустой)
        connectionid.value = connid;

        await api.post('initstart', {connectionid: connid},
          {
            headers: {
            'content-type': 'application/json',
            }
          }).then((response) => {

            qtyOrder.value = response.data.order_qty ? response.data.order_qty : 0;

          //console.log(response.data);
            if (response.data.status === 'New') {
              connectionid.value = response.data.connidnew
            }

            // if (response.data.status === 'Ok') {
            // }
            //
            // if (response.data.status === 'None') {
            //   //просто  ненайден НИЧЕГо не делаем он попадет в базу при первом добавлении товара просто так его в базу не тянем
            // }
            //
            // if (response.data.status === 'Error') {
            // }
          }).catch((e) => {
        })

        return connectionid.value;
    }

    function setNomenklSimple(rows) {
        nomenklSimple.value = rows
        if (rows && rows.length > 0) {
          qtyOrder.value = rows[0].order_qty
        }
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
    return {nomenklTopLevel, nomenklSimple, setNomenklSimple, isGroup, isAnonimus, setConnectionId, connectionid, changeOrderPos, qtyOrder, useremail, userid }
});
