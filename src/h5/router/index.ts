// 路由懒加载
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
const Home = () => import(/* webpackChunkName: "Home" */ '@/h5/views/Home.vue');
const List = () => import(/* webpackChunkName: "List" */ '@/h5/views/List.vue');
const Article = () => import(/* webpackChunkName: "Article" */ '@/h5/views/Article.vue');
const Fuse = () => import(/* webpackChunkName: "Fuse" */ '@/h5/views/Fuse.vue');
const BigEventList =  () => import(/* webpackChunkName: "BigEventList" */ '@/h5/views/BigEventList.vue');
const Minister =  () => import(/* webpackChunkName: "Minister" */ '@/h5/views/Minister.vue');
const Photograph1 =  () => import(/* webpackChunkName: "Photograph1" */ '@/h5/views/Photograph1.vue');
const Photograph2 =  () => import(/* webpackChunkName: "Photograph2" */ '@/h5/views/Photograph2.vue');

export default new Router({
  mode: 'hash',
  routes: [
    { path: '/', redirect: { name: 'home' } },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/list',
      name: 'list',
      component: List,
    },
    {
      path: '/article',
      name: 'article',
      component: Article,
    },
    {
      path: '/fuse',
      name: 'fuse',
      component: Fuse,
    },
    {
      path: '/bigEventList',
      name: 'bigEventList',
      component: BigEventList,
    },
    {
      path: '/minister',
      name: 'minister',
      component: Minister,
    },
    {
      path: '/fuse',
      name: 'fuse',
      component: Fuse,
    },{
      path: '/photograph1',
      name: 'photograph1',
      component: Photograph1,
    },{
      path: '/photograph2',
      name: 'photograph2',
      component: Photograph2,
    },
  ],
});
