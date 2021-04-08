<template>
  <a-layout-sider v-model="collapsed" :theme="sideTheme" :class="['side-menu', 'beauty-scroll', isMobile ? null : 'shadow']" width="256px" :collapsible="collapsible" :trigger="null">
    <div :class="['logo', theme]">
      <router-link to="/dashboard/workplace">
        <svg width="60px" height="30" viewBox="0 0 169 141" style="vertical-align: middle" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <defs>
            <linearGradient id="linearGradient-1" x1="54.0428975%" y1="4.39752391%" x2="54.0428975%" y2="108.456714%">
              <stop stop-color="#29CDFF" offset="0%" />
              <stop stop-color="#148EFF" offset="62.3089445%" />
              <stop stop-color="#0A60FF" offset="100%" />
            </linearGradient>
            <linearGradient id="linearGradient-2" x1="50%" y1="14.2201464%" x2="50%" y2="113.263844%">
              <stop stop-color="#FA816E" offset="0%" />
              <stop stop-color="#F74A5C" offset="65.9092442%" />
              <stop stop-color="#F51D2C" offset="100%" />
            </linearGradient>
          </defs>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Group" transform="translate(0.000000, -5.000000)">
              <rect id="Rectangle" fill="url(#linearGradient-1)" transform="translate(83.718923, 75.312358) rotate(-24.000000) translate(-83.718923, -75.312358) " x="68.7189234" y="0.312357954" width="30" height="150" rx="15" />
              <rect id="Rectangle" fill="url(#linearGradient-1)" transform="translate(129.009910, 75.580213) rotate(-24.000000) translate(-129.009910, -75.580213) " x="114.00991" y="0.580212739" width="30" height="150" rx="15" />
              <circle id="Oval" fill="url(#linearGradient-2)" cx="25" cy="120" r="25" />
            </g>
          </g>
        </svg>
        <!-- <img src="@/assets/img/logo.png"> -->
        <h1>{{ systemName }}</h1>
      </router-link>
    </div>
    <i-menu :theme="theme" :collapsed="collapsed" :options="menuData" class="menu" @select="onSelect" />
  </a-layout-sider>
</template>

<script>
import IMenu from './menu'
import { mapState } from 'vuex'
export default {
  name: 'SideMenu',
  components: {
    IMenu
  },
  props: {
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menuData: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    }
  },
  computed: {
    sideTheme() {
      return this.theme === 'light' ? this.theme : 'dark'
    },
    ...mapState('setting', ['isMobile', 'systemName'])
  },
  methods: {
    onSelect(obj) {
      this.$emit('menuSelect', obj)
    }
  }
}
</script>

<style lang="less" scoped>
@import "index";
</style>
