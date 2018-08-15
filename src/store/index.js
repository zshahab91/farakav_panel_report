import Vue from 'vue'
import Vuex from 'vuex'
import moduleReport from './modules/report'
import moduleFilter from './modules/filter'

Vue.use(Vuex)

const index = new Vuex.Store({
  modules: {
    report: moduleReport,
    filter: moduleFilter
  }

})

export default index
