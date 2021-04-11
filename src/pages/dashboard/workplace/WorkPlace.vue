<template>
  <!-- :style="{ background: 'url('+bg+') no-repeat center'}" -->
  <div class="dashboard" :style="{ background: '#101430'}">
    <a-row>
      <a-col :xl="5" :md="24">
        <div class="panel">
          <h2>设备状态</h2>
          <div class="chart" />
          <div class="panel-footer" />
        </div>
        <div class="panel">
          <h2>检测状态</h2>
          <div class="chart">
            <div id="watchStatus" class="chart" />
          </div>
          <div class="panel-footer" />
        </div>
      </a-col>
      <a-col :xl="14" :md="24">
        <!-- <div class="panel center">1</div> -->
      </a-col>
      <a-col :xl="5" :md="24">
        <div class="panel">
          <h2>七天用电排行</h2>
          <div class="chart" />
          <div class="panel-footer" />
        </div>
        <div class="panel">
          <h2>隐患时间分布</h2>
          <div class="chart" />
          <div class="panel-footer" />
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col :xl="5">
        <div class="panel">
          <h2>总功率趋势</h2>
          <div id="power" class="chart" />
          <div class="panel-footer" />
        </div>
      </a-col>
      <a-col :xl="19">
        <div class="panel table">2</div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bg: require('@/assets/img/bg.jpg'),
      themeColor: '#36ecff',
      watchStatus: '',
      power: ''
    }
  },
  mounted() {
    this.initEcharts()
    window.onresize = () => {
      this.watchStatus.resize()
    }
    window.onresize = () => {
      this.power.resize()
    }
  },
  methods: {
    initEcharts() {
      this.watchStatusPie()
      this.powerLine()
    },
    watchStatusPie() {
      const themeColor = this.themeColor
      const options = {
        title: {
          text: '监测宿舍数量\n123',
          left: 'center',
          top: 'middle',
          textStyle: {
            fontStyle: 'italic',
            color: themeColor,
            fontSize: 14,
            lineHeight: 20
          }
        },
        tooltip: {
          trigger: 'item'
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
            name: '访问来源',
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
            labelLayout: function(params) {
              // // var isLeft = params.labelRect.x < this.watchStatus.getWidth() / 3
              // var points = params.labelLinePoints
              // // Update the end point.
              // points[2][0] = isLeft
              //   ? params.labelRect.x
              //   : params.labelRect.x + params.labelRect.width

              // return {
              //   labelLinePoints: points
              // }
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
      }
      this.watchStatus = this.$echarts.init(document.querySelector('#watchStatus')).setOption(options)
    },
    powerLine() {
      const themeColor = this.themeColor
      const options = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          show: true,
          top: 20,
          right: 10,
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
      }
      this.power = this.$echarts.init(document.querySelector('#power')).setOption(options)
    }
  }
}
</script>
<style lang="less" scoped>
@color: #36ecff;
.dashboard{
  // height: calc(100vh - 164px);
  padding: 10px;
  background-size: 100% 100% !important;
  .panel{
    display: flex;
    flex-direction: column;
    min-height: 300px;
    margin-bottom: 10px;
    position: relative;
    border: 1px solid rgba(25, 186, 139, 0.17);
    background-color: rgba(255,255,255,.03);
    // 四个角 start
    &::before, &::after{
      content: '';
      width: 10px;
      height: 10px;
      position: absolute;
      top: 0;
      border: 2px solid @color;
      border-bottom: none;
    }
    &::after{
      right: 0;
      border-left: none;
    }
    &::before{
      left: 0;
      border-right: none;
    }
    .panel-footer{
      position: absolute;
      bottom: 0;
      width: 100%;
      &::before, &::after{
        content: '';
        width: 10px;
        height: 10px;
        position: absolute;
        bottom: 0;
        border: 2px solid @color;
        border-top: none;
      }
      &::after{
        right: 0;
        border-left: none;
      }
      &::before{
        left: 0;
        border-right: none;
      }
    }
    // 四个角 end
    h2{
      font-size: 20px;
      line-height: 40px;
      text-align: center;
      color: @color;
    }
    .chart{
      flex: 1;
      margin: 10px;
      // background-color: pink;
    }
  }
  .center{
    box-sizing: border-box;
    margin: 0 10px;
  }
  .table{
    margin-left: 10px;
  }
}
</style>
