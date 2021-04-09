<template>
  <div class="my-table">
    <a-table :data-source="tableDefault.data" :loading="tableDefault.loading" :row-key="tableDefault.rowKey">
      <template v-for="item in tableDefault.columns">
        <!-- 数据 -->
        <a-table-column v-if="!item.slotName" :key="item.dataIndex" align="center" :title="item.title" :data-index="item.dataIndex" />
        <!-- 插槽 -->
        <a-table-column v-else-if="item.columnType === 'slot'" :key="item.dataIndex" align="center" :title="item.title">
          <template slot-scope="scope">
            <!-- 性别 -->
            <span v-if="item.slotName === '_gender'">
              {{ scope[item.dataIndex] === 'woman' ? '女' : '男' }}
            </span>
            <!-- 金额 -->
            <span v-if="item.slotName === 'price'" :style="`color:${item.color}`">
              {{ item.before }} {{ scope[item.dataIndex] }}
            </span>
            <!-- 标签 -->
            <span v-if="item.slotName === '_tags'">
              <a-tag v-for="_label in scope[item.dataIndex]" :key="_label.name" :color="item.color ? item.color : 'blue'">
                {{ _label.name }}
              </a-tag>
            </span>
            <!-- 时间 -->
            <span v-if="item.slotName === '_date'">
              {{ $dateformat(scope[item.dataIndex], 'isoDate') }}
            </span>
            <slot v-else :name="item.slotName" :data="scope" :index="scope.$index" />
          </template>
        </a-table-column>
      </template>
    </a-table>
  </div>
</template>
<script>
export default {
  name: 'Vtable',
  props: {
    tableOption: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tableDefault: {
        columns: [],
        data: [],
        loading: false,
        rowKey: 'id',
        page: {
          pageNumber: 1,
          pageSize: 20
        }
      }
    }
  },
  watch: {
    'tableOption.data': {
      handler(data) {
        this.tableDefault.data = data
      },
      deep: true
    },
    'tableOption.loading': {
      handler(bool) {
        this.tableDefault.loading = bool
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.deepReplace(this.tableDefault, this.tableOption)
    },
    // 递归替换默认参数配置
    deepReplace(tableDefault, tableOption) {
      for (const key in tableOption) {
        if (this.isIn(tableDefault, key)) {
          if (this.type(tableOption[key]) === '[object Object]') {
            this.deepReplace(tableDefault[key], tableOption[key])
          } else {
            tableDefault[key] = tableOption[key]
          }
        }
      }
    },
    // 判断对象是否包含某个属性
    isIn(obj, prot) {
      return Object.prototype.hasOwnProperty.call(obj, prot)
    },
    // 判断数据类型
    type(para) {
      return Object.prototype.toString.call(para)
    }
  }
}
</script>
<style lang="less" scoped>
.my-table{
  /deep/.ant-table-thead>tr>th{
    background-color: #101434;
    color: #fff;
  }
}
</style>
