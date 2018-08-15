<template>
  <div
    v-if="isReadyData"
    class="page-task">
    <Navbar
      :title="titlePage"
      @changeTodayDate="changeDateTodayDone"/>
    <b-container>
      <b-row>
        <b-col
          cols="12">
          <TableShow
            :data-extra="extraReport"
            :width="width"
            title="Total Report"/>
        </b-col>
        <b-col
          v-for="(chart, index) in chartsTable"
          :key="index"
          cols="4">
          <TableShow
            :data-extra="chart.data"
            :title="chart.title"/>
        </b-col>
        <b-col cols="12">
          <FilterDate @change="changeDateDone"/>
        </b-col>
      </b-row>
      <span v-if="noResult !== null ">
        <h3>{{ noResult }}</h3>
      </span>
      <span v-else>
        <b-row class="no-margin">
          <b-col
            v-if="!isFiltering"
            cols="12">
            <Chart
              :is-filter="false"
              :width="widthChart"
              :data="dataReport"
              :category="categoryReport"
              :chart-types-prop="typesChart"
              :title-chart="titleReport"
              unit="%"/>
          </b-col>
        </b-row>
        <span
          v-if="isFiltering"
          class="title-chart">
          <b-col
            v-for="(chartObj, index) in chartsTotal"
            :key="index"
            class="p-0"
            cols="12">
            <h6> {{ chartObj.titleChart }} :</h6>
            <div
              v-for="(chart, inx) in chartObj.charts"
              :key="inx"
              class="show-detail-report"
              cols="12">
              <Chart
                :is-filter="true"
                :width="widthChart"
                :data="chart.output"
                :category="chart.category"
                :chart-types-prop="chart.types"
                :title-chart="chart.title"
                unit="%"/>
            </div>
            <hr>
          </b-col>
        </span>
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
  name: 'Task',
  components: {
    Navbar,
    FilterDate,
    Chart,
    DataShow,
    TableShow
  },
  data () {
    return {
      widthChart: 100,
      widthChartFilter: 33,
      widthChartData: 23
    }
  },
  computed: {
    titlePage () {
      this.$store.dispatch({
        type: 'filter/setSectionAction',
        section: 'tasks'
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
      return this.$store.getters['report/getTaskReport'].readyData
    },
    dataReport () {
      return this.$store.getters['report/getTaskReport'].filter.objOutputFilter.total.output
    },
    categoryReport () {
      return this.$store.getters['report/getTaskReport'].table.total.category
    },
    extraReport () {
      return this.$store.getters['report/getTaskReport'].table.total.data
    },
    titleReport () {
      return this.$store.getters['report/getTaskReport'].table.total.title
    },
    width () {
      let col
      if (this.$store.getters['report/getTaskReport'].table.total.data.length > 4) {
        col = ((100 / 4) - 2)
      } else {
        col = ((100 / this.$store.getters['report/getTaskReport'].table.total.data.length * 1) - 2)
      }
      return col
    },
    typesChart () {
      return this.$store.getters['report/getTaskReport'].table.total.types
    },
    charts () {
      return this.$store.getters['report/getTaskReport'].table.charts
    },
    chartsTable () {
      return this.$store.getters['report/getTaskReport'].table.charts
    },
    chartsTotal () {
      return this.$store.getters['report/getTaskReport'].filter.objOutputFilter
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
        section: 'tasks'
      })
      this.$store.dispatch({
        type: 'report/getReportAction',
        method: 'method',
        section: 'tasks'
      })
      this.$store.dispatch({
        type: 'report/getReportActionOneDay',
        method: 'method',
        section: 'tasks'
      })
    }
  }
}
</script>

<style scoped>

</style>
