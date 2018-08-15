<template>
  <div
    v-if="isReadyData"
    class="page-home-layout">
    <Navbar
      :title="titlePage"
      @changeTodayDate="changeDateTodayDone"/>
    <b-container>
      <span v-if="noResult !== null ">
        <h3>{{ noResult }}</h3>
      </span>
      <span v-else>
        <b-row class="no-margin">
          <b-col
            cols="12">
            <TableShow
              :data-extra="extraReport"
              :width="width"
              title="Show Data Of HomePage Layout Report"/>
          </b-col>
          <b-col cols="12">
            <FilterDate @change="changeDateDone"/>
          </b-col>
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
  name: 'Homepagelayout',
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
        section: 'homepage_layouts'
      })
      return this.$route.meta.title
    },
    isFiltering () {
      return this.$store.getters['filter/getFiltering']
    },
    isReadyData () {
      return this.$store.getters['report/getHomeReport'].readyData
    },
    noResult () {
      return this.$store.getters['report/getResult']
    },
    dataReport () {
      return this.$store.getters['report/getHomeReport'].filter.output
    },
    categoryReport () {
      return this.$store.getters['report/getHomeReport'].filter.category
    },
    extraReport () {
      return this.$store.getters['report/getHomeReport'].table.data
    },
    titleReport () {
      return this.$store.getters['report/getHomeReport'].filter.title
    },
    width () {
      let col
      if (this.$store.getters['report/getHomeReport'].filter.data.length > 4) {
        col = ((100 / 4) - 2)
      } else {
        col = ((100 / this.$store.getters['report/getHomeReport'].filter.data.length * 1) - 2)
      }
      return col
    },
    typesChart () {
      return this.$store.getters['report/getHomeReport'].filter.types
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
        section: 'homepage_layouts'
      })
      this.$store.dispatch({
        type: 'report/getReportAction',
        method: 'method',
        section: 'homepage_layouts'
      })
      this.$store.dispatch({
        type: 'report/getReportActionOneDay',
        method: 'method',
        section: 'homepage_layouts'
      })
    }
  }
}
</script>
