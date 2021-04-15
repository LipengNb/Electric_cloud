<template>
  <div>
    <advance-table
      :columns="roleTable.roleColumns"
      :data-source="roleTable.roleData"
      title="角色列表"
      :loading="roleTable.loading"
      header-operation="operation"
      row-key="path"
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
      @refresh="onRefresh"
    >
      <template slot="operation">
        <a-button v-auth="`add`" icon="plus" @click="handleCreate">创建</a-button>
      </template>
      <span slot="icon" slot-scope="{ record }">
        <a-icon v-if="record.meta.icon" :type="record.meta.icon" />
      </span>
      <span slot="role" slot-scope="{ record }">
        <a-tag color="purple">{{ record.meta.authority.permission }}</a-tag>
      </span>
      <span slot="btns" slot-scope="{ record }">
        <a-tag v-for="item in record.meta.btns" :key="item.value">{{ item.label }}</a-tag>
      </span>
      <span slot="enable" slot-scope="{ record }">
        <a-switch checked-children="显" un-checked-children="隐" :checked="!record.meta.invisible" />
      </span>
      <span slot="time">
        2021-04-14
      </span>
      <span slot="action" slot-scope="{record}">
        <a-button v-auth="`add`" type="link" @click="handleEdit(record)">
          添加子集
        </a-button>
        <a-button v-auth="`edit`" type="link" @click="handleEdit(record)">
          编辑
        </a-button>
      </span>
    </advance-table>
    <!-- 创建/编辑 -->
    <a-modal
      :title="title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-form-model ref="menuForm" :model="form" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
        <a-form-model-item label="菜单标题" prop="name">
          <a-input v-model="form.name" placeholder="输入标题" />
        </a-form-model-item>
        <a-form-model-item label="图标" prop="icon">
          <a-input v-model="form.icon" placeholder="输入图标" />
        </a-form-model-item>
        <a-form-model-item label="顺序" prop="sort">
          <a-input-number id="inputNumber" v-model="form.sort" placeholder="输入顺序" :min="1" :max="10" />
        </a-form-model-item>
        <a-form-model-item label="权限标识" prop="role">
          <a-input v-model="form.role" placeholder="输入权限标识" />
        </a-form-model-item>
        <a-form-model-item label="组件路径" prop="fullPath">
          <a-input v-model="form.fullPath" placeholder="输入组件路径 例：/path" />
        </a-form-model-item>
        <a-form-model-item label="按钮权限" prop="btns">
          <a-checkbox-group v-model="form.btns">
            <a-checkbox v-for="item in btns" :key="item.value" :value="item.value">{{ item.label }}</a-checkbox>
          </a-checkbox-group>
        </a-form-model-item>
        <a-form-model-item label="是否可见" prop="enable">
          <a-switch v-model="form.enable" checked-children="显" un-checked-children="隐" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
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
          title: '按钮权限',
          scopedSlots: { customRender: 'btns' }
        },
        {
          title: '组件路径',
          dataIndex: 'fullPath'
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
      roleData: [],
      loading: false,
      page: 1,
      pageSize: 10,
      total: 10
    }
    return {
      roleTable: roleTable,
      title: '',
      visible: false,
      confirmLoading: false,
      form: {
        name: '',
        icon: '',
        sort: '',
        role: '',
        fullPath: '',
        btns: [],
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
        }
      ]

    }
  },
  mounted() {
    const routes = this.$router.options.routes
    const menus = routes.filter(item => item.path === '/')
    this.roleTable.roleData = menus[0].children
    console.log('menu', this.roleTable.roleData)
  },
  methods: {
    handleSubmit() {
      this.$refs.menuForm.validate(valid => {
        if (!valid) return
        this.confirmLoading = true
        setTimeout(() => {
          this.confirmLoading = false
          this.visible = false
          this.$message.success('提交成功')
        }, 2000)
        // console.log(this.form)
      })
    },
    handleCancel() {
      this.visible = false
    },
    handleEdit(data) {
      this.visible = true
      this.title = data.name
      console.log(data)
      this.form = {
        name: data.name,
        role: data.meta.authority.permission,
        fullPath: data.fullPath,
        btns: data.meta.btns && data.meta.btns.map(item => item.value),
        enable: !data.meta?.invisible
      }
    },
    handleCreate() {
      this.visible = true
      this.title = '创建菜单'
    },
    // table组件事件
    onRefresh() {},
    onPageChange() {},
    onSizeChange() {}
  }
}
</script>

