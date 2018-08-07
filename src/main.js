import Vue from 'vue'
import store from './store'
import router from './ui/main/router/routes'
import BootstrapVue from 'bootstrap-vue'
import HighchartsVue from 'highcharts-vue'
import i18n from './i18n'
import Notify from 'vue-notifyjs'

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'
import App from './ui/main/App.vue'
Vue.use(BootstrapVue)
Vue.use(HighchartsVue)
Vue.use(Notify)
new Vue({
  i18n,
  store: store,
  router,
  render: h => h(App)
}).$mount('#app')
