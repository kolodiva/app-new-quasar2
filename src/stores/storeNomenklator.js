import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {topNomenkl} from 'assets/nomenkl-top-level.json'
import { api } from 'boot/axios'

export const useNomenklatorStore = defineStore('nomenklator', () => {

    //prop
    const nomenklTopLevel = ref(topNomenkl)
    const nomenklSimple = ref([])
    const connectionid = ref('')

    //getter
    const getNomenklSimple = computed(() => nomenklSimple.value)
    const isGroup = computed(() => nomenklSimple.value && nomenklSimple.value[0] && nomenklSimple.value[0].itgroup)

    //setter
    function setNomenklSimple(rows) {
        nomenklSimple.value = rows
    }

    function setConnectionId(connid) {

      //connid = '123456789'
        return connectionid.value = connid
    }

    async function changeOrderPos(guid, qty) {

      //console.log({connectionid: connectionid.value, guid, qty});
      const obj = nomenklSimple.value.find(o => o.guid === guid);

      await api.post('changeorder', {connectionid: connectionid.value, guid, qty: parseFloat(obj.qty_order) + qty})
        .then((response) => {

          //console.log(response);
          obj.qty_order = Math.max(0, parseFloat(obj.qty_order) + qty);
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
    return {nomenklTopLevel, nomenklSimple, getNomenklSimple, setNomenklSimple, isGroup, setConnectionId, connectionid, changeOrderPos}
});
