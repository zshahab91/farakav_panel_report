<template>
  <div
    v-if="dataReport"
    class="page page-playlist">
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
            :data-extra="extraReport"
            :width="width"
            title="Show Data Of Total Playlist Report"/>
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
            :data-extra="extraReportNotEmpty"
            :width="widthNotEmpty"
            title="Show Data Of Not Empty Playlist Report"/>
        </b-col>
        <b-col cols="12">
          <Chart
            :width="widthChart"
            :data="dataReportNotEmpty"
            :category="categoryReportNotEmpty"
            :chart-types-prop="typesChartNotEmpty"
            :title-chart="titleReportNotEmpty"
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
  name: 'Playlist',
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
    dataReport () {
      return this.$store.getters['report/getPlaylistsReport'].total.output
    },
    isFiltering () {
      return this.$store.getters['report/getFiltering']
    },
    categoryReport () {
      return this.$store.getters['report/getPlaylistsReport'].total.category
    },
    extraReport () {
      return this.$store.getters['report/getPlaylistsReport'].total.data
    },
    titleReport () {
      return this.$store.getters['report/getPlaylistsReport'].total.title
    },
    width () {
      let col
      if (this.$store.getters['report/getPlaylistsReport'].total.data.length > 4) {
        col = ((100 / 4) - 2)
      } else {
        col = ((100 / this.$store.getters['report/getPlaylistsReport'].total.data.length * 1) - 2)
      }
      return col
    },
    typesChart () {
      return this.$store.getters['report/getPlaylistsReport'].total.types
    },
    dataReportNotEmpty () {
      return this.$store.getters['report/getPlaylistsReport'].notEmpty.output
    },
    categoryReportNotEmpty () {
      return this.$store.getters['report/getPlaylistsReport'].notEmpty.category
    },
    extraReportNotEmpty () {
      return this.$store.getters['report/getPlaylistsReport'].notEmpty.data
    },
    titleReportNotEmpty () {
      return this.$store.getters['report/getPlaylistsReport'].notEmpty.title
    },
    widthNotEmpty () {
      let col
      if (this.$store.getters['report/getPlaylistsReport'].notEmpty.data.length > 4) {
        col = ((100 / 4) - 2)
      } else {
        col = ((100 / this.$store.getters['report/getPlaylistsReport'].notEmpty.data.length * 1) - 2)
      }
      return col
    },
    typesChartNotEmpty () {
      return this.$store.getters['report/getPlaylistsReport'].notEmpty.types
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
        type: 'report/emptyReports',
        method: 'method'
      })
      setTimeout(() => {
        this.$store.dispatch({
          type: 'report/getReportAction',
          method: 'method',
          section: window.location.pathname.slice(1)
        })
      }, 200)
    }
  }
}
</script>

<style scoped>

</style>
