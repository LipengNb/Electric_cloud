<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>
<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      const themeColor = '#36ecff'
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        grid: {
          left: 80,
          top: 10,
          right: 0,
          bottom: 0
        },
        xAxis: {
          type: 'value',
          show: false,
          axisLine: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: themeColor,
            fontSize: 11
          },
          nameTextStyle: {
            color: themeColor
          },
          data: ['11号楼/250', '12号楼/250', '13号楼/250', '14号楼/250', '15号楼/250']
        },
        series: [{
          data: [150, 160, 170, 180, 190],
          type: 'bar',
          barWidth: 10,
          showBackground: false,
          label: {
            show: true,
            color: themeColor,
            offset: [0, -14],
            formatter: '{c} kwh',
            fontStyle: 'italic',
            fontSize: 10,
            align: 'right'
          },
          itemStyle: {
            color: (params) => {
              const colorList = ['#fe4f4e', '#f96ea8', '#fba42c', '#2c65ff', '#38b683']
              return colorList[params.dataIndex]
            },
            borderRadius: [0, 10, 10, 0]
          }
        }]
      })
    }
  }
}
</script>
