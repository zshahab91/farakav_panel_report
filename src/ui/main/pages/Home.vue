<template>
  <div
    v-if="dataHome"
    class="page page-home">
    <Navbar :title="titlePage"/>
    <b-container class="container-page">
      <b-row class="no-margin">
        <b-col cols="12">
          <DataShow
            :data-extra="dataHome.data"
            :width="width"
            title="Show Data Of Home Page Report"/>
        </b-col>
        <b-col cols="12">
          <Chart
            :data="dataHome.output"
            :category="dataHome.category"
            :chart-types-prop="dataHome.types"
            :title-chart="dataHome.title"
            :width="widthChart"
            unit=" "/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import DataShow from '../components/Datashow'
import Chart from '../components/Chart'
export default {
  name: 'Home',
  components: {
    Navbar,
    DataShow,
    Chart
  },
  data () {
    return {
      widthChart: 100
    }
  },
  computed: {
    titlePage () {
      return this.$route.meta.title
    },
    dataHome () {
      return this.$store.getters['report/getHomeDataPage']
    },
    width () {
      let col
      if (this.$store.getters['report/getHomeDataPage'].data.length > 4) {
        col = ((100 / 4) - 2)
      } else {
        col = ((100 / this.$store.getters['report/getHomeDataPage'].data.length * 1) - 2)
      }
      return col
    }
  },
  created: function () {
    this.$store.dispatch({
      type: 'report/emptyReports',
      method: 'method'
    })
    this.$store.dispatch({
      type: 'report/getReportAction',
      method: 'method',
      section: null
    })
  },
  mounted () {
    // this.init()
  },
  methods: {
    init () {
      this.$store.dispatch({
        type: 'report/getReportAction',
        method: 'method',
        section: null
      })
    },
    showNotif () {
      this.$notify({
        message: 'Welcome',
        type: 'success',
        timeout: 2000,
        showClose: true,
        closeOnClick: true
      })
    }
  }
}
</script>
