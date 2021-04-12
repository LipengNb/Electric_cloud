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
          top: 0,
          right: 0
        },
        title: {
          text: '监测宿舍数\n123',
          left: 'center',
          top: 'middle',
          textStyle: {
            fontStyle: 'italic',
            color: themeColor,
            fontSize: 13,
            lineHeight: 20
          }
        },
        tooltip: {
          trigger: 'item',
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          top: 'bottom',
          align: 'left',
          itemGap: 10,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontSize: 14,
            color: themeColor
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['36%', '50%'],
            avoidLabelOverlap: false,
            label: {
              alignTo: 'edge',
              formatter: '{c}%\n{name|{b}}',
              minMargin: 5,
              edgeDistance: 10,
              lineHeight: 30,
              fontSize: 14,
              color: themeColor,
              rich: {
                time: {
                  fontSize: 10,
                  color: themeColor
                }
              }
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '18'
              }
            },
            labelLine: {
              length: 36,
              length2: 10,
              lineStyle: {
                width: 1,
                color: themeColor
              }
            },
            labelLayout: (params) => {
              var isLeft = params.labelRect.x < this.chart.getWidth() / 3
              var points = params.labelLinePoints
              // Update the end point.
              points[2][0] = isLeft
                ? params.labelRect.x
                : params.labelRect.x + params.labelRect.width

              return {
                labelLinePoints: points
              }
            },
            data: [
              { value: 53, name: '监测正常' },
              { value: 20, name: '监测报警' },
              { value: 30, name: '监测离线' }
            ],
            itemStyle: {
              borderWidth: 3,
              borderColor: '#171b36',
              color: (params) => {
                const colorList = ['#36ecff', '#fe4f4e', '#0470f9']
                return colorList[params.dataIndex]
              }
            }
          }
        ]
      })
    }
  }
}
</script>
