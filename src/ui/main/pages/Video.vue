<template>
  <div
    v-if="isReadyData"
    class="page-video">
    <Navbar
      :title="titlePage"
      @changeTodayDate="changeDateTodayDone"/>
    <b-container>
      <span v-if="noResult !== null ">
        <h3>{{ noResult }}</h3>
      </span>
      <span v-else>
        <b-row class="no-margin">
          <b-col
            cols="4">
            <TableShow
              :data-extra="extraReportChannel"
              :width="widthChannel"
              title="Per Channel Report"/>
          </b-col>
          <hr>
          <b-col
            cols="4">
            <TableShow
              :data-extra="extraReportVisit"
              :width="widthVisit"
              title="Visits Report"/>
          </b-col>
          <hr>
          <b-col
            cols="4">
            <TableShow
              :data-extra="extraReportStatus"
              :width="widthVisit"
              title="Status Report"/>
          </b-col>
          <b-col cols="12">
            <FilterDate @change="changeDateDone"/>
          </b-col>
          <b-col cols="12">
            <Chart
              :is-filter="false"
              :data="dataReport"
              :category="categoryReport"
              :chart-types-prop="typesChart"
              :title-chart="titleReport"
              :width="widthChart"
              unit="%"/>
          </b-col>
          <b-col cols="12">
            <Chart
              :is-filter="false"
              :data="dataReportVisit "
              :category="categoryReportVisit "
              :chart-types-prop="typesChartVisit "
              :title-chart="titleReportVisit "
              :width="widthChart"
              unit="%"/>
          </b-col>
          <hr>
          <b-col cols="12">
            <Chart
              :is-filter="false"
              :data="dataReportChannel"
              :category="categoryReportChannel"
              :chart-types-prop="typesChartChannel"
              :title-chart="titleReportChannel"
              :width="widthChart"
              unit="%"/>
          </b-col>
        </b-row>
      </span>
    </b-container>
  </div>

</template>

<script>
import Navbar from '../components/Navbar'
import FilterDate from '../components/Filter'
import Chart from '../components/Chart'
import DataShow from '../components/Datashow'
import TableShow from '../components/Table'
export default {
  name: 'Video',
  components: {
    Navbar,
    FilterDate,
    Chart,
    DataShow,
    TableShow
  },
  data () {
    return {
      widthChart: 100
    }
  },
  computed: {
    titlePage () {
      this.$store.dispatch({
        type: 'filter/setSectionAction',
        section: 'videos'
      })
      return this.$route.meta.title
    },
    noResult () {
      return this.$store.getters['report/getResult']
    },
    isFiltering () {
      return this.$store.getters['filter/getFiltering']
    },
    isReadyData () {
      return this.$store.getters['report/getVideoReport'].readyData
    },
    dataReport () {
      return this.$store.getters['report/getVideoReport'].filter.statusOutput
    },
    categoryReport () {
      return this.$store.getters['report/getVideoReport'].filter.statusCategory
    },
    extraReport () {
      return this.$store.getters['report/getVideoReport'].table.data
    },
    titleReport () {
      return this.$store.getters['report/getVideoReport'].filter.title
    },
    width () {
      let col
      if (this.$store.getters['report/getVideoReport'].filter.data.length > 4) {
        col = ((100 / 4) - 2)
      } else {
        col = ((100 / this.$store.getters['report/getVideoReport'].filter.data.length * 1) - 2)
      }
      return col
    },
    typesChart () {
      return this.$store.getters['report/getVideoReport'].filter.types
    },
    dataReportVisit () {
      return this.$store.getters['report/getVideoReport'].filter.visits.output
    },
    categoryReportVisit () {
      return this.$store.getters['report/getVideoReport'].filter.visits.category
    },
    extraReportVisit () {
      return this.$store.getters['report/getVideoReport'].table.visits.data
    },
    extraReportStatus () {
      return this.$store.getters['report/getVideoReport'].table.data
    },
    titleReportVisit () {
      return this.$store.getters['report/getVideoReport'].filter.visits.title
    },
    widthVisit () {
      let col
      if (this.$store.getters['report/getVideoReport'].filter.visits.data.length > 4) {
        col = ((100 / 4) - 2)
      } else {
        col = ((100 / this.$store.getters['report/getVideoReport'].filter.visits.data.length * 1) - 2)
      }
      return col
    },
    typesChartVisit () {
      return this.$store.getters['report/getVideoReport'].filter.visits.types
    },
    dataReportChannel () {
      return this.$store.getters['report/getVideoReport'].filter.channel.output
    },
    categoryReportChannel () {
      return this.$store.getters['report/getVideoReport'].filter.channel.category
    },
    extraReportChannel () {
      return this.$store.getters['report/getVideoReport'].table.channel.data
    },
    titleReportChannel () {
      return this.$store.getters['report/getVideoReport'].filter.channel.title
    },
    widthChannel () {
      let col
      if (this.$store.getters['report/getVideoReport'].filter.channel.data.length > 4) {
        col = ((100 / 4) - 2)
      } else {
        col = ((100 / this.$store.getters['report/getVideoReport'].filter.channel.data.length * 1) - 2)
      }
      return col
    },
    typesChartChannel () {
      return this.$store.getters['report/getVideoReport'].filter.channel.types
    }
  },
  mounted () {
    this.init()
  },
  created: function () {
    this.$store.dispatch({
      type: 'report/emptyReports',
      method: 'method'
    })
    this.$store.dispatch({
      type: 'report/emptyTable',
      method: 'method'
    })
  },
  methods: {
    changeDateDone (event) {
      this.init()
    },
    changeDateTodayDone () {
      this.init()
    },
    init () {
      this.$store.dispatch({
        type: 'filter/setSectionAction',
        section: 'videos'
      })
      this.$store.dispatch({
        type: 'report/getReportAction',
        method: 'method',
        section: 'videos'
      })
      this.$store.dispatch({
        type: 'report/getReportActionOneDay',
        method: 'method',
        section: 'videos'
      })
    }
  }
}
</script>

<style scoped>

</style>
