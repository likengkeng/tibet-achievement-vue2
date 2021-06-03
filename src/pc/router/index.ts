// 路由懒加载
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const HelloWorld = () => import('@/pc/components/HelloWorld.vue');
const Home = () => import('@/pc/views/Home.vue');

export default new Router({
  mode: 'hash',
  routes: [
    { path: '/', redirect: { name: 'home' } },
    {
      path: '/introduce',
      name: 'introduce',
      component: HelloWorld,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
  ],
});