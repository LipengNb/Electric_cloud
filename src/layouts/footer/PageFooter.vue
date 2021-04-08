<template>
  <div class="footer">
    <div class="copyright">
      Copyright<a-icon type="copyright" />{{ copyright }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageFooter',
  props: {
    copyright: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
  .footer{
    padding: 24px;
    text-align: center;
    background-color: #fff;
    .copyright{
      color: @text-color-second;
      font-size: 14px;
      i {
          margin: 0 4px;
      }
    }
    .links{
      margin-bottom: 8px;
      a:not(:last-child) {
        margin-right: 40px;
      }
      a{
        color: @text-color-second;
        -webkit-transition: all .3s;
        transition: all .3s;
      }
    }
  }
</style>
