<template>
  <div
    v-if="isReadyData"
    class="page-comment">
    <Navbar
      :title="titlePage"
      @changeTodayDate="changeDateTodayDone"/>
    <b-container>
      <b-row class="no-margin">
        <b-col
          cols="4">
          <TableShow
            :data-extra="extraReportVideo"
            :width="widthVideo"
            title="Video Report"/>
        </b-col>
        <hr>
        <b-col
          cols="4">
          <TableShow
            :data-extra="extraReportChannel"
            :width="widthAuthor"
            title="Channel Report"/>
        </b-col>
        <hr>
        <b-col
          cols="4">
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
          <b-col cols="12">
            <Chart
              :is-filter="false"
              :width="widthChart"
              :data="dataReportChannel"
              :category="categoryReportChannel"
              :chart-types-prop="typesChartChannel"
              :title-chart="titleReportChannel"
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
  name: 'Comment',
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
        section: 'comments'
      })
      return this.$route.meta.title
    },
    isFiltering () {
      return this.$store.getters['filter/getFiltering']
    },
    isReadyData () {
      return this.$store.getters['report/getCommentReport'].readyData
    },
    noResult () {
      return this.$store.getters['report/getResult']
    },
    dataReport () {
      return this.$store.getters['report/getCommentReport'].filter
    },
    dataReportVideo () {
      return this.$store.getters['report/getCommentReport'].filter.video.output
    },
    categoryReportVideo () {
      return this.$store.getters['report/getCommentReport'].filter.video.category
    },
    extraReportVideo () {
      return this.$store.getters['report/getCommentReport'].table.video.data
    },
    titleReportVideo () {
      return this.$store.getters['report/getCommentReport'].filter.video.title
    },
    widthVideo () {
      let col
      if (this.$store.getters['report/getCommentReport'].filter.video.data.length > 4) {
        col = ((100 / 4) - 2)
      } else {
        col = ((100 / this.$store.getters['report/getCommentReport'].filter.video.data.length * 1) - 2)
      }
      return col
    },
    typesChartVideo () {
      return this.$store.getters['report/getCommentReport'].filter.video.types
    },
    dataReportAuthor () {
      return this.$store.getters['report/getCommentReport'].filter.author.output
    },
    categoryReportAuthor () {
      return this.$store.getters['report/getCommentReport'].filter.author.category
    },
    extraReportAuthor () {
      return this.$store.getters['report/getCommentReport'].table.author.data
    },
    titleReportAuthor () {
      return this.$store.getters['report/getCommentReport'].filter.author.title
    },
    widthAuthor () {
      let col
      if (this.$store.getters['report/getCommentReport'].filter.author.data.length > 4) {
        col = ((100 / 4) - 2)
      } else {
        col = ((100 / this.$store.getters['report/getCommentReport'].filter.author.data.length * 1) - 2)
      }
      return col
    },
    typesChartAuthor () {
      return this.$store.getters['report/getCommentReport'].filter.author.types
    },
    dataReportChannel () {
      return this.$store.getters['report/getCommentReport'].filter.channel.output
    },
    categoryReportChannel () {
      return this.$store.getters['report/getCommentReport'].filter.channel.category
    },
    extraReportChannel () {
      return this.$store.getters['report/getCommentReport'].table.channel.data
    },
    titleReportChannel () {
      return this.$store.getters['report/getCommentReport'].filter.channel.title
    },
    widthChannel () {
      let col
      if (this.$store.getters['report/getCommentReport'].filter.channel.data.length > 4) {
        col = ((100 / 4) - 2)
      } else {
        col = ((100 / this.$store.getters['report/getCommentReport'].filter.channel.data.length * 1) - 2)
      }
      return col
    },
    typesChartChannel () {
      return this.$store.getters['report/getCommentReport'].filter.channel.types
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
        section: 'comments'
      })
      this.$store.dispatch({
        type: 'report/getReportAction',
        method: 'method',
        section: 'comments'
      })
      this.$store.dispatch({
        type: 'report/getReportActionOneDay',
        method: 'method',
        section: 'comments'
      })
    }
  }
}
</script>

<style scoped>

</style>
