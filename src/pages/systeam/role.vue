<template>
  <div>
    <advance-table
      :columns="roleTable.roleColumns"
      :data-source="roleTable.roleData"
      title="角色列表"
      :loading="roleTable.loading"
      header-operation="operation"
      row-key="id"
      :pagination="{
        current: roleTable.page,
        pageSize: roleTable.pageSize,
        total: roleTable.total,
        showSizeChanger: true,
        showLessItems: true,
        showQuickJumper: true,
        showTotal: (total, range) => `总计 ${roleTable.total} 条`,
        onChange: onPageChange,
        onShowSizeChange: onSizeChange,
      }"
      @search="onSearch"
      @refresh="onRefresh"
      @reset="onReset"
    >
      <template slot="operation">
        <a-button icon="plus" @click="handleCreate">创建</a-button>
      </template>
      <div slot="action" slot-scope="{record}">
        <a style="margin-right: 8px" @click="handleEdit(record)">
          <a-icon type="edit" /> 编辑
        </a>
      </div>
    </advance-table>
  </div>
</template>
<script>
import AdvanceTable from '@/components/table/advance/AdvanceTable'
export default {
  components: {
    AdvanceTable
  },
  data() {
    const roleTable = {
      roleColumns: [
        {
          title: '角色名称',
          dataIndex: 'role_name'
        },
        {
          title: '访问权限',
          dataIndex: 'role_menu'
        },
        {
          title: '状态',
          dataIndex: 'enable'
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'action' }
        }
      ],
      roleData: [
        {
          id: 1,
          role_name: 'admin',
          role_menu: '菜单列表可能会放一个',
          enable: true
        }
      ],
      loading: false,
      page: 1,
      pageSize: 10,
      total: 10
    }
    return {
      roleTable: roleTable
    }
  },
  methods: {
    handleEdit(data) {
      console.log(data)
    },
    handleCreate() {
      console.log('创建表格')
    },
    // table组件事件
    onSearch() {},
    onRefresh() {},
    onReset() {},
    onPageChange() {},
    onSizeChange() {}
  }
}
</script>

