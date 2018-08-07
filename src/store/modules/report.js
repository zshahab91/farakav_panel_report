import { HTTP } from '../../services/http-common'
import { checkRes } from '../../services/validate'
import { filteringWord } from '../../services/characterFilter'
const _ = require('lodash')

const moduleReport = {
  namespaced: true,
  state: {
    reports: [],
    from: null,
    to: null,
    section: null,
    date: null,
    isDate: false,
    isFilter: false,
    noData: false,
    loading: false
  },
  mutations: {
    setDate (state, payload) {
      if (payload.startDate.length === 0 && payload.endDate.length !== 0) {
        state.date = payload.endDate
        state.isDate = true
      } else if (payload.startDate.length !== 0 && payload.endDate.length === 0) {
        state.date = payload.startDate
        state.isDate = true
      } else {
        state.from = payload.startDate
        state.to = payload.endDate
      }
    },
    getEmptyReports: (state) => {
      state.reports = []
      return state.reports
    },
    setSection (state, payload) {
      state.section = payload.section
    },
    getReport (state, payload) {
      state.loading = true
      state.reports = []
      state.isFilter = false
      let params = ''
      const section = payload.section !== null || payload.section !== undefined ? payload.section : null
      _.forOwn(state, (value, key) => {
        if (key !== 'reports' && key !== 'section' && key !== 'isFilter' && key !== 'noData' && key !== 'isDate' && key !== 'loading' && value !== null) {
          let param = key + '=' + value + '&'
          params += param
        }
      })
      if (params !== '') {
        params = '&' + params.slice(0, -1)
      }
      const url = '/reports' + (section !== null ? '?section=' + section + params : '')
      HTTP.get(url)
        .then((res) => {
          if (checkRes(res)) {
            state.from = null
            state.to = null
            state.date = null
            if (res.data.data.length !== 0 || res.data.data.report) {
              if (params.length !== 0 && !state.isDate) {
                state.reports = res.data.data
                state.isFilter = true
              } else {
                state.reports = res.data.data.report
                state.isFilter = false
                state.isDate = false
              }
            } else {
              location.reload()
            }
            state.loading = false
          }
        })
        .catch((err) => {
          state.loading = false
          console.log('err1 is:', err)
          // this.$router.replace('/')
          // window.location.href = '/error'
          return err
        })
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
    getData: (state) => {
      return state.reports
    },
    getLoading: (state) => {
      return state.loading
    },
    getHomeDataPage: (state) => {
      // return state.reports
      let data = []
      let output = []
      let counts = []
      let category = []
      if (state.reports.category_layouts !== undefined) {
        _.forOwn(state.reports, (value, key) => {
          category.push(filteringWord(key))
          if (value.count) {
            data.push({
              name: filteringWord(key),
              data: value.count
            })
            counts.push(value.count)
          } else {
            data.push({
              name: filteringWord(key),
              data: value.total.count
            })
            counts.push(value.total.count)
          }
        })
        output.push({
          name: 'Count',
          data: counts
        })
        const objOutput = {
          output: output,
          category: category,
          data: data,
          title: 'Count',
          unit: ' ',
          types: ['Column']
        }
        return objOutput
      }
    },
    getHomeReport: (state) => {
      let dataExtra = []
      if (state.isFilter && state.reports.length !== undefined) {
        let dates = []
        const output = []
        let min = []
        let avg = []
        let max = []
        let count = []
        _.forOwn(state.reports, (value, key) => {
          dates.push(value.report_date)
          const obj = value.report
          if (obj !== undefined) {
            const changesPercent = obj.changes_percent
            _.forOwn(changesPercent, (value, key) => {
              if (key === 'min') {
                min.push(value)
              }
              if (key === 'max') {
                max.push(value)
              }
              if (key === 'avg') {
                avg.push(value)
              }
            })
            count.push(obj.count)
          }
        })
        dataExtra.push({
          name: 'Count',
          data: count
        })
        output.push({
          name: 'Count',
          data: count
        })
        output.push({
          name: 'Min',
          data: min
        })
        output.push({
          name: 'Max',
          data: max
        })
        output.push({
          name: 'Avg',
          data: avg
        })
        const objOutput = {
          output: output,
          category: dates,
          data: dataExtra,
          title: 'Changes Percent',
          unit: '%',
          types: ['Column']
        }
        return objOutput
      } else {
        const obj = state.reports
        const output = []
        if (obj !== undefined) {
          const changesPercent = obj.changes_percent
          _.forOwn(changesPercent, (value, key) => {
            output.push({
              name: filteringWord(key),
              data: [value]
            })
          })
          output.push({
            name: 'Count',
            data: [obj.count]
          })
          dataExtra = output
        }
        const objOutput = {
          output: output,
          category: ['changesPercent'],
          data: dataExtra,
          title: 'Changes Percent',
          unit: '%',
          types: ['Column']
        }
        return objOutput
      }
    },
    getLikeReport: (state) => {
      const outputPerVideo = []
      const outputPerAuthor = []
      let dataExtraPerVideo = []
      let dataExtraPerAuthor = []
      let dataExtra = []
      if (state.isFilter && state.reports.length !== undefined) {
        let dates = []
        const dataMinVideo = []
        const dataMaxVideo = []
        const dataAvgVideo = []
        const dataMinAuthor = []
        const dataMaxAuthor = []
        const dataAvgAuthor = []
        const count = []
        _.forOwn(state.reports, (value, key) => {
          dates.push(value.report_date)
          const obj = value.report
          if (obj !== undefined) {
            _.forOwn(obj.per_video, (value, key) => {
              if (key === 'min') {
                dataMinVideo.push(value)
              }
              if (key === 'max') {
                dataMaxVideo.push(value)
              }
              if (key === 'avg') {
                dataAvgVideo.push(value)
              }
            })
            _.forOwn(obj.per_author, (value, key) => {
              if (key === 'min') {
                dataMinAuthor.push(value)
              }
              if (key === 'max') {
                dataMaxAuthor.push(value)
              }
              if (key === 'avg') {
                dataAvgAuthor.push(value)
              }
            })
            dataExtra.push({
              name: filteringWord(value.report_date),
              data: obj.count
            })
            count.push(obj.count)
          }
        })
        outputPerAuthor.push({
          name: 'Min',
          data: dataMinAuthor
        })
        outputPerAuthor.push({
          name: 'Max',
          data: dataMaxAuthor
        })
        outputPerAuthor.push({
          name: 'Avg',
          data: dataAvgAuthor
        })
        outputPerVideo.push({
          name: 'Min',
          data: dataMinVideo
        })
        outputPerVideo.push({
          name: 'Max',
          data: dataMaxVideo
        })
        outputPerVideo.push({
          name: 'Avg',
          data: dataAvgVideo
        })
        outputPerAuthor.push({
          name: 'Count',
          data: count
        })
        outputPerVideo.push({
          name: 'Count',
          data: count
        })
        const objOutput = {
          video: {
            output: outputPerVideo,
            category: dates,
            data: dataExtra,
            title: 'Video',
            unit: '%',
            types: ['Column']
          },
          author: {
            output: outputPerAuthor,
            category: dates,
            data: dataExtra,
            title: 'Author',
            unit: '%',
            types: ['Column']
          }
        }
        return objOutput
      } else {
        const obj = state.reports
        if (obj !== undefined) {
          const dataMinVideo = []
          const dataMaxVideo = []
          const dataAvgVideo = []
          const dataMinAuthor = []
          const dataMaxAuthor = []
          const dataAvgAuthor = []
          dataExtra.push({
            name: 'Count',
            data: obj.count
          })
          _.forOwn(obj.per_video, (value, key) => {
            if (key === 'min') {
              dataMinVideo.push(value)
            }
            if (key === 'max') {
              dataMaxVideo.push(value)
            }
            if (key === 'avg') {
              dataAvgVideo.push(value)
            }
          })
          _.forOwn(obj.per_author, (value, key) => {
            if (key === 'min') {
              dataMinAuthor.push(value)
            }
            if (key === 'max') {
              dataMaxAuthor.push(value)
            }
            if (key === 'avg') {
              dataAvgAuthor.push(value)
            }
          })
          outputPerAuthor.push({
            name: 'Min',
            data: dataMinAuthor
          })
          outputPerAuthor.push({
            name: 'Max',
            data: dataMaxAuthor
          })
          outputPerAuthor.push({
            name: 'Avg',
            data: dataAvgAuthor
          })
          outputPerVideo.push({
            name: 'Min',
            data: dataMinVideo
          })
          outputPerVideo.push({
            name: 'Max',
            data: dataMaxVideo
          })
          outputPerVideo.push({
            name: 'Avg',
            data: dataAvgVideo
          })
        }
        dataExtraPerAuthor = outputPerAuthor
        dataExtraPerVideo = outputPerVideo
        const objOutput = {
          video: {
            output: outputPerVideo,
            category: ['Video'],
            data: dataExtraPerVideo,
            title: 'Video',
            unit: '%',
            types: ['Column']
          },
          author: {
            output: outputPerAuthor,
            category: ['Author'],
            data: dataExtraPerAuthor,
            title: 'Author',
            unit: '%',
            types: ['Column']
          }
        }
        return objOutput
      }
    },
    getCommentReport: (state) => {
      const outputPerVideo = []
      const outputPerAuthor = []
      const outputPerChannel = []
      let dataExtraPerVideo = []
      let dataExtraPerAuthor = []
      let dataExtraPerChannel = []
      let dataExtra = []
      if (state.isFilter && state.reports.length !== undefined) {
        let dates = []
        let minChannel = []
        let avgChannel = []
        let maxChannel = []
        let minVideo = []
        let avgVideo = []
        let maxVideo = []
        let minAuthor = []
        let avgAuthor = []
        let maxAuthor = []
        let count = []
        _.forOwn(state.reports, (value, key) => {
          dates.push(value.report_date)
          const obj = value.report
          if (obj !== undefined) {
            _.forOwn(obj.per_channel, (val, key) => {
              if (key === 'min') {
                minChannel.push(val)
              }
              if (key === 'max') {
                maxChannel.push(val)
              }
              if (key === 'avg') {
                avgChannel.push(val)
              }
            })
            _.forOwn(obj.per_author, (val, key) => {
              if (key === 'min') {
                minAuthor.push(val)
              }
              if (key === 'max') {
                maxAuthor.push(val)
              }
              if (key === 'avg') {
                avgAuthor.push(val)
              }
            })
            _.forOwn(obj.per_video, (val, key) => {
              if (key === 'min') {
                minVideo.push(val)
              }
              if (key === 'max') {
                maxVideo.push(val)
              }
              if (key === 'avg') {
                avgVideo.push(val)
              }
            })
            dataExtra.push({
              name: filteringWord(value.report_date),
              data: obj.count
            })
            count.push(obj.count)
          }
        })
        outputPerAuthor.push({
          name: 'Min',
          data: minAuthor
        })
        outputPerAuthor.push({
          name: 'Max',
          data: maxAuthor
        })
        outputPerAuthor.push({
          name: 'Avg',
          data: avgAuthor
        })
        outputPerVideo.push({
          name: 'Min',
          data: minVideo
        })
        outputPerVideo.push({
          name: 'Max',
          data: maxVideo
        })
        outputPerVideo.push({
          name: 'Avg',
          data: avgVideo
        })
        outputPerChannel.push({
          name: 'Min',
          data: minChannel
        })
        outputPerChannel.push({
          name: 'Max',
          data: maxChannel
        })
        outputPerChannel.push({
          name: 'Avg',
          data: avgChannel
        })
        outputPerVideo.push({
          name: 'Count',
          data: count
        })
        outputPerChannel.push({
          name: 'Count',
          data: count
        })
        outputPerAuthor.push({
          name: 'Count',
          data: count
        })
        const objOutput = {
          video: {
            output: outputPerVideo,
            category: dates,
            data: dataExtra,
            title: 'Video',
            unit: '%',
            types: ['Column']
          },
          author: {
            output: outputPerAuthor,
            category: dates,
            data: dataExtra,
            title: 'Author',
            unit: '%',
            types: ['Column']
          },
          channel: {
            output: outputPerChannel,
            category: dates,
            data: dataExtra,
            title: 'Channel',
            unit: '%',
            types: ['Column']
          }
        }
        return objOutput
      } else {
        const obj = state.reports
        if (obj !== undefined) {
          const dataMinVideo = []
          const dataMaxVideo = []
          const dataAvgVideo = []
          const dataMinAuthor = []
          const dataMaxAuthor = []
          const dataAvgAuthor = []
          const dataMinChannel = []
          const dataMaxChannel = []
          const dataAvgChannel = []
          dataExtra.push({
            name: 'Count',
            data: obj.count
          })
          _.forOwn(obj.per_video, (value, key) => {
            if (key === 'min') {
              dataMinVideo.push(value)
            }
            if (key === 'max') {
              dataMaxVideo.push(value)
            }
            if (key === 'avg') {
              dataAvgVideo.push(value)
            }
          })
          _.forOwn(obj.per_author, (value, key) => {
            if (key === 'min') {
              dataMinAuthor.push(value)
            }
            if (key === 'max') {
              dataMaxAuthor.push(value)
            }
            if (key === 'avg') {
              dataAvgAuthor.push(value)
            }
          })
          _.forOwn(obj.per_channel, (value, key) => {
            if (key === 'min') {
              dataMinChannel.push(value)
            }
            if (key === 'max') {
              dataMaxChannel.push(value)
            }
            if (key === 'avg') {
              dataAvgChannel.push(value)
            }
          })
          outputPerAuthor.push({
            name: 'Min',
            data: dataMinAuthor
          })
          outputPerAuthor.push({
            name: 'Max',
            data: dataMaxAuthor
          })
          outputPerAuthor.push({
            name: 'Avg',
            data: dataAvgAuthor
          })
          outputPerVideo.push({
            name: 'Min',
            data: dataMinVideo
          })
          outputPerVideo.push({
            name: 'Max',
            data: dataMaxVideo
          })
          outputPerVideo.push({
            name: 'Avg',
            data: dataAvgVideo
          })
          outputPerChannel.push({
            name: 'Min',
            data: dataMinChannel
          })
          outputPerChannel.push({
            name: 'Max',
            data: dataMaxChannel
          })
          outputPerChannel.push({
            name: 'Avg',
            data: dataAvgChannel
          })
        }
        dataExtraPerAuthor = outputPerAuthor
        dataExtraPerVideo = outputPerVideo
        dataExtraPerChannel = outputPerChannel
        const objOutput = {
          video: {
            output: outputPerVideo,
            category: ['Video'],
            data: dataExtraPerVideo,
            title: 'Video',
            unit: '%',
            types: ['Column']
          },
          author: {
            output: outputPerAuthor,
            category: ['Author'],
            data: dataExtraPerAuthor,
            title: 'Author',
            unit: '%',
            types: ['Column']
          },
          channel: {
            output: outputPerChannel,
            category: ['Channel'],
            data: dataExtraPerChannel,
            title: 'Channel',
            unit: '%',
            types: ['Column']
          }
        }
        return objOutput
      }
    },
    getPlaylistsReport: (state) => {
      const outputTotal = []
      const outputNotEmpty = []
      let dataExtraTotal = []
      let dataExtraNotEmpty = []
      let totalOutput = []
      let notEmptyOutput = []
      let dataExtra = []
      if (state.isFilter && state.reports.length !== undefined) {
        console.log('1')
        let dates = []
        const dataMinTotal = []
        const dataMaxTotal = []
        const dataAvgTotal = []
        const dataMinNotEmpty = []
        const dataMaxNotEmpty = []
        const dataAvgNotEmpty = []
        const countNotEmpty = []
        const countTotal = []
        _.forOwn(state.reports, (value, key) => {
          dates.push(value.report_date)
          const obj = value.report
          if (obj !== undefined) {
            _.forOwn(obj.total.videos, (val, key) => {
              if (key === 'min') {
                dataMinTotal.push(val)
              }
              if (key === 'max') {
                dataMaxTotal.push(val)
              }
              if (key === 'avg') {
                dataAvgTotal.push(val)
              }
            })
            _.forOwn(obj.not_empty.videos, (val, key) => {
              if (key === 'min') {
                dataMinNotEmpty.push(val)
              }
              if (key === 'max') {
                dataMaxNotEmpty.push(val)
              }
              if (key === 'avg') {
                dataAvgNotEmpty.push(val)
              }
            })
            dataExtra.push({
              name: filteringWord(value.report_date),
              data: obj.total.count
            })
            dataExtraNotEmpty.push({
              name: filteringWord(value.report_date),
              data: obj.not_empty.count
            })
            countNotEmpty.push(obj.not_empty.count)
            countTotal.push(obj.total.count)
          }
        })
        totalOutput.push({
          name: 'Min',
          data: dataMinTotal
        })
        totalOutput.push({
          name: 'Max',
          data: dataMaxTotal
        })
        totalOutput.push({
          name: 'Avg',
          data: dataAvgTotal
        })
        notEmptyOutput.push({
          name: 'Min',
          data: dataMinNotEmpty
        })
        notEmptyOutput.push({
          name: 'Max',
          data: dataMaxNotEmpty
        })
        notEmptyOutput.push({
          name: 'Avg',
          data: dataAvgNotEmpty
        })
        notEmptyOutput.push({
          name: 'Count',
          data: countNotEmpty
        })
        totalOutput.push({
          name: 'Count',
          data: countTotal
        })
        const objOutput = {
          total: {
            output: totalOutput,
            category: dates,
            data: dataExtra,
            title: 'Total Video',
            unit: '%',
            types: ['Column']
          },
          notEmpty: {
            output: notEmptyOutput,
            category: dates,
            data: dataExtraNotEmpty,
            title: 'Not Empty Video',
            unit: '%',
            types: ['Column']
          }
        }
        return objOutput
      } else {
        const obj = state.reports
        if (obj !== undefined) {
          if (obj.total) {
            _.forOwn(obj.total.videos, (value, key) => {
              outputTotal.push({
                name: filteringWord(key),
                data: [value]
              })
            })
            outputTotal.push({
              name: 'Count',
              data: [obj.total.count]
            })
            dataExtraTotal = outputTotal
            _.forOwn(obj.not_empty.videos, (value, key) => {
              outputNotEmpty.push({
                name: filteringWord(key),
                data: [value]
              })
            })
            outputNotEmpty.push({
              name: 'Count',
              data: [obj.not_empty.count]
            })
            dataExtraNotEmpty = outputNotEmpty
          }
        }
        const objOutput = {
          total: {
            output: outputTotal,
            category: ['Total Video'],
            data: dataExtraTotal,
            title: 'Total Video',
            unit: '%',
            types: ['Column']
          },
          notEmpty: {
            output: outputNotEmpty,
            category: ['Not Empty Video'],
            data: dataExtraNotEmpty,
            title: 'Not Empty Video',
            unit: '%',
            types: ['Column']
          }
        }
        return objOutput
      }
    },
    getChannelReport: (state) => {
      const output = []
      const regOutput = []
      let dataExtraVisit = []
      let dataExtra = []
      if (state.isFilter && state.reports.length !== undefined) {
        let dates = []
        const output = []
        let min = []
        let avg = []
        let max = []
        let count = []
        let newData
        let registerFlags = []
        newData = state.reports[0].report
        _.forOwn(newData.registration, (val, inx) => {
          registerFlags.push({
            name: inx,
            data: []
          })
        })
        _.forOwn(state.reports, (value, key) => {
          dates.push(value.report_date)
          const obj = value.report
          count.push(obj.count)
          if (obj !== undefined) {
            _.forOwn(obj.visits, (visit, key) => {
              if (key === 'min') {
                min.push(visit)
              }
              if (key === 'max') {
                max.push(visit)
              }
              if (key === 'avg') {
                avg.push(visit)
              }
            })
            //  Registration
            const registration = obj.registration
            _.forOwn(registration, (val, key) => {
              let item = registerFlags.find(function (obj) { return obj.name === key })
              item.data = item.data.concat(val)
            })
            dataExtra.push({
              name: filteringWord(value.report_date),
              data: obj.count
            })
          }
        })
        output.push({
          name: 'Min',
          data: min
        })
        output.push({
          name: 'Max',
          data: max
        })
        output.push({
          name: 'Avg',
          data: avg
        })
        output.push({
          name: 'Count',
          data: count
        })
        const objOutput = {
          regOutput: registerFlags,
          regCategory: dates,
          data: dataExtra,
          title: 'Registration',
          unit: ' ',
          types: ['Column'],
          visits: {
            output: output,
            category: dates,
            data: dataExtra,
            title: 'Visits',
            unit: '%',
            types: ['Column']
          }
        }
        return objOutput
      } else {
        const obj = state.reports
        if (obj !== undefined) {
          const dataMin = []
          const dataMax = []
          const dataAvg = []
          _.forOwn(obj.visits, (value, key) => {
            if (key === 'min') {
              dataMin.push(value)
            }
            if (key === 'max') {
              dataMax.push(value)
            }
            if (key === 'avg') {
              dataAvg.push(value)
            }
          })
          output.push({
            name: 'Min',
            data: dataMin
          })
          output.push({
            name: 'Max',
            data: dataMax
          })
          output.push({
            name: 'Avg',
            data: dataAvg
          })
          output.push({
            name: 'Count',
            data: [obj.count]
          })
          dataExtraVisit = output
          //  Registration
          const registration = obj.registration
          _.forOwn(registration, (value, key) => {
            regOutput.push({
              name: filteringWord(key),
              data: [value]
            })
          })
          dataExtra = regOutput
          dataExtra.push({
            name: 'Count',
            data: obj.count
          })
          dataExtra.push({
            name: 'uploaders',
            data: obj.uploaders
          })
        }
        const objOutput = {
          regOutput: regOutput,
          regCategory: ['Registration'],
          data: dataExtra,
          title: 'Registration',
          unit: ' ',
          types: ['Column'],
          visits: {
            output: output,
            category: ['Visits'],
            data: dataExtraVisit,
            title: 'Visits',
            unit: '%',
            types: ['Column']
          }
        }
        return objOutput
      }
    },
    getVideoReport: (state) => {
      const statusOutput = []
      const visitsOutput = []
      const channelOutput = []
      let dataExtraVisit = []
      let dataExtraChannel = []
      let dataExtra = []
      if (state.isFilter && state.reports.length !== undefined) {
        let dates = []
        const dataMinVisit = []
        const dataMaxVisit = []
        const dataAvgVisit = []
        const dataMinChannel = []
        const dataMaxChannel = []
        const dataAvgChannel = []
        const count = []
        let statusFlags = []
        _.forOwn(state.reports[0].report.per_status, (val, inx) => {
          statusFlags.push({
            name: inx,
            data: []
          })
        })
        _.forOwn(state.reports, (value, key) => {
          dates.push(value.report_date)
          const obj = value.report
          if (obj !== undefined) {
            _.forOwn(obj.per_channel, (val, key) => {
              if (key === 'min') {
                dataMinChannel.push(val)
              }
              if (key === 'max') {
                dataMaxChannel.push(val)
              }
              if (key === 'avg') {
                dataAvgChannel.push(val)
              }
            })
            _.forOwn(obj.visits, (val, key) => {
              if (key === 'min') {
                dataMinVisit.push(val)
              }
              if (key === 'max') {
                dataMaxVisit.push(val)
              }
              if (key === 'avg') {
                dataAvgVisit.push(val)
              }
            })
            //  Registration
            const perStatus = obj.per_status
            _.forOwn(perStatus, (val, key) => {
              let item = statusFlags.find(function (obj) { return obj.name === key })
              item.data = item.data.concat(val)
            })
            dataExtra.push({
              name: filteringWord(value.report_date),
              data: obj.count
            })
            count.push(obj.count)
          }
        })
        visitsOutput.push({
          name: 'Min',
          data: dataMinVisit
        })
        visitsOutput.push({
          name: 'Max',
          data: dataMaxVisit
        })
        visitsOutput.push({
          name: 'Avg',
          data: dataAvgVisit
        })
        channelOutput.push({
          name: 'Min',
          data: dataMinChannel
        })
        channelOutput.push({
          name: 'Max',
          data: dataMaxChannel
        })
        channelOutput.push({
          name: 'Avg',
          data: dataAvgChannel
        })
        channelOutput.push({
          name: 'Count',
          data: count
        })
        visitsOutput.push({
          name: 'Count',
          data: count
        })
        const objOutput = {
          statusOutput: statusFlags,
          statusCategory: dates,
          data: dataExtra,
          title: 'Per Status',
          unit: ' ',
          types: ['Column'],
          visits: {
            output: visitsOutput,
            category: dates,
            data: dataExtra,
            title: 'Visits',
            unit: '%',
            types: ['Column']
          },
          channel: {
            output: channelOutput,
            category: dates,
            data: dataExtra,
            title: 'Channel',
            unit: '%',
            types: ['Column']
          }
        }
        return objOutput
      } else {
        const obj = state.reports
        if (obj !== undefined) {
          const dataMinVisit = []
          const dataMaxVisit = []
          const dataAvgVisit = []
          const dataMinChannel = []
          const dataMaxChannel = []
          const dataAvgChannel = []
          _.forOwn(obj.visits, (value, key) => {
            if (key === 'min') {
              dataMinVisit.push(value)
            }
            if (key === 'max') {
              dataMaxVisit.push(value)
            }
            if (key === 'avg') {
              dataAvgVisit.push(value)
            }
          })
          _.forOwn(obj.per_channel, (value, key) => {
            if (key === 'min') {
              dataMinChannel.push(value)
            }
            if (key === 'max') {
              dataMaxChannel.push(value)
            }
            if (key === 'avg') {
              dataAvgChannel.push(value)
            }
          })
          visitsOutput.push({
            name: 'Min',
            data: dataMinVisit
          })
          visitsOutput.push({
            name: 'Max',
            data: dataMaxVisit
          })
          visitsOutput.push({
            name: 'Avg',
            data: dataAvgVisit
          })
          channelOutput.push({
            name: 'Min',
            data: dataMinChannel
          })
          channelOutput.push({
            name: 'Max',
            data: dataMaxChannel
          })
          channelOutput.push({
            name: 'Avg',
            data: dataAvgChannel
          })
          dataExtraVisit = visitsOutput
          dataExtraChannel = channelOutput
          //  Registration
          const perStatus = obj.per_status
          _.forOwn(perStatus, (value, key) => {
            statusOutput.push({
              name: filteringWord(key),
              data: [value]
            })
          })
          dataExtra = statusOutput
          dataExtra.push({
            name: 'Count',
            data: obj.count
          })
        }
        const objOutput = {
          statusOutput: statusOutput,
          statusCategory: ['PerStatus'],
          data: dataExtra,
          title: 'Per Status',
          unit: ' ',
          types: ['Column'],
          visits: {
            output: visitsOutput,
            category: ['Visits'],
            data: dataExtraVisit,
            title: 'Visits',
            unit: '%',
            types: ['Column']
          },
          channel: {
            output: channelOutput,
            category: ['Channel'],
            data: dataExtraChannel,
            title: 'Channel',
            unit: '%',
            types: ['Column']
          }
        }
        return objOutput
      }
    },
    getCategoryReport: (state) => {
      const outputTotal = []
      const chartsSlugs = []
      const charts = []
      let dataExtra = []
      if (state.isFilter && state.reports.length !== undefined) {
        let dates = []
        const dataMinTotal = []
        const dataMaxTotal = []
        const dataAvgTotal = []
        const dataCountTotal = []
        _.forOwn(state.reports[0].report.per_slug, (val, inx) => {
          chartsSlugs.push({
            name: inx,
            min: [],
            avg: [],
            max: [],
            count: [],
            dataExtra: []
          })
        })
        _.forOwn(state.reports, (value, key) => {
          dates.push(value.report_date)
          const obj = value.report
          if (obj !== undefined) {
            _.forOwn(obj.total.changes_percent, (val, key) => {
              if (key === 'min') {
                dataMinTotal.push(val)
              }
              if (key === 'max') {
                dataMaxTotal.push(val)
              }
              if (key === 'avg') {
                dataAvgTotal.push(val)
              }
            })
            dataCountTotal.push(obj.total.count)
            dataExtra.push({
              name: filteringWord(value.report_date),
              data: obj.total.count
            })
            // Per Slug
            const perSlug = obj.per_slug
            _.forOwn(perSlug, (slugItem, key) => {
              let min = []
              let avg = []
              let max = []
              let count = []
              let dataExtraSlug = []
              const slug = slugItem.changes_percent
              _.forOwn(slug, (val, inx) => {
                if (inx === 'min') {
                  min.push(val)
                }
                if (inx === 'max') {
                  max.push(val)
                }
                if (inx === 'avg') {
                  avg.push(val)
                }
              })
              dataExtraSlug.push({
                name: filteringWord(value.report_date),
                data: slugItem.count
              })
              count.push(slugItem.count)
              let item = chartsSlugs.find(function (obj) { return obj.name === key })
              item.min = item.min.concat(min)
              item.max = item.max.concat(max)
              item.avg = item.avg.concat(avg)
              item.count = item.count.concat(count)
              item.dataExtra = item.dataExtra.concat(dataExtraSlug)
            })
          }
        })
        for (let i = 0; i < chartsSlugs.length; i++) {
          let output = []
          output.push({
            name: 'Min',
            data: chartsSlugs[i].min
          })
          output.push({
            name: 'Max',
            data: chartsSlugs[i].max
          })
          output.push({
            name: 'Avg',
            data: chartsSlugs[i].avg
          })
          output.push({
            name: 'Count',
            data: chartsSlugs[i].count
          })
          charts.push({
            output: output,
            category: dates,
            data: chartsSlugs[i].dataExtra,
            title: chartsSlugs[i].name.toUpperCase(),
            unit: '%',
            types: ['Column']
          })
        }
        outputTotal.push({
          name: 'Min',
          data: dataMinTotal
        })
        outputTotal.push({
          name: 'Max',
          data: dataMaxTotal
        })
        outputTotal.push({
          name: 'Avg',
          data: dataAvgTotal
        })
        outputTotal.push({
          name: 'Count',
          data: dataCountTotal
        })
        const objOutput = {
          total: {
            output: outputTotal,
            category: dates,
            data: dataExtra,
            title: 'Changes Percent',
            unit: '%',
            types: ['Column']
          },
          charts
        }
        return objOutput
      } else {
        const obj = state.reports
        if (obj.total !== undefined) {
          const total = obj.total
          const dataMinTotal = []
          const dataMaxTotal = []
          const dataAvgTotal = []
          _.forOwn(total.changes_percent, (value, key) => {
            if (key === 'min') {
              dataMinTotal.push(value)
            }
            if (key === 'max') {
              dataMaxTotal.push(value)
            }
            if (key === 'avg') {
              dataAvgTotal.push(value)
            }
          })
          outputTotal.push({
            name: 'Min',
            data: dataMinTotal
          })
          outputTotal.push({
            name: 'Max',
            data: dataMaxTotal
          })
          outputTotal.push({
            name: 'Avg',
            data: dataAvgTotal
          })
          outputTotal.push({
            name: 'Count',
            data: [total.count]
          })
          dataExtra.push({
            name: 'Min',
            data: Math.min(...dataMinTotal)
          })
          dataExtra.push({
            name: 'Max',
            data: Math.max(...dataMaxTotal)
          })
          dataExtra.push({
            name: 'Avg',
            data: (Math.max(...dataMaxTotal) + Math.min(...dataMinTotal)) / 2
          })
          dataExtra.push({
            name: 'Count',
            data: total.count
          })
          //  Per Slug
          const perSlug = obj.per_slug
          _.forOwn(perSlug, (value, key) => {
            let category = []
            let output = []
            let dataExtraSlug = []
            category.push(key.toUpperCase())
            output.push({
              name: 'Avg',
              data: [value.changes_percent.avg]
            })
            output.push({
              name: 'Min',
              data: [value.changes_percent.min]
            })
            output.push({
              name: 'Max',
              data: [value.changes_percent.max]
            })
            output.push({
              name: 'Count',
              data: [value.count]
            })
            dataExtraSlug = output
            charts.push({
              output: output,
              category: category,
              data: dataExtraSlug,
              title: filteringWord(key),
              unit: '%',
              types: ['Column']
            })
          })
        }
        const objOutput = {
          total: {
            output: outputTotal,
            category: ['Changes Percent'],
            data: dataExtra,
            title: 'Changes Percent',
            unit: '%',
            types: ['Column']
          },
          charts
        }
        return objOutput
      }
    },
    getTaskReport: (state) => {
      const outputTotal = []
      const dataExtra = []
      const dataExtraTypes = []
      const categoryTotal = []
      const objOutputFilter = []
      // const chartsTypes = []
      const totalTypes = []
      const charts = []
      const chartsTotal = []
      const perTypesObj = []
      if (state.isFilter && state.reports.length !== undefined) {
        let dates = []
        _.forOwn(state.reports[0].report.total.per_state, (val, inx) => {
          totalTypes.push({
            name: inx,
            min: [],
            avg: [],
            max: [],
            count: []
          })
        })
        _.forOwn(state.reports, (value, key) => {
          const itemTask = value.report
          dates.push(value.report_date)
          // Start Total
          let total = itemTask.total
          dataExtra.push({
            name: 'Count',
            data: total.count
          })
          _.forOwn(total.per_state, (totalState, i) => {
            let min = []
            let avg = []
            let max = []
            let count = []
            min.push(totalState['execution_time'].min)
            max.push(totalState['execution_time'].max)
            avg.push(totalState['execution_time'].avg)
            let item = totalTypes.find(function (obj) { return obj.name === i })
            item.min = item.min.concat(min)
            item.max = item.max.concat(max)
            item.avg = item.avg.concat(avg)
            item.count = item.avg.concat(count)
          })
          // Start Per Type
          let perTypes = itemTask.per_type
          _.forOwn(perTypes, (type, inx) => {
            if (!perTypesObj.find(function (obj) { return obj.name === inx })) {
              let chart = []
              dataExtraTypes.push({
                name: 'Count',
                data: type.count
              })
              _.forOwn(type.per_state, (val, j) => {
                let min = []
                let avg = []
                let max = []
                let count = []
                min.push(val['execution_time'].min)
                max.push(val['execution_time'].max)
                avg.push(val['execution_time'].avg)
                count.push(val['execution_time'].count)
                chart.push({
                  name: j,
                  min: min,
                  avg: avg,
                  max: max,
                  count: count
                })
              })
              perTypesObj.push({
                name: inx,
                obj: type,
                chart: chart
              })
            } else {
              let item = perTypesObj.find(function (obj) { return obj.name === inx })
              _.forOwn(type.per_state, (val, j) => {
                if (item.chart.find(function (obj) { return obj.name === j })) {
                  let itemChart = item.chart.find(function (obj) { return obj.name === j })
                  itemChart.min.push(val['execution_time'].min)
                  itemChart.max.push(val['execution_time'].max)
                  itemChart.avg.push(val['execution_time'].avg)
                  itemChart.count.push(val['execution_time'].count)
                }
              })
            }
          })
        })
        for (let i = 0; i < perTypesObj.length; i++) {
          let charts = []
          for (let j = 0; j < perTypesObj[i].chart.length; j++) {
            let output = []
            let nameChart
            output.push({
              name: 'Min',
              data: perTypesObj[i].chart[j].min
            })
            output.push({
              name: 'Max',
              data: perTypesObj[i].chart[j].max
            })
            output.push({
              name: 'Avg',
              data: perTypesObj[i].chart[j].avg
            })
            output.push({
              name: 'Count',
              data: perTypesObj[i].chart[j].count
            })
            nameChart = perTypesObj[i].chart[j].name.toUpperCase()
            charts.push({
              output: output,
              category: dates,
              data: dataExtraTypes,
              title: nameChart,
              unit: '%',
              types: ['Column']
            })
          }
          objOutputFilter.push({
            titleChart: perTypesObj[i].name.toUpperCase(),
            charts: charts
          })
        }
        for (let i = 0; i < totalTypes.length; i++) {
          let output = []
          let nameChart
          output.push({
            name: 'Min',
            data: totalTypes[i].min
          })
          output.push({
            name: 'Max',
            data: totalTypes[i].max
          })
          output.push({
            name: 'Avg',
            data: totalTypes[i].avg
          })
          output.push({
            name: 'Count',
            data: totalTypes[i].count
          })
          nameChart = totalTypes[i].name.toUpperCase()
          chartsTotal.push({
            output: output,
            category: dates,
            data: dataExtra,
            title: nameChart,
            unit: '%',
            types: ['Column']
          })
        }
        objOutputFilter.push({
          titleChart: 'Total Data',
          charts: chartsTotal
        })
        const objOutput = {
          objOutputFilter
        }
        return objOutput
      } else {
        const obj = state.reports
        if (obj.total !== undefined) {
          const total = obj.total
          const perType = obj.per_type
          const totalPerState = obj.total.per_state
          const attr = []
          Object.keys(totalPerState).forEach((key) => {
            attr.push(totalPerState[key])
            categoryTotal.push(filteringWord(key))
          })
          const dataMin = []
          const dataMax = []
          const dataAvg = []
          const count = []
          for (let i = 0; i < attr.length; i++) {
            Object.keys(attr[i]['execution_time']).forEach((key) => {
              count.push(attr[i].count)
              if (key === 'min') {
                dataMin.push(attr[i]['execution_time'][key])
              }
              if (key === 'max') {
                dataMax.push(attr[i]['execution_time'][key])
              }
              if (key === 'avg') {
                dataAvg.push(attr[i]['execution_time'][key])
              }
            })
          }
          outputTotal.push({
            name: 'Min',
            data: dataMin
          })
          outputTotal.push({
            name: 'Max',
            data: dataMax
          })
          outputTotal.push({
            name: 'Avg',
            data: dataAvg
          })
          // outputTotal.push({
          //   name: 'Count',
          //   data: count
          // })
          dataExtra.push({
            name: 'Min',
            data: Math.min(...dataMin)
          })
          dataExtra.push({
            name: 'Max',
            data: Math.max(...dataMax)
          })
          dataExtra.push({
            name: 'Avg',
            data: (Math.max(...dataMax) + Math.min(...dataMin)) / 2
          })
          dataExtra.push({
            name: 'Count',
            data: total.count
          })
          // let arrayCategory = []
          // Per Type
          _.forOwn(perType, (value, key) => {
            let perState = value.per_state
            let category = []
            let min = []
            let max = []
            let avg = []
            let output = []
            let dataExtraState = []
            _.forOwn(perState, (val, inx) => {
              category.push(inx.toUpperCase())
              min.push(val['execution_time']['min'])
              avg.push(val['execution_time']['avg'])
              max.push(val['execution_time']['max'])
            })
            output.push({
              name: 'Min',
              data: min
            })
            output.push({
              name: 'Max',
              data: max
            })
            output.push({
              name: 'Avg',
              data: avg
            })
            dataExtraState.push({
              name: 'Min',
              data: Math.min(...min)
            })
            dataExtraState.push({
              name: 'Max',
              data: Math.max(...max)
            })
            dataExtraState.push({
              name: 'Avg',
              data: (Math.max(...max) + Math.min(...min)) / 2
            })
            dataExtraState.push({
              name: 'Count',
              data: value.count
            })
            charts.push({
              output: output,
              category: category,
              data: dataExtraState,
              title: filteringWord(key),
              unit: '%',
              types: ['Column']
            })
          })
        }
        const objOutput = {
          total: {
            output: outputTotal,
            category: categoryTotal,
            data: dataExtra,
            title: 'Per State',
            unit: '%',
            types: ['Column']
          },
          charts
        }
        return objOutput
      }
    }
  },
  actions: {
    getDate ({commit}, payload) {
      commit({
        type: 'setDate',
        startDate: payload.startDate,
        endDate: payload.endDate
      })
    },
    getSection ({commit}, payload) {
      commit({
        type: 'setSection',
        section: payload.section
      })
    },
    emptyReports ({commit}) {
      commit('getEmptyReports')
    },
    getReportAction ({commit}, payload) {
      commit({
        type: 'getReport',
        method: payload.method,
        section: payload.section
      })
    }
  }
}

export default moduleReport
