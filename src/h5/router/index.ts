// 路由懒加载
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
const Home = () => import(/* webpackChunkName: "Home" */ '@/h5/views/Home.vue');

export default new Router({
  mode: 'hash',
  routes: [
    { path: '/', redirect: { name: 'home' } },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
  ],
});
