import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Store from './store'

Vue.config.productionTip = false

Vue.use(Vuetify)

new Vue({
  el: '#app',
  router,
  store: Store,
  components: { App },
  template: '<App/>',
  vuetify: new Vuetify({
    icons: { 
      iconfont: 'mdi'
    }
  })
})
