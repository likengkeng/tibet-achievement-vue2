import Vue from 'vue';
import router from './router/index'
import store from './store/index'
import App from './App.vue' // 引入 APP 页面组建
import directive from '@/common/directives'; //注册全局自定义指令
import '@/h5/static/styles/common.css';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { Swipe, SwipeItem } from 'vant';
import { Tab, Tabs } from 'vant';
import { Popup } from 'vant';
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Popup);
Object.keys(directive).forEach(key => {
  // @ts-ignore
  Vue.directive(key, directive[key]);
});
new Vue({
  el: "#app",
  router,
  //@ts-ignore
  store,
  render: (h:any) => h(App)
})
