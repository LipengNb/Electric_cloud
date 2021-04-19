<template>
  <div>
    <advance-table
      :columns="table.columns"
      :data-source="table.data"
      title="角色列表"
      :loading="table.loading"
      header-operation="operation"
      row-key="router"
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
      @refresh="getRoutes"
    >
      <template slot="operation">
        <a-button v-auth="`add`" icon="plus" @click="handleCreate">创建</a-button>
      </template>
      <span slot="icon" slot-scope="{ record }">
        <a-icon v-if="record.icon" :type="record.icon" />
        <a-icon v-else type="minus" />
      </span>
      <span slot="role" slot-scope="{ record }">
        <a-tag color="purple">{{ record.authority }}</a-tag>
      </span>
      <span slot="btn_perms" slot-scope="{ record }">
        <template v-if="record.btn_perms">
          <a-tag v-for="item in match(record.btn_perms)" :key="item.value">{{ item.label }}</a-tag>
        </template>
        <a-icon v-else type="minus" />
      </span>
      <span slot="enable" slot-scope="{ record }">
        <a-switch checked-children="显" un-checked-children="隐" :checked="!record.invisible" />
      </span>
      <span slot="time">
        2021-04-14
      </span>
      <span slot="action" slot-scope="{ record }">
        <a-button v-auth="`add`" type="link" @click="handleAddChild(record)">
          添加子集
        </a-button>
        <a-button v-auth="`edit`" type="link" @click="handleEdit(record)">
          编辑
        </a-button>
        <a-button type="link" @click="handleDelete(record)">
          删除
        </a-button>
      </span>
    </advance-table>
    <!-- 创建/编辑 -->
    <Modal :visible.sync="visible" :title="title" @submit="handleSubmit">
      <a-form-model ref="form" :model="form" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
        <a-form-model-item label="菜单标题" prop="name">
          <a-input v-model="form.name" placeholder="输入标题" />
        </a-form-model-item>
        <a-form-model-item label="图标" prop="icon">
          <a-input v-model="form.icon" placeholder="输入图标" />
        </a-form-model-item>
        <a-form-model-item label="顺序" prop="sort">
          <a-input-number id="inputNumber" v-model="form.sort" placeholder="输入顺序" :min="1" :max="10" />
        </a-form-model-item>
        <a-form-model-item label="权限标识" prop="authority">
          <a-input v-model="form.authority" placeholder="输入权限标识" />
        </a-form-model-item>
        <a-form-model-item label="路由名称" prop="router">
          <a-input v-model="form.router" placeholder="输入路由名称" />
        </a-form-model-item>
        <a-form-model-item v-show="isShowBtnPerms" label="按钮权限" prop="btns">
          <a-checkbox-group v-model="form.btn_perms">
            <a-checkbox v-for="item in btns" :key="item.value" :value="item.value">{{ item.label }}</a-checkbox>
          </a-checkbox-group>
        </a-form-model-item>
        <a-form-model-item label="是否可见" prop="enable">
          <a-switch v-model="form.enable" checked-children="显" un-checked-children="隐" />
        </a-form-model-item>
      </a-form-model>
    </Modal>
  </div>
</template>
<script>
import { routes, operationRoutes, deleteRoutes } from '@/services/systeam'
// import routerMap from '@/router/async/router.map'
// import { parseRoutes } from '@/utils/routerUtil'
import { toTree } from '@/utils/util'
import Modal from '@/components/modal/modal'
import AdvanceTable from '@/components/table/advance/AdvanceTable'
export default {
  components: {
    AdvanceTable,
    Modal
  },
  data() {
    const table = {
      columns: [
        {
          title: '菜单标题',
          dataIndex: 'name'
        },
        {
          title: '图标',
          scopedSlots: { customRender: 'icon' }
        },
        {
          title: '排序',
          dataIndex: 'sort'
        },
        {
          title: '权限标识',
          scopedSlots: { customRender: 'role' }
        },
        {
          title: '路由名称',
          dataIndex: 'router'
        },
        {
          title: '按钮权限',
          scopedSlots: { customRender: 'btn_perms' }
        },
        {
          title: '是否可见',
          scopedSlots: { customRender: 'enable' }
        },
        {
          title: '创建日期',
          scopedSlots: { customRender: 'time' }
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
      title: '',
      visible: false,
      confirmLoading: false,
      form: {
        pid: 0,
        name: '',
        icon: '',
        sort: '',
        authority: '',
        router: '',
        btn_perms: [],
        enable: true
      },
      rules: {
        name: { required: true, message: '请输入标题名称' },
        router: { required: true, message: '请输入路由名称' }
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
      ],
      isShowBtnPerms: true,
      type: 'create'
    }
  },
  mounted() {
    this.getRoutes()
  },
  methods: {
    // 表格数据
    async getRoutes() {
      const table = this.table
      table.loading = true
      const res = await routes()
      table.loading = false
      const { code, data, message } = res.data
      if (code !== 0) {
        this.$message.error(message)
        return
      }
      table.data = toTree(data)
    },
    // 提交
    handleSubmit() {
      this.$refs.form.validate(async valid => {
        if (!valid) return
        this.confirmLoading = true
        const res = await operationRoutes(this.type, this.form)
        const { code, message } = res.data
        if (code !== 0) {
          this.$message.error(message)
          return
        }
        this.confirmLoading = false
        this.visible = false
        this.$message.success('创建成功')
        this.getRoutes()
      })
    },
    // 创建
    handleCreate() {
      this.reset()
      this.type = 'create'
      this.form._id && delete this.form._id
      this.visible = true
      this.title = '创建菜单'
      this.form.pid = 0
      this.isShowBtnPerms = false
    },
    // 添加子集
    handleAddChild(item) {
      this.reset()
      this.visible = true
      this.isShowBtnPerms = true
      this.title = `创建 ${item.name} 子集菜单`
      this.form.pid = item._id
    },
    // 编辑
    handleEdit(item) {
      this.type = 'update'
      this.form._id = item._id
      this.visible = true
      this.isShowBtnPerms = item.pid !== 0
      this.title = item.name
      this.$nextTick(() => {
        this.form = { ...item }
      })
    },
    async handleDelete(item) {
      const res = await deleteRoutes({ _id: item._id })
      const { code, message } = res.data
      if (code !== 0) {
        this.$message.error(message)
        return
      }
      this.$message.success('删除成功')
      this.getRoutes()
    },
    // table组件事件
    onPageChange() {},
    onSizeChange() {},
    match(perms) {
      const btns = this.btns
      if (!perms || !Array.isArray(perms)) return []
      return btns.filter(item => perms.includes(item.value))
    },
    reset() {
      this.$refs.menuForm && this.$refs.menuForm.resetFields()
    }
  }
}
</script>
