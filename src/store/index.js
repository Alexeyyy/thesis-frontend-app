import Vue from 'vue'
import Vuex from 'vuex'
import alpha from './alpha'
import common from './common'
import task from './task'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: { alpha, common, task }
})