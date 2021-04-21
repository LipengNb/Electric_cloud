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
      <span slot="action" slot-scope="{ record }">
        <a style="margin-right: 8px" @click="handleEdit(record)">
          <a-icon type="edit" /> 编辑
        </a>
      </span>
    </advance-table>
    <modal :visible.sync="visible" :title="title" modal-width="900px" @submit="handleSubmit">
      <a-form-model ref="form" :model="form" :rules="rules">
        <a-form-model-item label="角色标识" prop="role_name">
          <a-input v-model="form.role_name" placeholder="输入角色标识" />
        </a-form-model-item>
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
          title: '角色标识',
          dataIndex: 'role_name'
        },
        {
          title: '角色名称',
          dataIndex: 'name'
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
        role_name: '',
        name: '',
        menus: [],
        enable: true
      },
      rules: {
        role_name: { required: true, message: '请输入角色标识' },
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
      const arr = []
      const checkedMenus = this.originMenuData.filter(item => selected.includes(item._id))
      checkedMenus.forEach(item => {
        arr.push({
          menu_id: item._id,
          router: item.router,
          name: item.name,
          pid: item.pid,
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
    // 获取角色列表
    async getRoles() {
      const res = await getRoles()
      const { code, data, message } = res.data
      if (code !== 0) {
        this.$message.error(message)
        return
      }
      this.table.data = data
    },
    // 获取菜单目录
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
      this.form.menus.forEach(menu => {
        if (menu.menu_id === item._id) {
          menu.btn_selected = item.selected
        }
      })
    },
    // 修改
    handleEdit(item) {
      this.visible = true
      this.title = '编辑角色'
      this.form._id = item._id
      const selected = this.rowSelection
      this.$nextTick(() => {
        this.form = { ...item }
        selected.selectedRowKeys = item.menus.map(v => v.menu_id)
        this.setCheckbox(this.menusData, item)
      })
    },
    // 创建
    handleCreate() {
      this.reset()
      this.visible = true
      this.title = '创建角色'
      this.form._id && delete this.form._id
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
        this.getRoles()
        this.$message.success('创建成功')
      })
    },
    // table组件事件
    onPageChange() {},
    onSizeChange() {},
    setCheckbox(menus, item) {
      menus.forEach((v) => {
        if (v.children && v.children.length) {
          this.setCheckbox(v.children, item)
        } else {
          const index = item.menus.findIndex(c => c.menu_id === v._id)
          if (index !== -1) {
            v.selected = item.menus[index].btn_selected
          }
        }
      })
    },
    match(perms) {
      const btns = this.btns
      if (!perms || !Array.isArray(perms)) return []
      return btns.filter(item => perms.includes(item.value))
    },
    reset() {
      this.rowSelection.selectedRowKeys = []
      this.$refs.form && this.$refs.form.resetFields()
      this.unSetCheckbox(this.menusData)
    },
    unSetCheckbox(menus) {
      menus.forEach((v) => {
        if (v.children && v.children.length) {
          this.unSetCheckbox(v.children)
        } else {
          v.selected = []
        }
      })
    }
  }
}
</script>

