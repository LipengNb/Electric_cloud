export default {
  created() {
    this.$_addListener()
  },
  beforeDestroy() {
    this.$_removeListener()
  },
  methods: {
    // 进入全屏
    $_inFullScreen(el) {
      el.classList.add('beauty-scroll')
      if (el.requestFullscreen) {
        el.requestFullscreen()
        return true
      } else if (el.webkitRequestFullScreen) {
        el.webkitRequestFullScreen()
        return true
      } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen()
        return true
      } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen()
        return true
      }
      this.$message.warn('对不起，您的浏览器不支持全屏模式')
      el.classList.remove('beauty-scroll')
      return false
    },
    // 推出全屏
    $_outFullScreen(el) {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
      el.classList.remove('beauty-scroll')
    },
    $_addListener() {
      document.addEventListener('fullscreenchange', this.$_fullScreenListener)
      document.addEventListener('webkitfullscreenchange', this.$_fullScreenListener)
      document.addEventListener('mozfullscreenchange', this.$_fullScreenListener)
      document.addEventListener('msfullscreenchange', this.$_fullScreenListener)
    },
    $_removeListener() {
      document.removeEventListener('fullscreenchange', this.$_fullScreenListener)
      document.removeEventListener('webkitfullscreenchange', this.$_fullScreenListener)
      document.removeEventListener('mozfullscreenchange', this.$_fullScreenListener)
      document.removeEventListener('msfullscreenchange', this.$_fullScreenListener)
    },
    $_fullScreenListener(e) {
      if (e.target.id === this.id) {
        this.fullScreen = !this.fullScreen
      }
    }
  }
}
