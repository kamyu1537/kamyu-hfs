import Vue from 'vue';
import Vuex from 'vuex';

import path from '@/store/modules/path';
import server from '@/store/modules/server';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    path,
    server,
  },
});

export default store;
