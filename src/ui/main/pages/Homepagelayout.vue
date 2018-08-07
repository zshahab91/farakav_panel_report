<template>
  <div
    v-if="dataReport"
    class="page page-home-layout">
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
            title="Show Data Of HomePage Layout Report"/>
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
  name: 'Homepagelayout',
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
      return this.$store.getters['report/getHomeReport'].output
    },
    categoryReport () {
      return this.$store.getters['report/getHomeReport'].category
    },
    extraReport () {
      return this.$store.getters['report/getHomeReport'].data
    },
    titleReport () {
      return this.$store.getters['report/getHomeReport'].title
    },
    width () {
      let col
      if (this.$store.getters['report/getHomeReport'].data.length > 4) {
        col = ((100 / 4) - 2)
      } else {
        col = ((100 / this.$store.getters['report/getHomeReport'].data.length * 1) - 2)
      }
      return col
    },
    typesChart () {
      return this.$store.getters['report/getHomeReport'].types
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
