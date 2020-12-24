import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './utils/lang'

//import element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//import echarts
import echarts from "echarts"
Vue.prototype.$echarts = echarts
// svg
import './icons'
//mock
import './utils/mock'

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
