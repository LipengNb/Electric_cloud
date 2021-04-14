<template>
  <a-row :style="{ color: '#36ecff' }" class="device-status">
    <a-col :xxl="16" :xl="24" :lg="18" :md="14" class="context">
      <div class="title right-angled middle-linear">
        <span>设备总数 33</span>
        <span>报警总数 285</span>
      </div>
      <ul class="label-wrap">
        <li>
          <div>
            <span>已处理报警数</span>
            <span>占比</span>
          </div>
          <div>
            <span>233</span>
            <span>80%</span>
          </div>
        </li>
        <li>
          <div>
            <span>未处理报警数</span>
            <span>占比</span>
          </div>
          <div>
            <span>233</span>
            <span>80%</span>
          </div>
        </li>
      </ul>
    </a-col>
    <a-col :xxl="8" :xl="24" :lg="6" :md="10">
      <div :class="className" :style="{height:height,width:width}" />
    </a-col>
  </a-row>
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
      default: '160px'
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
      this.chart = echarts.init(document.querySelector('.chart'), 'macarons')
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          textStyle: {
            color: '#fff'
          }
        },
        title: {
          text: '总报警数\n233',
          top: 'middle',
          left: 'center',
          textStyle: {
            color: themeColor,
            fontSize: 14,
            lineHeight: 20
          }
        },
        series: [
          {
            type: 'pie',
            left: 0,
            top: 'top',
            radius: ['70%', '80%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            itemStyle: {
              color: (params) => {
                const colorList = ['#36ecff', '#f69d4d']
                return colorList[params.dataIndex]
              }
            },
            data: [
              { value: 285, name: '已处理报警数' },
              { value: 33, name: '未处理报警数' }
            ]
          },
          {
            type: 'pie',
            radius: ['90%', '90%'],
            label: {
              show: false
            },
            data: [{
              value: 10,
              itemStyle: {
                borderWidth: 1,
                borderColor: '#163356'
              }
            }]
          }
        ]
      })
    }
  }
}
</script>
<style lang="less" scoped>
.device-status{
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  .title{
    line-height: 30px;
    position: relative;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
  }
  .label-wrap{
    padding: 0;
    color: #36ecff;
    list-style: none;
    margin: 0;
    li{
      position: relative;
      padding: 0 10px;
      div{
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        line-height: 2.5;
      }
    }
    li:nth-of-type(1){
      border-bottom: 1px solid #163356;
      &::before{
        content: '';
        width: 7px;
        height: 7px;
        border-radius: 50%;
        position: absolute;
        left: 4px;
        top: 14px;
        background-color: #36ecff;
      }
    }
    li:nth-of-type(2){
      &::before{
        content: '';
        width: 7px;
        height: 7px;
        border-radius: 50%;
        position: absolute;
        left: 4px;
        top: 14px;
        background-color: #f69d4d;
      }
    }
  }
  .context{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
