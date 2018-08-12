<template>
  <div class="row m-0">
    <div
      v-for="(chartOption, index) in chartOptions"
      :key="index"
      class="component-chart">
      <b-card
        :footer="unit"
        footer-tag="footer"
        class="text-center chart-box col-sm-12">
        <highcharts
          :options="chartOption"
          :update-args="updateArgs"
          class="chart" />
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentChart',
  props: {
    'data': {
      type: Array,
      required: true
    },
    'category': {
      type: Array,
      required: true
    },
    'chartTypesProp': {
      type: Array,
      required: true
    },
    'titleChart': {
      type: String,
      required: true
    },
    'unit': {
      type: String,
      required: true
    },
    width: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      title: '',
      chartTypes: this.chartTypesProp ? this.chartTypesProp : ['Line', 'Column', 'Area'],
      colorInputIsSupported: null,
      animationDuration: 1500,
      updateArgs: [true, true, {duration: 1500}]
    }
  },
  computed: {
    chartOptions () {
      const charts = []
      this.chartTypes.forEach((item, index) => {
        let obj = {
          chart: {
            type: item.toLowerCase()
          },
          title: {
            text: this.titleChart
          },
          xAxis: {
            categories: this.category,
            crosshair: true
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Report ' + item.toUpperCase()
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0
            }
          },
          series: this.data
        }
        charts.push(obj)
      })
      return charts
    }
  },
  watch: {
    seriesColor (newValue) {
      this.chartOptions.series[0].color = newValue.toLowerCase()
    },
    animationDuration (newValue) {
      this.updateArgs[2].duration = Number(newValue)
    }
  }
}
</script>

<style scoped>

</style>
