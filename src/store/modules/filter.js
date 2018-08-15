import { setDefaultDate } from '../../services/setDefaultDate'
const _ = require('lodash')

const moduleFilter = {
  namespaced: true,
  state: {
    from: setDefaultDate().from,
    to: setDefaultDate().to,
    section: null,
    date: setDefaultDate().date,
    isDate: false,
    isFilter: false,
    params: '',
    url: null
  },
  mutations: {
    setDate: (state, payload) => {
      localStorage.setItem('from', payload.startDate)
      localStorage.setItem('to', payload.endDate)
      state.from = payload.startDate
      state.to = payload.endDate
      // if ((payload.startDate.length === 0) && payload.endDate.length !== 0) {
      //   state.date = payload.endDate
      //   state.isDate = true
      // } else if (payload.startDate.length !== 0 && (payload.endDate.length === 0)) {
      //   state.date = payload.startDate
      //   state.isDate = true
      // } else if ((payload.startDate.length === 0 && payload.endDate.length === 0) || (payload.startDate.length !== 0 && payload.endDate.length !== 0)) {
      //   state.from = payload.startDate
      //   state.to = payload.endDate
      //   // state.date = ''
      //   state.isDate = false
      //   state.reports = []
      // }
    },
    setDateToday: (state, payload) => {
      state.date = payload.date
      localStorage.setItem('date', payload.date)
    },
    setSection (state, payload) {
      state.section = payload.section
    },
    setParams (state) {
      if (state.params !== '') {
        state.params = ''
      }
      _.forOwn(state, (value, key) => {
        if (key !== 'section' && key !== 'isFilter' && key !== 'isDate' && key !== 'reports' && key !== 'url' && key !== 'params' && key !== 'date' & value !== null && value !== '') {
          let param = key + '=' + value + '&'
          state.params += param
        }
      })
      const section = state.section !== null || state.section !== undefined ? state.section : null
      const url = '/reports' + (section !== null ? '?section=' + section + (state.params !== '' ? '&' + state.params : '') : '')
      if (url.slice(-1) === '&') {
        state.url = url.slice(0, -1)
      } else {
        state.url = url
      }
    }
  },
  getters: {
    getFiltering: (state) => {
      let flag = false
      if (!state.isDate && state.isFilter) {
        flag = true
      } else if (state.isDate && state.isFilter) {
        flag = false
      }
      return flag
    },
    getStartDateRange: (state) => {
      return state.from
    },
    getEndDateRange: (state) => {
      return state.to
    },
    getSection: (state) => {
      return state.section
    }
  },
  actions: {
    setDateAction ({commit}, payload) {
      commit({
        type: 'setDate',
        startDate: payload.startDate,
        endDate: payload.endDate
      })
      commit({
        type: 'setParams'
      })
    },
    setDateTodayAction ({commit}, payload) {
      commit({
        type: 'setDateToday',
        date: payload.date
      })
    },
    setSectionAction ({commit}, payload) {
      commit({
        type: 'setSection',
        section: payload.section
      })
      commit({
        type: 'setParams'
      })
    }
  }
}
export default moduleFilter
