<template>
  <div
    v-if="dataReportVideo"
    class="page page-comment">
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
            :data-extra="extraReportVideo"
            :width="widthVideo"
            title="Show Data Of Video Report"/>
        </b-col>
        <b-col cols="12">
          <Chart
            :width="widthChart"
            :data="dataReportVideo"
            :category="categoryReportVideo"
            :chart-types-prop="typesChartVideo"
            :title-chart="titleReportVideo"
            unit="%"/>
        </b-col>
        <hr>
        <b-col
          v-if="!isFiltering"
          cols="12">
          <DataShow
            :data-extra="extraReportAuthor"
            :width="widthAuthor"
            title="Show Data Of Author Report"/>
        </b-col>
        <b-col cols="12">
          <Chart
            :width="widthChart"
            :data="dataReportAuthor"
            :category="categoryReportAuthor"
            :chart-types-prop="typesChartAuthor"
            :title-chart="titleReportAuthor"
            unit="%"/>
        </b-col>
        <hr>
        <b-col
          v-if="!isFiltering"
          cols="12">
          <DataShow
            :data-extra="extraReportChannel"
            :width="widthAuthor"
            title="Show Data Of Channel Report"/>
        </b-col>
        <b-col cols="12">
          <Chart
            :width="widthChart"
            :data="dataReportChannel"
            :category="categoryReportChannel"
            :chart-types-prop="typesChartChannel"
            :title-chart="titleReportChannel"
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
  name: 'Comment',
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
    dataReportVideo () {
      return this.$store.getters['report/getCommentReport'].video.output
    },
    categoryReportVideo () {
      return this.$store.getters['report/getCommentReport'].video.category
    },
    extraReportVideo () {
      return this.$store.getters['report/getCommentReport'].video.data
    },
    titleReportVideo () {
      return this.$store.getters['report/getCommentReport'].video.title
    },
    widthVideo () {
      let col
      if (this.$store.getters['report/getCommentReport'].video.data.length > 4) {
        col = ((100 / 4) - 2)
      } else {
        col = ((100 / this.$store.getters['report/getCommentReport'].video.data.length * 1) - 2)
      }
      return col
    },
    typesChartVideo () {
      return this.$store.getters['report/getCommentReport'].video.types
    },
    dataReportAuthor () {
      return this.$store.getters['report/getCommentReport'].author.output
    },
    categoryReportAuthor () {
      return this.$store.getters['report/getCommentReport'].author.category
    },
    extraReportAuthor () {
      return this.$store.getters['report/getCommentReport'].author.data
    },
    titleReportAuthor () {
      return this.$store.getters['report/getCommentReport'].author.title
    },
    widthAuthor () {
      let col
      if (this.$store.getters['report/getCommentReport'].author.data.length > 4) {
        col = ((100 / 4) - 2)
      } else {
        col = ((100 / this.$store.getters['report/getCommentReport'].author.data.length * 1) - 2)
      }
      return col
    },
    typesChartAuthor () {
      return this.$store.getters['report/getCommentReport'].author.types
    },
    dataReportChannel () {
      return this.$store.getters['report/getCommentReport'].channel.output
    },
    categoryReportChannel () {
      return this.$store.getters['report/getCommentReport'].channel.category
    },
    extraReportChannel () {
      return this.$store.getters['report/getCommentReport'].channel.data
    },
    titleReportChannel () {
      return this.$store.getters['report/getCommentReport'].channel.title
    },
    widthChannel () {
      let col
      if (this.$store.getters['report/getCommentReport'].channel.data.length > 4) {
        col = ((100 / 4) - 2)
      } else {
        col = ((100 / this.$store.getters['report/getCommentReport'].channel.data.length * 1) - 2)
      }
      return col
    },
    typesChartChannel () {
      return this.$store.getters['report/getCommentReport'].channel.types
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
