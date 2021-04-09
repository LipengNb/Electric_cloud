<template>
  <div ref="root" class="action-columns">
    <a-popover v-model="visible" placement="bottomRight" trigger="click" :get-popup-container="() => $refs.root">
      <div slot="title">
        <a-checkbox :indeterminate="indeterminate" :checked="checkAll" class="check-all" @change="onCheckAllChange" />列展示
      </div>
      <a-list v-for="(col, i) in columns" :key="i" slot="content" style="width: 100%" size="small">
        <a-list-item>
          <a-checkbox v-model="col.visible" @change="e => onCheckChange(e, col)" />
          <template v-if="col.title">
            {{ col.title }}:
          </template>
          <slot v-else-if="col.slots && col.slots.title" :name="col.slots.title" />
        </a-list-item>
      </a-list>
      <a-icon class="action" type="setting" />
    </a-popover>
  </div>
</template>

<script>
import cloneDeep from 'lodash.clonedeep'

export default {
  name: 'ActionColumns',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    visibleColumns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      visible: false,
      indeterminate: false,
      checkAll: true,
      checkedCounts: this.columns.length,
      backColumns: cloneDeep(this.columns)
    }
  },
  watch: {
    checkedCounts(val) {
      this.checkAll = val === this.columns.length
      this.indeterminate = val > 0 && val < this.columns.length
    },
    columns(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.checkedCounts = newVal.length
        this.formatColumns(newVal)
      }
    }
  },
  created() {
    this.formatColumns(this.columns)
  },
  methods: {
    onCheckChange(e, col) {
      if (!col.visible) {
        this.checkedCounts -= 1
      } else {
        this.checkedCounts += 1
      }
    },
    onCheckAllChange(e) {
      if (e.target.checked) {
        this.checkedCounts = this.columns.length
        this.columns.forEach(col => {
          col.visible = true
        })
      } else {
        this.checkedCounts = 0
        this.columns.forEach(col => {
          col.visible = false
        })
      }
    },
    formatColumns(columns) {
      for (const col of columns) {
        if (col.visible === undefined) {
          this.$set(col, 'visible', true)
        }
        if (!col.visible) {
          this.checkedCounts -= 1
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.action-columns{
  display: inline-block;
  .check-all{
    margin-right: 8px;
  }
  .left,.right{
    transform: rotate(-90deg);
  }
  .active{
    color: @primary-color;
  }
}
</style>
