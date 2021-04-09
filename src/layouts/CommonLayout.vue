<template>
  <div class="common-layout">
    <div class="content"><slot /></div>
  </div>
</template>

<script>
export default {
  name: 'CommonLayout'
}
</script>

<style scoped lang="less">
.common-layout{
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background: linear-gradient(to bottom, #060f2e, #0a356a);
  background-repeat: no-repeat;
  background-position-x: center;
  background-size: 100%;
  .content{
    padding: 32px 0;
    flex: 1;
    @media (min-width: 768px){
      padding: 112px 0 24px;
    }
  }
}
</style>
