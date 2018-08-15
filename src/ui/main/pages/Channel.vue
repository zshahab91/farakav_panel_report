<template>
  <div
    v-if="isReadyData"
    class="page-channel">
    <Navbar
      :title="titlePage"
      @changeTodayDate="changeDateTodayDone"/>
    <b-container>
      <b-row class="no-margin">
        <b-col
          cols="6">
          <TableShow
            :data-extra="extraReport"
            :width="widthVisit"
            title="Show Data Of Total Report"/>
        </b-col>
        <hr>
        <b-col
          cols="6">
          <TableShow
            :data-extra="extraReportVisit"
            :width="widthVisit"
            title="Show Data Of Visits Report"/>
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
              :data="dataReport"
              :category="categoryReport"
              :chart-types-prop="typesChart"
              :title-chart="titleReport"
              unit="%"/>
          </b-col>
          <b-col cols="12">
            <Chart
              :is-filter="false"
              :width="widthChart"
              :data="dataReportVisit "
              :category="categoryReportVisit "
              :chart-types-prop="typesChartVisit "
              :title-chart="titleReportVisit "
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
  name: 'Channel',
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
        section: 'channels'
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
      return this.$store.getters['report/getChannelReport'].readyData
    },
    dataReport () {
      return this.$store.getters['report/getChannelReport'].filter.regOutput
    },
    categoryReport () {
      return this.$store.getters['report/getChannelReport'].filter.regCategory
    },
    extraReport () {
      return this.$store.getters['report/getChannelReport'].table.data
    },
    titleReport () {
      return this.$store.getters['report/getChannelReport'].filter.title
    },
    width () {
      let col
      if (this.$store.getters['report/getChannelReport'].filter.data.length > 4) {
        col = ((100 / 4) - 2)
      } else {
        col = ((100 / this.$store.getters['report/getChannelReport'].filter.data.length * 1) - 2)
      }
      return col
    },
    typesChart () {
      return this.$store.getters['report/getChannelReport'].filter.types
    },
    dataReportVisit () {
      return this.$store.getters['report/getChannelReport'].filter.visits.output
    },
    categoryReportVisit () {
      return this.$store.getters['report/getChannelReport'].filter.visits.category
    },
    extraReportVisit () {
      return this.$store.getters['report/getChannelReport'].table.visits.data
    },
    titleReportVisit () {
      return this.$store.getters['report/getChannelReport'].filter.visits.title
    },
    widthVisit () {
      let col
      if (this.$store.getters['report/getChannelReport'].filter.visits.data.length > 4) {
        col = ((100 / 4) - 2)
      } else {
        col = ((100 / this.$store.getters['report/getChannelReport'].filter.visits.data.length * 1) - 2)
      }
      return col
    },
    typesChartVisit () {
      return this.$store.getters['report/getChannelReport'].filter.visits.types
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
        section: 'channels'
      })
      this.$store.dispatch({
        type: 'report/getReportAction',
        method: 'method',
        section: 'channels'
      })
      this.$store.dispatch({
        type: 'report/getReportActionOneDay',
        method: 'method',
        section: 'channels'
      })
    }
  }

}
</script>

<style scoped>

</style>
