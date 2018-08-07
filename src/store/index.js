import Vue from 'vue'
import Vuex from 'vuex'
import moduleReport from './modules/report'

Vue.use(Vuex)

const index = new Vuex.Store({
  modules: {
    report: moduleReport
  }

})

export default index
