<template>
  <!-- :style="{ background: 'url('+bg+') no-repeat center'}" -->
  <div class="dashboard" :style="{ background: '#101430'}">
    <a-row>
      <a-col :xl="6" :md="24">
        <div class="panel">
          <h2>设备状态</h2>
          <device-status height="240px" />
          <div class="panel-footer" />
        </div>
        <div class="panel">
          <h2>检测状态</h2>
          <div class="chart-wrap">
            <watch-status height="240px" />
          </div>
          <div class="panel-footer" />
        </div>
      </a-col>
      <a-col :xl="12" :md="24">
        <!-- <div class="panel center">1</div> -->
      </a-col>
      <a-col :xl="6" :md="24">
        <div class="panel">
          <h2>七天用电排行</h2>
          <div class="chart-wrap">
            <kwh-ranking height="240px" />
          </div>
          <div class="panel-footer" />
        </div>
        <div class="panel">
          <h2>隐患时间分布</h2>
          <div class="chart-wrap">
            <hidden-danger height="240px" />
          </div>
          <div class="panel-footer" />
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col :xl="6">
        <div class="panel">
          <h2>总功率趋势</h2>
          <div class="chart-wrap">
            <power-trend height="240px" />
          </div>
          <div class="panel-footer" />
        </div>
      </a-col>
      <a-col :xl="18">
        <div class="panel table">2</div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import deviceStatus from './chart/deviceStatus'
import watchStatus from './chart/watchStatus'
import powerTrend from './chart/powerTrend'
import kwhRanking from './chart/kwhRanking'
import hiddenDanger from './chart/hiddenDanger'
export default {
  components: {
    kwhRanking,
    deviceStatus,
    watchStatus,
    powerTrend,
    hiddenDanger
  },
  data() {
    return {
      bg: require('@/assets/img/bg.jpg'),
      themeColor: '#36ecff'
    }
  }
}
</script>
<style lang="less" scoped>
@color: #36ecff;
.dashboard{
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
    .chart-wrap{
      flex: 1;
      padding: 0 10px;
      box-sizing: border-box;
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
