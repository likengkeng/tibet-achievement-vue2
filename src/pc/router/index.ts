// 路由懒加载
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
const Home = () => import(/* webpackChunkName: "Home" */ '@/pc/views/Home.vue');
const List = () => import(/* webpackChunkName: "List" */ '@/pc/views/List.vue');
const Article = () => import(/* webpackChunkName: "Article" */ '@/pc/views/Article.vue');

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
    }
  ],
});
