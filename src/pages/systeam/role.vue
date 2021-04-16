<template>
  <div>
    <advance-table
      :columns="table.columns"
      :data-source="table.data"
      title="角色列表"
      :loading="table.loading"
      header-operation="operation"
      row-key="id"
      :pagination="{
        current: table.page,
        pageSize: table.pageSize,
        total: table.total,
        showSizeChanger: true,
        showLessItems: true,
        showQuickJumper: true,
        showTotal: (total, range) => `总计 ${table.total} 条`,
        onChange: onPageChange,
        onShowSizeChange: onSizeChange,
      }"
      @refresh="onRefresh"
    >
      <template slot="operation">
        <a-button icon="plus" @click="handleCreate">创建</a-button>
      </template>
      <span slot="enable" slot-scope="{ record }">
        <a-switch :checked="record.enable" @change="onChange(record)" />
      </span>
      <span slot="action" slot-scope="{record}">
        <a style="margin-right: 8px" @click="handleEdit(record)">
          <a-icon type="edit" /> 编辑
        </a>
      </span>
    </advance-table>
    <modal :visible.sync="visible" modal-width="900px" @submit="handleSubmit">
      <a-form-model ref="menuForm" :model="form" :rules="rules">
        <a-form-model-item label="角色名称" prop="name">
          <a-input v-model="form.name" placeholder="输入角色名称" />
        </a-form-model-item>
        <a-form-model-item label="菜单权限" prop="menus">
          <a-table :columns="menuColumns" bordered :data-source="menusData" size="small" row-key="id" default-expand-all-rows :row-selection="rowSelection" :pagination="false">
            <template slot="name" slot-scope="item">
              <a-icon v-if="item.icon" :type="item.icon" />
              {{ item.name }}
            </template>
            <template slot="btns" slot-scope="row">
              <a-checkbox-group>
                <template v-if="row.btn_perms">
                  <a-checkbox v-for="item in match(row.btn_perms)" :key="item.value" :value="item.value">{{ item.label }}</a-checkbox>
                </template>
              </a-checkbox-group>
            </template>
          </a-table>
        </a-form-model-item>
        <a-form-model-item label="禁启用" prop="enable">
          <a-switch v-model="form.enable" checked-children="启动" un-checked-children="禁用" />
        </a-form-model-item>
      </a-form-model>
    </modal>
  </div>
</template>
<script>
import { menus } from '@/services/systeam'
import modal from '@/components/modal/modal'
import mixins from './mixin'
import AdvanceTable from '@/components/table/advance/AdvanceTable'
export default {
  components: {
    modal,
    AdvanceTable
  },
  mixins: [mixins],
  data() {
    const table = {
      columns: [
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
          dataIndex: 'enable',
          scopedSlots: { customRender: 'enable' }
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'action' }
        }
      ],
      data: [
        {
          id: 1,
          role_name: 'admin',
          role_menu: '菜单列表可能会放一个',
          enable: false
        }
      ],
      loading: false,
      page: 1,
      pageSize: 10,
      total: 10
    }
    return {
      table: table,
      title: '创建角色',
      visible: false,
      rowSelection: {
        type: 'checkbox',
        selectedRowKeys: [],
        onSelectAll: this.onSelectAll,
        onSelect: this.onSelect
      },
      menuColumns: [
        {
          title: '菜单标题',
          width: '240px',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '按钮权限',
          scopedSlots: { customRender: 'btns' }
        }
      ],
      menusData: [],
      form: {
        name: '',
        menus: [],
        enable: true
      },
      rules: {},
      btns: [
        {
          label: '创建',
          value: 'add'
        },
        {
          label: '删除',
          value: 'delete'
        },
        {
          label: '修改',
          value: 'edit'
        },
        {
          label: '导出',
          value: 'export'
        },
        {
          label: '添加子集',
          value: 'add_child'
        }
      ]
    }
  },
  mounted() {
    this.getMenus()
  },
  methods: {
    // 表格数据
    async getMenus() {
      const res = await menus()
      const { code, data, message } = res.data
      if (code !== 0) {
        this.$message.error(message)
        return
      }
      this.menusData = this.toTree(data)
    },
    handleEdit(data) {
      this.visible = true
      console.log(data)
    },
    handleCreate() {
      this.visible = true
      console.log('创建表格')
    },
    handleSubmit() {
      console.log(this.rowSelection.selectedRowKeys)
      console.log(this.form)
    },
    onCheck(keys, checks) {
      console.log('keys', keys)
      console.log('checks', checks)
    },
    // handleTableChange(e, sorte, current) {
    //   console.log(e)
    //   console.log(sorte)
    //   console.log(current)
    // },
    // table组件事件
    onRefresh() {},
    onPageChange() {},
    onSizeChange() {},
    deepMenus(menus) {
      menus.forEach((item) => {
        if (item.children && item.children.length) {
          this.deepMenus(item.children)
        }
        item.scopedSlots = { title: 'custom' }
      })
    },
    toTree(array) {
      const obj = {}
      const newArray = []
      array.map(item => {
        obj[item.id] = item
      })
      for (let i = 0; i < array.length; i++) {
        const item = array[i]
        const parent = obj[item.pid]
        if (parent) {
          if (parent.children) {
            parent.children.push(item)
          } else {
            parent.children = []
            parent.children.push(item)
          }
        } else {
          newArray.push(item)
        }
      }
      return newArray
    },
    match(perms) {
      const btns = this.btns
      if (!perms || !Array.isArray(perms)) return []
      return btns.filter(item => perms.includes(item.value))
    }
  }
}
</script>

