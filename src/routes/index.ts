import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '@/routes/Main.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Main }
];

export default new VueRouter({
  routes
});
