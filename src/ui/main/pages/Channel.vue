<template>
  <div
    v-if="dataReport"
    class="page page-channel">
    <Navbar :title="titlePage"/>
    <b-container class="container-page">
      <b-row class="no-margin">
        <b-col cols="12">
          <Report/>
        </b-col>
        <b-col cols="12">
          <Chart
            :width="widthChart"
            :data="dataReport"
            :category="categoryReport"
            :chart-types-prop="typesChart"
            :title-chart="titleReport"
            unit="%"/>
        </b-col>
        <hr>
        <b-col
          v-if="!isFiltering"
          cols="12">
          <DataShow
            :data-extra="extraReportVisit"
            :width="widthVisit"
            title="Show Data Of Visits Report"/>
        </b-col>
        <b-col cols="12">
          <Chart
            :width="widthChart"
            :data="dataReportVisit "
            :category="categoryReportVisit "
            :chart-types-prop="typesChartVisit "
            :title-chart="titleReportVisit "
            unit="%"/>
        </b-col>
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
  name: 'Channel',
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
    dataReport () {
      return this.$store.getters['report/getChannelReport'].regOutput
    },
    categoryReport () {
      return this.$store.getters['report/getChannelReport'].regCategory
    },
    extraReport () {
      return this.$store.getters['report/getChannelReport'].data
    },
    titleReport () {
      return this.$store.getters['report/getChannelReport'].title
    },
    width () {
      let col
      if (this.$store.getters['report/getChannelReport'].data.length > 4) {
        col = ((100 / 4) - 2)
      } else {
        col = ((100 / this.$store.getters['report/getChannelReport'].data.length * 1) - 2)
      }
      return col
    },
    typesChart () {
      return this.$store.getters['report/getChannelReport'].types
    },
    dataReportVisit () {
      return this.$store.getters['report/getChannelReport'].visits.output
    },
    categoryReportVisit () {
      return this.$store.getters['report/getChannelReport'].visits.category
    },
    extraReportVisit () {
      return this.$store.getters['report/getChannelReport'].visits.data
    },
    titleReportVisit () {
      return this.$store.getters['report/getChannelReport'].visits.title
    },
    widthVisit () {
      let col
      if (this.$store.getters['report/getChannelReport'].visits.data.length > 4) {
        col = ((100 / 4) - 2)
      } else {
        col = ((100 / this.$store.getters['report/getChannelReport'].visits.data.length * 1) - 2)
      }
      return col
    },
    typesChartVisit () {
      return this.$store.getters['report/getChannelReport'].visits.types
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

<style scoped>

</style>
