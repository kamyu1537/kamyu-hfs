import Vue from 'vue';
import router from './routes';
import './theme.js';
import './electron/renderer_ipc';
import store from './store';

import App from './App.vue';

Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
