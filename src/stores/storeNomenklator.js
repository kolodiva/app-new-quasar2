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

    function changeOrderPos(quid, qty) {

        const obj = nomenklSimple.value.find(o => o.guid === quid);
        obj.qty_order = parseFloat(obj.qty_order) + qty;
    }

    //
    return {nomenklTopLevel, nomenklSimple, getNomenklSimple, setNomenklSimple, isGroup, setConnectionId, connectionid, changeOrderPos}
});
