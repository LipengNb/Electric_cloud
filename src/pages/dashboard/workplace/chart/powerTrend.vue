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
        tooltip: {
          trigger: 'axis',
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          show: true,
          top: 10,
          right: 10,
          bottom: 30,
          borderColor: themeColor
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,.1)',
              type: 'dashed'
            }
          },
          axisLabel: {
            color: themeColor,
            fontSize: 10
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: themeColor
            }
          }
        },
        yAxis: {
          type: 'value',
          splitNumber: 10,
          boundaryGap: false,
          axisLine: {
            show: true,
            lineStyle: {
              color: themeColor
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,.1)',
              type: 'dashed'
            }
          },
          axisLabel: {
            color: themeColor,
            fontSize: 10
          }
        },
        series: [{
          data: [820, 932, 901, 934, 180, 800, 900],
          type: 'line',
          smooth: true,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#035ff3' // 0% 处的颜色
              }, {
                offset: 1, color: 'transparent' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          },
          itemStyle: {
            opacity: 0
          },
          lineStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: themeColor // 0% 处的颜色
              }, {
                offset: 1, color: '#035ff3'// 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          }
        }]
      })
    }
  }
}
</script>
