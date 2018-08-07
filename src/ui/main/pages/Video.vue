<template>
  <div
    v-if="dataReport"
    class="page page-video">
    <Navbar :title="titlePage"/>
    <b-container class="container-page">
      <b-row class="no-margin">
        <b-col cols="12">
          <Report/>
        </b-col>
        <b-col cols="12">
          <Chart
            :data="dataReport"
            :category="categoryReport"
            :chart-types-prop="typesChart"
            :title-chart="titleReport"
            :width="widthChart"
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
            :data="dataReportVisit "
            :category="categoryReportVisit "
            :chart-types-prop="typesChartVisit "
            :title-chart="titleReportVisit "
            :width="widthChart"
            unit="%"/>
        </b-col>
        <hr>
        <b-col
          v-if="!isFiltering"
          cols="12">
          <DataShow
            :data-extra="extraReportChannel"
            :width="widthChannel"
            title="Show Data Of Per Channel Report"/>
        </b-col>
        <b-col cols="12">
          <Chart
            :data="dataReportChannel"
            :category="categoryReportChannel"
            :chart-types-prop="typesChartChannel"
            :title-chart="titleReportChannel"
            :width="widthChart"
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
  name: 'Video',
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
      return this.$store.getters['report/getVideoReport'].statusOutput
    },
    categoryReport () {
      return this.$store.getters['report/getVideoReport'].statusCategory
    },
    extraReport () {
      return this.$store.getters['report/getVideoReport'].data
    },
    titleReport () {
      return this.$store.getters['report/getVideoReport'].title
    },
    width () {
      let col
      if (this.$store.getters['report/getVideoReport'].data.length > 4) {
        col = ((100 / 4) - 2)
      } else {
        col = ((100 / this.$store.getters['report/getVideoReport'].data.length * 1) - 2)
      }
      return col
    },
    typesChart () {
      return this.$store.getters['report/getVideoReport'].types
    },
    dataReportVisit () {
      return this.$store.getters['report/getVideoReport'].visits.output
    },
    categoryReportVisit () {
      return this.$store.getters['report/getVideoReport'].visits.category
    },
    extraReportVisit () {
      return this.$store.getters['report/getVideoReport'].visits.data
    },
    titleReportVisit () {
      return this.$store.getters['report/getVideoReport'].visits.title
    },
    widthVisit () {
      let col
      if (this.$store.getters['report/getVideoReport'].visits.data.length > 4) {
        col = ((100 / 4) - 2)
      } else {
        col = ((100 / this.$store.getters['report/getVideoReport'].visits.data.length * 1) - 2)
      }
      return col
    },
    typesChartVisit () {
      return this.$store.getters['report/getVideoReport'].visits.types
    },
    dataReportChannel () {
      return this.$store.getters['report/getVideoReport'].channel.output
    },
    categoryReportChannel () {
      return this.$store.getters['report/getVideoReport'].channel.category
    },
    extraReportChannel () {
      return this.$store.getters['report/getVideoReport'].channel.data
    },
    titleReportChannel () {
      return this.$store.getters['report/getVideoReport'].channel.title
    },
    widthChannel () {
      let col
      if (this.$store.getters['report/getVideoReport'].channel.data.length > 4) {
        col = ((100 / 4) - 2)
      } else {
        col = ((100 / this.$store.getters['report/getVideoReport'].channel.data.length * 1) - 2)
      }
      return col
    },
    typesChartChannel () {
      return this.$store.getters['report/getVideoReport'].channel.types
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
