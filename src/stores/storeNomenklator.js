import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {topNomenkl} from 'assets/nomenkl-top-level.json'

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
        connectionid.value = connid
    }

    //
    return {nomenklTopLevel, nomenklSimple, getNomenklSimple, setNomenklSimple, isGroup, setConnectionId, connectionid}
});
