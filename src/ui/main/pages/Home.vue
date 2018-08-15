<template>
  <div
    v-if="dataHome"
    class=" page-home">
    <Navbar :title="titlePage"/>
    <b-container>
      <span v-if="noResult !== null ">
        <h3>{{ noResult }}</h3>
      </span>
      <span v-else>
        <b-row class="no-margin">
          <b-col cols="12">
            <DataShow
              :data-extra="dataHome.data"
              :width="width"
              title="Show Data Of Home Page Report"/>
          </b-col>
          <b-col cols="12">
            <Chart
              :is-filter="false"
              :data="dataHome.output"
              :category="dataHome.category"
              :chart-types-prop="dataHome.types"
              :title-chart="dataHome.title"
              :width="widthChart"
              unit=" "/>
          </b-col>
        </b-row>
      </span>
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
      this.$store.dispatch({
        type: 'filter/setSectionAction',
        section: null
      })
      return this.$route.meta.title
    },
    noResult () {
      return this.$store.getters['report/getResult']
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
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$store.dispatch({
        type: 'filter/setSectionAction',
        section: null
      })
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
