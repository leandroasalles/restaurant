import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import './assets/css/global.less'
import router from './router'
import 'es6-promise/auto'
import { store } from './store/store'
import VueMask from 'v-mask'

Vue.use(VueMask);
Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  router,
  Vuex,
  store,
  render: h => h(App)
}).$mount('#app')
