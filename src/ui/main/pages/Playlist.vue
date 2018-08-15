<template>
  <div
    v-if="isReadyData"
    class="page-playlist">
    <Navbar
      :title="titlePage"
      @changeTodayDate="changeDateTodayDone"/>
    <b-container>
      <b-row class="no-margin">
        <b-col
          cols="6">
          <TableShow
            :data-extra="extraReport"
            :width="width"
            title="Total Playlist Report"/>
        </b-col>
        <hr>
        <b-col
          cols="6">
          <TableShow
            :data-extra="extraReportNotEmpty"
            :width="widthNotEmpty"
            title="Not Empty Playlist Report"/>
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
              :data="dataReportNotEmpty"
              :category="categoryReportNotEmpty"
              :chart-types-prop="typesChartNotEmpty"
              :title-chart="titleReportNotEmpty"
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
  name: 'Playlist',
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
        section: 'playlists'
      })
      return this.$route.meta.title
    },
    noResult () {
      return this.$store.getters['report/getResult']
    },
    isReadyData () {
      return this.$store.getters['report/getPlaylistsReport'].readyData
    },
    dataReportRead () {
      return this.$store.getters['report/getPlaylistsReport'].filter
    },
    dataReport () {
      return this.$store.getters['report/getPlaylistsReport'].filter.total.output
    },
    isFiltering () {
      return this.$store.getters['filter/getFiltering']
    },
    categoryReport () {
      return this.$store.getters['report/getPlaylistsReport'].filter.total.category
    },
    extraReport () {
      return this.$store.getters['report/getPlaylistsReport'].table.total.data
    },
    titleReport () {
      return this.$store.getters['report/getPlaylistsReport'].filter.total.title
    },
    width () {
      let col
      if (this.$store.getters['report/getPlaylistsReport'].filter.total.data.length > 4) {
        col = ((100 / 4) - 2)
      } else {
        col = ((100 / this.$store.getters['report/getPlaylistsReport'].filter.total.data.length * 1) - 2)
      }
      return col
    },
    typesChart () {
      return this.$store.getters['report/getPlaylistsReport'].filter.total.types
    },
    dataReportNotEmpty () {
      return this.$store.getters['report/getPlaylistsReport'].filter.notEmpty.output
    },
    categoryReportNotEmpty () {
      return this.$store.getters['report/getPlaylistsReport'].filter.notEmpty.category
    },
    extraReportNotEmpty () {
      return this.$store.getters['report/getPlaylistsReport'].table.notEmpty.data
    },
    titleReportNotEmpty () {
      return this.$store.getters['report/getPlaylistsReport'].filter.notEmpty.title
    },
    widthNotEmpty () {
      let col
      if (this.$store.getters['report/getPlaylistsReport'].filter.notEmpty.data.length > 4) {
        col = ((100 / 4) - 2)
      } else {
        col = ((100 / this.$store.getters['report/getPlaylistsReport'].filter.notEmpty.data.length * 1) - 2)
      }
      return col
    },
    typesChartNotEmpty () {
      return this.$store.getters['report/getPlaylistsReport'].filter.notEmpty.types
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
        section: 'playlists'
      })
      this.$store.dispatch({
        type: 'report/getReportAction',
        method: 'method',
        section: 'playlists'
      })
      this.$store.dispatch({
        type: 'report/getReportActionOneDay',
        method: 'method',
        section: 'playlists'
      })
    }
  }
}
</script>

<style scoped>

</style>
