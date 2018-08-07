<template>
  <div
    v-if="dataReportTotal"
    class="page page-category-layout">
    <Navbar :title="titlePage"/>
    <b-container class="container-page">
      <b-row class="no-margin">
        <b-col cols="12">
          <Report/>
        </b-col>
        <b-col
          v-if="!isFiltering"
          cols="12">
          <DataShow
            :data-extra="extraReportTotal"
            :width="width"
            title="Show Data Of Total Report"/>
        </b-col>
        <b-col cols="12">
          <Chart
            :width="widthChart"
            :data="dataReportTotal"
            :category="categoryReportTotal"
            :chart-types-prop="typesChartTotal"
            :title-chart="titleReportTotal"
            unit="%"/>
        </b-col>
      </b-row>
      <b-row
        v-for="(chart, index) in charts"
        :key="index"
        class="no-margin">
        <b-col
          v-if="!isFiltering"
          cols="12">
          <DataShow
            :data-extra="chart.data"
            :width="width"
            :title="chart.title"/>
        </b-col>
        <b-col cols="12">
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
  name: 'Categorylayout',
  components: {
    Navbar,
    Report,
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
        type: 'report/getSection',
        section: window.location.pathname.slice(1)
      })
      return this.$route.meta.title
    },
    isFiltering () {
      return this.$store.getters['report/getFiltering']
    },
    dataReportTotal () {
      return this.$store.getters['report/getCategoryReport'].total.output
    },
    categoryReportTotal () {
      return this.$store.getters['report/getCategoryReport'].total.category
    },
    extraReportTotal () {
      return this.$store.getters['report/getCategoryReport'].total.data
    },
    titleReportTotal () {
      return this.$store.getters['report/getCategoryReport'].total.title
    },
    width () {
      let col
      if (this.$store.getters['report/getCategoryReport'].total.data.length > 4) {
        col = ((100 / 4) - 2)
      } else {
        col = ((100 / this.$store.getters['report/getCategoryReport'].total.data.length * 1) - 2)
      }
      return col
    },
    typesChartTotal () {
      return this.$store.getters['report/getCategoryReport'].total.types
    },
    charts () {
      return this.$store.getters['report/getCategoryReport'].charts
    }
  },
  mounted () {
    this.init()
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
