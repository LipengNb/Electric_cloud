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
      const seriseArr = []
      for (let i = 0; i < 5; i++) {
        seriseArr.push({
          type: 'bar',
          barWidth: 6,
          itemStyle: {
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
        })
      }
      this.chart.setOption({
        grid: {
          top: 56,
          left: 30,
          right: 46,
          bottom: 76
        },
        tooltip: {
          trigger: 'item',
          textStyle: {
            color: '#fff'
          }
        },
        dataset: {
          source: [
            ['product', '2015', '2016', '2017'],
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1]
          ]
        },
        xAxis: {
          type: 'category',
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,.1)',
              type: 'dashed'
            }
          },
          splitArea: {
            areaStyle: {
              color: 'transparent'
            }
          }
        },
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,.1)',
              type: 'dashed'
            }
          },
          splitArea: {
            areaStyle: {
              color: 'transparent'
            }
          },
          axisLabel: {
            color: themeColor,
            fontSize: 10
          }
        },
        series: seriseArr
      })
    }
  }
}
</script>
