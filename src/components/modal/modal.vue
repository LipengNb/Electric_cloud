<template>
  <a-modal
    class="my-modal"
    :title="title"
    :width="modalWidth"
    :visible="visible"
    :confirm-loading="loading"
    :maskClosable="false"
    @ok="$emit('submit')"
    @cancel="handleCancel"
  >
    <a-layout class="admin-layout-main beauty-scroll" :style="{ height: contentHeight, overflowY: 'auto'}">
      <a-card class="result-error" :bordered="false">
        <slot />
      </a-card>
    </a-layout>
  </a-modal>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    modalWidth: {
      type: [String, Number],
      default: 520
    },
    contentHeight: {
      type: String,
      default: '500px'
    }
  },
  data() {
    return {}
  },
  computed: {
  },
  methods: {
    handleSubmit() {

    },
    handleCancel() {
      this.$emit('update:visible')
    }
  }
}
</script>
<style lang="less" scoped>
.my-modal{
  /deep/.ant-modal-body{
    padding: 0;
  }
}
</style>
