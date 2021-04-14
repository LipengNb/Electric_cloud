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
      @search="onSearch"
      @refresh="onRefresh"
      @reset="onReset"
    >
      <template slot="operation">
        <a-button v-auth="`add`" icon="plus" @click="handleCreate">创建</a-button>
      </template>
      <div slot="icon" slot-scope="{ record }">
        <a-icon v-if="record.meta.icon" :type="record.meta.icon" />
      </div>
      <div slot="role" slot-scope="{ record }">
        {{ record.meta.authority.permission }}
      </div>
      <div slot="enable" slot-scope="{ record }">
        <a-switch checked-children="显" un-checked-children="隐" :checked="!record.meta.invisible" />
      </div>
      <div slot="time">
        2021-04-14
      </div>
      <div slot="action" slot-scope="{record}">
        <a v-auth="`add`" style="margin-right: 8px" @click="handleEdit(record)">
          <a-icon type="plus" /> 添加子集
        </a>
        <a v-auth="`edit`" style="margin-right: 8px" @click="handleEdit(record)">
          <a-icon type="edit" /> 编辑
        </a>
      </div>
    </advance-table>
    <!-- 创建/编辑 -->
    <a-modal
      :title="title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-form-model :model="form" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
        <a-form-model-item label="菜单标题" prop="name">
          <a-input v-model="form.name" placeholder="输入标题" />
        </a-form-model-item>
        <a-form-model-item label="图标" prop="icon">
          <a-input v-model="form.icon" placeholder="输入图标" />
        </a-form-model-item>
        <a-form-model-item label="顺序" prop="sort">
          <a-input-number id="inputNumber" v-model="form.sort" :min="1" :max="10" />
        </a-form-model-item>
        <a-form-model-item label="权限标识" prop="role">
          <a-input v-model="form.role" placeholder="输入权限标识" />
        </a-form-model-item>
        <a-form-model-item label="组件路径" prop="fullPath">
          <a-input v-model="form.fullPath" placeholder="输入组件路径" />
        </a-form-model-item>
        <a-form-model-item label="状态" prop="enable">
          <a-switch v-model="form.enable" />
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
      visible: true,
      confirmLoading: false,
      form: {
        name: '',
        icon: '',
        sort: '',
        role: '',
        fullPath: '',
        enable: true
      },
      rules: {}

    }
  },
  mounted() {
    const routes = this.$router.options.routes
    const menus = routes.filter(item => item.path === '/')
    this.roleTable.roleData = menus[0].children
    console.log(this.roleTable.roleData)
  },
  methods: {
    handleSubmit() {

    },
    handleCancel() {
      this.visible = false
    },
    handleEdit(data) {
      this.visible = true
      this.title = data.name
    },
    handleCreate() {
      this.visible = true
      this.title = '创建菜单'
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
