import { defineStore } from 'pinia';
import {topNomenkl} from 'assets/nomenkl-top-level.json'


export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});


export const useMyStore = defineStore('guid', {
  state: () => ({
    guid: '',
  }),
  getters: {
    doubleCount: (state) => state.guid + ' - ' + state.guid,
  },
  actions: {
    increment(guid) {
      this.guid = guid;
    },
  },
});

export const useMyStoreNomenklator = defineStore('nomenklTopLevel', {
  state: () => ({
    nomenklTopLevel: topNomenkl,
  }),
  getters: {
    getNomenklTopLevel: (state) => state.nomenklTopLevel,
  },
  actions: {
  },
});

export const useMyStoreNomenklatorSimple = defineStore('nomenklSimple', {
  state: () => ({
    nomenklSimple: [],
  }),
  getters: {
    getNomenklSimple: (state) => state.nomenklSimple,
  },
  actions: {
    setup(list) {
      this.nomenklSimple = list;
    },
  },
});
