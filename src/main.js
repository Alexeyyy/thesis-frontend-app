import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Store from './store'
import skillsList from '@/components/SkillsList.vue'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.component('skills-list', skillsList)

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
