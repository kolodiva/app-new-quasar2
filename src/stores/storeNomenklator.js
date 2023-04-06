import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {topNomenkl} from 'assets/nomenkl-top-level.json'


export const useNomenklatorStore = defineStore('nomenklator', () => {

    const nomenklTopLevel = ref(topNomenkl)
    const nomenklSimple = ref([])

    const getNomenklSimple = computed(() => nomenklSimple.value)

    const isGroup = computed(() => nomenklSimple.value && nomenklSimple.value[0] && nomenklSimple.value[0].itgroup)

    function setNomenklSimple(rows) {
        nomenklSimple.value = rows
    }

    return {nomenklTopLevel, nomenklSimple, getNomenklSimple, setNomenklSimple, isGroup}

});
