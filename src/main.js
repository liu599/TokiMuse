import Vue from 'vue'
import App from './App'
import router from './router'
// Vue.config.productionTip = false

import 'common/stylus/index.styl'

import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import store from './store'

/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'

fastclick.attach(document.body)

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.jpg')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
})
