<template>
  <div
    v-if="isReadyData"
    class=" page-category-layout">
    <Navbar
      :title="titlePage"
      @changeTodayDate="changeDateTodayDone"/>
    <b-container>
      <b-row class="no-margin">
        <b-col cols="12">
          <TableShow
            :data-extra="extraReportTotal"
            title="Show Data Of Total Filter Report"
          />
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
          <b-col cols="12">
            <Chart
              :is-filter="false"
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
              :is-filter="false"
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
  name: 'Categorylayout',
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
        section: 'category_layouts'
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
      return this.$store.getters['report/getCategoryReport'].readyData
    },
    dataReportRead () {
      return this.$store.getters['report/getCategoryReport'].filter
    },
    dataReportTotal () {
      return this.$store.getters['report/getCategoryReport'].filter.total.output
    },
    categoryReportTotal () {
      return this.$store.getters['report/getCategoryReport'].filter.total.category
    },
    extraReportTotal () {
      console.log('table is:', this.$store.getters['report/getCategoryReport'].table.total.data)
      return this.$store.getters['report/getCategoryReport'].table.total.data
    },
    titleReportTotal () {
      return this.$store.getters['report/getCategoryReport'].filter.total.title
    },
    width () {
      let col
      if (this.$store.getters['report/getCategoryReport'].filter.total.data.length > 4) {
        col = ((100 / 4) - 2)
      } else {
        col = ((100 / this.$store.getters['report/getCategoryReport'].filter.total.data.length * 1) - 2)
      }
      return col
    },
    typesChartTotal () {
      return this.$store.getters['report/getCategoryReport'].filter.total.types
    },
    charts () {
      return this.$store.getters['report/getCategoryReport'].filter.charts
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
        section: 'category_layouts'
      })
      this.$store.dispatch({
        type: 'report/getReportAction',
        method: 'method',
        section: 'category_layouts'
      })
      this.$store.dispatch({
        type: 'report/getReportActionOneDay',
        method: 'method',
        section: 'category_layouts'
      })
    }
  }
}
</script>
