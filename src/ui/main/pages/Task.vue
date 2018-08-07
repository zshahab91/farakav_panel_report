<template>
  <div
    v-if="charts || chartsTotal"
    class="page page-task">
    <Navbar :title="titlePage"/>
    <b-container
      class="container-page">
      <b-row
        class="no-margin">
        <b-col cols="12">
          <Report/>
        </b-col>
        <b-col
          v-if="!isFiltering"
          cols="12">
          <DataShow
            :data-extra="extraReport"
            :width="width"
            title="Show Data Of HomePage Layout Report"/>
        </b-col>
        <b-col
          v-if="!isFiltering"
          cols="12">
          <Chart
            :width="widthChart"
            :data="dataReport"
            :category="categoryReport"
            :chart-types-prop="typesChart"
            :title-chart="titleReport"
            unit="%"/>
        </b-col>
      </b-row>
      <span class="title-chart-detail">
        <h4>{{ $t('message.detailData') }} :</h4>
        <b-row
          v-for="(chart, index) in charts"
          :key="index"
          class="no-margin">
          <b-col
            v-if="!isFiltering"
            cols="12">
            <DataShow
              :data-extra="chart.data"
              :width="widthChartData"
              :title="chart.title"/>
          </b-col>
          <b-col
            v-if="!isFiltering"
            cols="12">
            <Chart
              :width="widthChart"
              :data="chart.output"
              :category="chart.category"
              :chart-types-prop="chart.types"
              :title-chart="chart.title"
              unit="%"/>
          </b-col>
          <hr>
        </b-row>
      </span>
      <span
        v-if="isFiltering"
        class="title-chart">
        <b-col
          v-for="(chartObj, index) in chartsTotal"
          :key="index"
          class="no-margin"
          cols="12">
          <h6> {{ chartObj.titleChart }} :</h6>
          <div
            v-for="(chart, inx) in chartObj.charts"
            :key="inx"
            :style="{ width: widthChartFilter + '%' }"
            class="show-detail-report">
            <Chart
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
    </b-container>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Report from '../components/Reports'
import Chart from '../components/Chart'
import DataShow from '../components/Datashow'
import TableShow from '../components/Table'
export default {
  name: 'Task',
  components: {
    Navbar,
    Report,
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
      return this.$route.meta.title
    },
    isFiltering () {
      return this.$store.getters['report/getFiltering']
    },
    dataReport () {
      return this.$store.getters['report/getTaskReport'].total.output
    },
    categoryReport () {
      return this.$store.getters['report/getTaskReport'].total.category
    },
    extraReport () {
      return this.$store.getters['report/getTaskReport'].total.data
    },
    titleReport () {
      return this.$store.getters['report/getTaskReport'].total.title
    },
    width () {
      let col
      if (this.$store.getters['report/getTaskReport'].total.data.length > 4) {
        col = ((100 / 4) - 2)
      } else {
        col = ((100 / this.$store.getters['report/getTaskReport'].total.data.length * 1) - 2)
      }
      return col
    },
    typesChart () {
      return this.$store.getters['report/getTaskReport'].total.types
    },
    charts () {
      return this.$store.getters['report/getTaskReport'].charts
    },
    chartsTotal () {
      return this.$store.getters['report/getTaskReport'].objOutputFilter
    }
  },
  mounted () {
    // this.init()
  },
  created: function () {
    this.$store.dispatch({
      type: 'report/emptyReports',
      method: 'method'
    })
    this.$store.dispatch({
      type: 'report/getReportAction',
      method: 'method',
      section: window.location.pathname.slice(1)
    })
  },
  methods: {
    init () {
      this.$store.dispatch({
        type: 'report/getReportAction',
        method: 'method',
        section: window.location.pathname.slice(1)
      })
    }
  }
}
</script>

<style scoped>

</style>
