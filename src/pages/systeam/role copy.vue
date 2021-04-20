<template>
  <div>
    <advance-table
      :columns="table.columns"
      :data-source="table.data"
      title="角色列表"
      :loading="table.loading"
      header-operation="operation"
      row-key="name"
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
      @refresh="getRoles"
    >
      <template slot="operation">
        <a-button icon="plus" @click="handleCreate">创建</a-button>
      </template>
      <span slot="enable" slot-scope="{ record }">
        <a-switch :checked="record.enable" @change="onChange(record)" />
      </span>
      <span slot="menus" slot-scope="{ record }">
        <a-tree
          class="draggable-tree"
          draggable
          :selectable="false"
          :replace-fields="{
            title: 'name'
          }"
          :tree-data="filterMenus(record.menus)"
        >
          <span slot="custom" slot-scope="{ dataRef }">
            <a-icon :type="dataRef.icon" />
            {{ dataRef.name }}
          </span>
        </a-tree>
      </span>
      <span slot="action" slot-scope="{ record }">
        <a style="margin-right: 8px" @click="handleEdit(record)">
          <a-icon type="edit" /> 编辑
        </a>
      </span>
    </advance-table>
    <modal :visible.sync="visible" modal-width="900px" @submit="handleSubmit">
      <a-form-model ref="form" :model="form" :rules="rules">
        <a-form-model-item label="角色名称" prop="name">
          <a-input v-model="form.name" placeholder="输入角色名称" />
        </a-form-model-item>
        <a-form-model-item label="菜单权限" prop="menus">
          <a-table :columns="menuColumns" bordered :data-source="menusData" size="small" row-key="_id" default-expand-all-rows :row-selection="rowSelection" :pagination="false">
            <template slot="name" slot-scope="item">
              <a-icon v-if="item.icon" :type="item.icon" />
              {{ item.name }}
            </template>
            <template slot="btns" slot-scope="row">
              <a-checkbox-group v-model="row.selected" @change="onChancheCheckbox(row)">
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
import { toTree } from '@/utils/util'
import { getMenus } from '@/services/user'
import { getRoles, createRoles } from '@/services/systeam'
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
          dataIndex: 'name'
        },
        {
          title: '访问权限',
          scopedSlots: { customRender: 'menus' }
        },
        {
          title: '状态',
          scopedSlots: { customRender: 'enable' }
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'action' }
        }
      ],
      data: [],
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
      originMenuData: [],
      menusData: [],
      confirmLoading: false,
      form: {
        name: '',
        menus: [],
        enable: true
      },
      rules: {
        name: { required: true, message: '请输入角色名称' }
      },
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
  watch: {
    'rowSelection.selectedRowKeys'(selected) {
      const checkedMenus = this.originMenuData.filter(item => {
        if (selected.includes(item._id)) {
          if (item.btn_perms && item.btn_perms.length > 0) {
            this.$set(item, 'selected', item.btn_perms)
          }
          return item
        } else {
          if (item.btn_perms && item.btn_perms.length > 0) {
            this.$set(item, 'selected', [])
          }
        }
      })
      const arr = []
      checkedMenus.forEach(item => {
        arr.push({
          menu_id: item._id,
          btn_selected: item.selected ? item.selected : []
        })
      })
      this.form.menus = arr
    }
  },
  mounted() {
    this.getMenus()
    this.getRoles()
  },
  methods: {
    async getRoles() {
      const res = await getRoles()
      const { code, data, message } = res.data
      if (code !== 0) {
        this.$message.error(message)
        return
      }
      this.table.data = data
    },
    // 获取当前用户的菜单目录
    async getMenus() {
      const res = await getMenus()
      const { code, data, message } = res.data
      if (code !== 0) {
        this.$message.error(message)
        return
      }
      this.originMenuData = data
      this.menusData = toTree(data)
    },
    // 按钮单选
    onChancheCheckbox(item) {
      const memuSelected = this.rowSelection.selectedRowKeys
      if (!memuSelected.includes(item._id)) {
        this.$message.warning(`请先选择【${item.name}】菜单`)
        item.selected = []
      }
      console.log(item.selected)
      this.form.menus.forEach(menu => {
        if (menu.menu_id === item._id) {
          menu.btn_selected = item.selected
        }
      })
    },
    // 修改
    handleEdit(data) {
      this.visible = true
      console.log(data)
    },
    // 创建
    handleCreate() {
      this.visible = true
      console.log('创建表格')
    },
    // 提交
    handleSubmit() {
      this.$refs.form.validate(async valid => {
        if (!valid) return
        this.confirmLoading = true
        const res = await createRoles(this.form)
        if (!res) return
        this.confirmLoading = false
        this.visible = false
        this.$message.success('创建成功')
      })
    },
    onCheck(keys, checks) {
      console.log('keys', keys)
      console.log('checks', checks)
    },
    filterMenus(menus) {
      if (menus) {
        const ids = menus.map(item => item.menu_id)
        const rolesMenus = this.originMenuData.filter(item => ids.includes(item._id))
        const menuList = rolesMenus.map(item => {
          return {
            _id: item._id,
            router: item.router,
            name: item.name,
            pid: item.pid,
            icon: item.icon
          }
        })
        const treeMenus = toTree(menuList)
        this.deepMenus(treeMenus)
        return treeMenus
      }
      // this.originMenuData.filter(item => {
      //   if (menus.menus.map(menu => menu.menu_id).includes(item._id)) {
      //     console.log(item)
      //   }
      // })
    },
    // table组件事件
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
    match(perms) {
      const btns = this.btns
      if (!perms || !Array.isArray(perms)) return []
      return btns.filter(item => perms.includes(item.value))
    }
  }
}
</script>

