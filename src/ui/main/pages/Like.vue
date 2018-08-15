<template>
  <div
    v-if="isReadyData"
    class="page-like">
    <Navbar
      :title="titlePage"
      @changeTodayDate="changeDateTodayDone"/>
    <b-container>
      <b-row class="no-margin">
        <b-col
          cols="6">
          <TableShow
            :data-extra="extraReportVideo"
            :width="widthVideo"
            title="Video Report"/>
        </b-col>
        <hr>
        <b-col
          cols="6">
          <TableShow
            :data-extra="extraReportAuthor"
            :width="widthAuthor"
            title="Author Report"/>
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
              :data="dataReportVideo"
              :category="categoryReportVideo"
              :chart-types-prop="typesChartVideo"
              :title-chart="titleReportVideo"
              unit="%"/>
          </b-col>
          <b-col cols="12">
            <Chart
              :is-filter="false"
              :width="widthChart"
              :data="dataReportAuthor"
              :category="categoryReportAuthor"
              :chart-types-prop="typesChartAuthor"
              :title-chart="titleReportAuthor"
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
  name: 'Like',
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
        section: 'likes'
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
      return this.$store.getters['report/getLikeReport'].readyData
    },
    dataReport () {
      return this.$store.getters['report/getLikeReport'].filter
    },
    dataReportVideo () {
      return this.$store.getters['report/getLikeReport'].filter.video.output
    },
    categoryReportVideo () {
      return this.$store.getters['report/getLikeReport'].filter.video.category
    },
    extraReportVideo () {
      return this.$store.getters['report/getLikeReport'].table.video.data
    },
    titleReportVideo () {
      return this.$store.getters['report/getLikeReport'].filter.video.title
    },
    widthVideo () {
      let col
      if (this.$store.getters['report/getLikeReport'].filter.video.data.length > 4) {
        col = ((100 / 4) - 2)
      } else {
        col = ((100 / this.$store.getters['report/getLikeReport'].filter.video.data.length * 1) - 2)
      }
      return col
    },
    typesChartVideo () {
      return this.$store.getters['report/getLikeReport'].filter.video.types
    },
    dataReportAuthor () {
      return this.$store.getters['report/getLikeReport'].filter.author.output
    },
    categoryReportAuthor () {
      return this.$store.getters['report/getLikeReport'].filter.author.category
    },
    extraReportAuthor () {
      return this.$store.getters['report/getLikeReport'].table.author.data
    },
    titleReportAuthor () {
      return this.$store.getters['report/getLikeReport'].filter.author.title
    },
    widthAuthor () {
      let col
      if (this.$store.getters['report/getLikeReport'].filter.author.data.length > 4) {
        col = ((100 / 4) - 2)
      } else {
        col = ((100 / this.$store.getters['report/getLikeReport'].filter.author.data.length * 1) - 2)
      }
      return col
    },
    typesChartAuthor () {
      return this.$store.getters['report/getLikeReport'].filter.author.types
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
        section: 'likes'
      })
      this.$store.dispatch({
        type: 'report/getReportAction',
        method: 'method',
        section: 'likes'
      })
      this.$store.dispatch({
        type: 'report/getReportActionOneDay',
        method: 'method',
        section: 'likes'
      })
    }
  }
}
</script>

<style scoped>

</style>
