import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VeeValidate from 'vee-validate'
import VueResource from 'vue-resource'
Vue.use(VeeValidate)
Vue.use(VueResource)
Vue.config.productionTip = false

// Vue.http.headers.common['X-Api-Key'] = '969278fe3e884418af4bdbbbab4549da';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
