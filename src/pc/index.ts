import Vue from 'vue';
import router from './router/index'
import store from './store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue' // 引入 APP 页面组建
import directive from '@/common/directives'; //注册全局自定义指令
import '@/pc/static/styles/common.css';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
Vue.use(ElementUI);
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
