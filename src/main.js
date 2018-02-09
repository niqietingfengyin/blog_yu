// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from './assets/js/jquery.min'
import './assets/js/bootstrap.min.js'



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  components : {
    app: App
  },     
  render: h => h(App)
}).$mount('#app')
