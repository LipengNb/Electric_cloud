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
    padding: 10px;
    text-align: center;
    margin-top: 10px;
    background-color: #fff;
    .copyright{
      color: @text-color-second;
      font-size: 14px;
      i {
          margin: 0 4px;
      }
    }
  }
</style>
